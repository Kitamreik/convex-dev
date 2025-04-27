import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values"; //allows for more error checking, correctness and autocomplete
 
export default defineSchema({
    //define a table
    todos: defineTable({
        title: v.string(),
        description: v.string(),
        completed: v.boolean(),
        mood_state: v.string(),
        body_state: v.string(),
        userId: v.string(),
    }).index("by_user_id", ["userId"]), //search by index init
})