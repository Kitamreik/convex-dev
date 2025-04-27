import {mutation, query} from "../convex/_generated/server";
import {v} from "convex/values"
import { requireUser } from "../convex/helpers";

export const ListComponents = query({

    //without mutations
    handler: async (ctx) => {
        //add a user where we trigger auth via getting the user's identity
        const user = await requireUser(ctx); //call the helper function in helpers.ts and reference the context
        //Scan the entire database for a match by pulling a list of the todos from the database. 
        return await ctx.db.query("todos").withIndex("by_user_id", q => q.eq("userId", user.tokenIdentifier)).collect(); //New (refactor) - to use the newly defined index in schema.ts, call it withIndex  //Use the collect function to gather the data

        //return await ctx.db.query("todos").filter(q => q.eq(q.field("userId"), user.tokenIdentifier)).collect(); //NEW, Intermediate: filter the to-dos to only return the ones that belong to the current user. q, ep -> equals

        //return await ctx.db.query("todos").collect(); //Basic
        
    }
});

 //handler, context and arguments
export const createTodo = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        mood_state: v.string(),
        body_state: v.string(),
    },
    handler: async (ctx, args) => {
        //add a user where we trigger auth via getting the user's identity
        const user = await requireUser(ctx);
        await ctx.db.insert("todos", {
            title: args.title,
            description: args.description,
            completed: false,
            mood_state: args.mood_state,
            body_state: args.body_state,
            // otherwise, you can pass the userId via the tokenIdentifier
            userId: user.tokenIdentifier
        })
    }
})

//update
export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        completed: v.boolean(),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx); //first, get the user
        const individualItem = await ctx.db.get(args.id); //get the item and compare
        //Error handling
        if (individualItem?.userId !== user.tokenIdentifier) {
            throw new Error("Unauthorized");
        }
        await ctx.db.patch(args.id, {
            completed: args.completed
        })
    }
})

//delete
export const deleteTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx); //first, get the user
        const individualItem = await ctx.db.get(args.id); //get the item and compare
        //Error handling
        if (individualItem?.userId !== user.tokenIdentifier) {
            throw new Error("Unauthorized");
        }
        await ctx.db.delete(args.id)
    }
})

//internalMutation: not part of the app's public API, can only be called from another action, query or mutation. Won't be able to call directly from Front End.
export const createManyTodos = internalMutation({
    args: {
        userId: v.string(),
        todos: v.array(v.object({
            title: v.string(),
            description: v.string(),
            mood_state: v.string(),
            body_state: v.string(),
        })),
    }, 
    handler: async (ctx, args) => {
        //iterate over the list
        for (const todo of args.todos) {
            await ctx.db.insert("todos", {
                title: todo.title,
                description: todo.description,
                completed: false,
                mood_state: todo.mood_state,
                body_state: todo.body_state,
                userId: args.userId
            })
            
        }

    }
})