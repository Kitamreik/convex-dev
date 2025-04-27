import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";


export function LineItem({id, title, description, completed, mood_state, body_state}: 
  {
    id: Id<"todos">; //will autocomplete and pull from existing table 
    title: string;
    description: string;
    completed: boolean;
    mood_state: string;
    body_state: string;
  }) {
    // update handler
    const updateTodo = useMutation(api.functions.updateTodo);
    const deleteTodo = useMutation(api.functions.deleteTodo);
  return (
    //remove key
    <li className = "w-full flex item-center gap-2 border rounded p-2">
        <input 
        type="checkbox" 
        checked={completed} 
        // refactor callback from onCompleteChanged(e.target.checked) to updateTodo()
        onChange={e => updateTodo({id, completed: e.target.checked})} />
        <div>
          <p className="font-semibold">Memo: {title}</p>
            {/* 300 - light, 600- darker */}
          <p className="text-sm text-gray-600">Summary: {description}</p>
          <p className="text-sm text-gray-600">What's your vibe like: {mood_state}</p>
          <p className="text-sm text-gray-600">How do you feel in your body: {body_state}</p>
        </div>
        {/* delete button */}
        <div className="ml-auto">
        {/* refactor callback from onRemove() to deleteTodo  */}
          <button type="button" className="text-red-500" onClick={() => deleteTodo({id})}>Remove</button>
        </div>
      </li>
  )
}
