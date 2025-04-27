import { action } from "./_generated/server";
import {internal} from "./_generated/api";
import {v} from "convex/values";
//Set up LLM
import OpenAI from "openai";
import { requireUser } from "./helpers";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
})

export const generateList = action({
    //pass a prompt
    args: {
        prompt: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        //call the API to generate items
        const response = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini", //has to have openai prefix
            messages: [{
                role: "system",
                content: "Generate 3 tasks to complete based on the given prompt. Please include a title, description, as well as your current mood/body state. Please return a JSON object in the following format: {todos: [{title: string, description: string, mood_state: string, body_state: string}]}" //you'll have to specify in the prompt JSON object as the format and give it the template to work off of.
            },
            {
                role: "user",
                content: `Prompt" ${args.prompt}`
            }
        ],
        //Newer features of OpenAI models allow for us to format the response
        response_format: {type: "json_object"}
        })
        const content = JSON.parse(response.choices[0].message.content!) as {
            todos: {title: string, description: string, mood_state: string, body_state: string}[]
        };
        await ctx.runMutation(internal.functions.createManyTodos, {
            todos: content.todos,
            userId: user.tokenIdentifier,
        }); //mutate the database indirectly by defining a mutation and then calling it internally
        return content.todos; //return the content to the Front End, chain the todos that was primed in the prompt
    },
})