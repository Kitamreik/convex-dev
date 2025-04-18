import {mutation, query} from "../convex/_generated/server";
import {v} from "convex/values"

export const ListComponents = query({

    //without mutations
    handler: async (ctx) => {
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
        body_state: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("todos", {
            title: args.title,
            description: args.description,
            completed: false,
            mood_state: args.mood_state,
            body_state: args.body_state
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
        await ctx.db.delete(args.id)
    }
})