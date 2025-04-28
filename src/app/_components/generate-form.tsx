import React, { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

//copy new-form.tsx and refactor
export function GenerateForm() {
    //create state to hold the prompt
    const [prompt, setPrompt] = useState("");

    //re: user friendliness, let's add loading state
    const [loading, setLoading] = useState(false);

    //define a new action
    const generateTodo = useAction(api.actions.generateList);

    //you don't need to define the completedAt, or completed
    //Handler function --> make async
      const handleSubmit = async (e: React.FormEvent <HTMLFormElement>) => {
        // prevent the default
        e.preventDefault();
        //try-catch statement
        try {
            setLoading(true);
            //call the async function and insert state
           const todos = await generateTodo({prompt});
           console.log(todos); 
           //reset the prompt
           setPrompt(""); 
        } catch (error) {
            console.log("Error", error);
        } finally { //run regardless of success/fail
            setLoading(false);
        }
      }

      if (loading) {
        return <p>Generating todo items...</p>
      }

    return (
    <form onSubmit={handleSubmit}>
        {/* wrap form controls in a div, make a flex column with a gap of 2 */}
        <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg">Generate Tasks with AI 🪄🤖</h2>
            <p>Pressed for time? You can optionally use the AI bot to help you generate a list of three ideas automatically, which will appear in your current task summary. Click the button when done.</p>
            <hr />
            <p>Example: Generate some tasks for a painting night at home with my friends.</p>
            {/* small text labels */}
            <label className="text-sm font-semibold" htmlFor="prompt">Craft your ideas, tasks, thoughts here: </label>
            <input className="p-1 border rounded" type="text" name="prompt" id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} />
            
            <button className="bg-blue-500 p-1 rounded text-white" type="submit">Computing Magically Delicious Response...</button>
        </div>
    </form>
    )
}