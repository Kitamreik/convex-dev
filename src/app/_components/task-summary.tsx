import React, {useState} from "react"; //import hooks
import { useMutation, useQuery } from "convex/react";
import {api} from "../../../convex/_generated/api";
import { LineItem } from "./to-do-list";

export function TaskSummary() {
     const todos = useQuery(api.functions.ListComponents);
    return(
        <div className="max-w-screen-md mx-auto p-4 space-y-4 p-color enhance font-bold">
              {/* set the ul container and adding spacing between elements. Begin mapping, add question mark re: rendering */}
                <p>🎩 Here is your current task summary, you majestic human: </p>
                <ul className="space-y-2">
                      {todos?.map(({_id, title, description, completed, mood_state, body_state}, index) => (
                      <LineItem 
                          key={index}
                          id={_id}
                          title={title}
                          description={description}
                          completed={completed}
                          mood_state={mood_state}
                          body_state={body_state} 
                      />
                      ))}
                  </ul>
                  <p className="contrast">If you don't like a suggestion that the AI had made, click the <b className="red">Remove</b> button. You can also remove a mistake as well.</p>
        </div>
      
    )
}