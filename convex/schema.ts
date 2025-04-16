import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values"; //allows for more error checking, correctness and autocomplete
 
export default defineSchema({
    //define a table
    todos: defineTable({
        title: v.string(), //29:45
    })
})