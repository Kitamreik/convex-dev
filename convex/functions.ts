import {mutation, query} from "../convex/_generated/server";
import {v} from "convex/values"
import { requireUser } from "./helpers";

export const ListComponents = query({
    //without mutations
    handler: async (ctx) => {
         //add a user where we trigger auth via getting the user's identity
        const user = await ctx.auth.getUserIdentity();
        
        //Patch for conditional rendering 
        if (!user) {
            console.log(user, "The user needs to sign up")
        }
       //pull a list of the todos from the database. Use the collect function to gather the data
        return await ctx.db.query("todos").collect();
    }
});

 //handler, context and arguments
export const createTodo = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        mood_state: v.string(),
        body_state: v.string(),
        //Deployment error: Object is missing the required field `userId`. Consider wrapping the field validator in `v.optional(...)` if this is expected.
        userId: v.any() //Docs: https://docs.convex.dev/functions/validation#any
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