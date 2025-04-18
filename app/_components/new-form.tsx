import React, {useState} from "react"; //import hooks
import { useMutation } from "convex/react";
import {api} from "../../convex/_generated/api"
//add props so we can pass the to-do up to the parent component, create a new Type
/*
type FormProps = {
    onCreate: (
        title: string, 
        description: string
        // body/mood?
    ) => void;
}
*/

//can disable after ConvexClientProvider

//copy pasta the form from page.tsx
//can disable parameter - {onCreate}: FormProps - after ConvexClientProvider
export function NewForm() {
    //create more state to hold the title, description, etc
    const [title, setTitle] = useState("");

    const [description, setDesc] = useState("");

    const [mood_state, setMood] = useState("");

    const [body_state, setBody] = useState("");

    //define a new function
    const createTodo = useMutation(api.functions.createTodo);

    //you don't need to define the completedAt, or completed
    //Handler function --> make async
      const handleSubmit = async (e: React.FormEvent <HTMLFormElement>) => {
        // prevent the default
        e.preventDefault();

        //call the async function and insert state
        await createTodo({title, description, mood_state, body_state})

        //remove the onCreate
        //onCreate(title, description, mood_state, body_state)
        //move setter functions back to page.tsx
        
        //use the setter functions for state
        setTitle("");
        setDesc("");
        setMood("");
        setBody("");
        //console.log(e.target, "target") //logs form success
      }

    return (
    <form onSubmit={handleSubmit}>
        {/* wrap form controls in a div, make a flex column with a gap of 2 */}
        <div className="flex flex-col gap-2">
            {/* small text labels */}
            <label className="text-sm font-semibold" htmlFor="title">Title: </label>
            <input className="p-1 border rounded" type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
            <FormSplitter/>
            <label className="text-sm font-semibold" htmlFor="description">Description: </label>
            <input className="p-1 border rounded" type="text" name="description" id="description" value={description} onChange={e => setDesc(e.target.value)} />
            <FormSplitter/>
            <label className="text-sm font-semibold" htmlFor="mood-state">Mood: </label>
            <input className="p-1 border rounded"  type="text" name="mood-state" id="mood-state" value={mood_state} onChange={e => setMood(e.target.value)} />
            <FormSplitter/>
            <label className="text-sm font-semibold" htmlFor="body-state">Body: </label>
            <input className="p-1 border rounded" type="text" name="body-state" id="body-state" value={body_state} onChange={e => setBody(e.target.value)} />
            <button className="bg-blue-500 p-1 rounded text-white" type="submit">Create Entry</button>
        </div>
    </form>
    )
}

function FormSplitter() {
    return (
       <span>
            <br />
            <hr />
            <br />
       </span> 
    )
}