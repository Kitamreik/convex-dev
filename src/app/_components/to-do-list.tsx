export function ListCompiler() {
    return (
        {/* set the ul container and adding spacing between elements */}
    <ul className="space-y-2">
    {/* Begin mapping, add question mark re: rendering */}
    {todos?.map(({_id, title, description, completed, mood_state, body_state}, index) => (
      <LineItem 
      key={index}
      id={_id}
      title={title}
      description={description}
      completed={completed}
      mood_state={mood_state}
      body_state={body_state} 
      // disable onCompleteChanged
      /*
       onCompleteChanged={(newValue) => {
        //move the setTodos here

        setTodos(prev => {
          // define a new variable and use the spread operator on the prev state
          const newTodos = [...prev];

          //Now: begin chaining the newTodos instead of prev
          newTodos[index].completed = newValue; //instead of e.target.checked, set to newValue
          return newTodos;

          // Initially: find the prev value's index and log it as completed and VT with checked box event, then return the prev value
          // prev[index].completed = e.target.checked;
          // return prev;
        })
      }}

      onRemove={() => {
        setTodos(prev => {
           // look at the prev arr and filter based on the index of the initial array and detect the correct entry
           const newTodos = [...prev].filter((_, i) => i !== index); //in order to return true, change from strictly equal to not equal, to target all values including the first one
           return newTodos;
        })
      }}
      */ 
     
      />
    ))}
  </ul>
    )
}  

function LineItem({id, title, description, completed, mood_state, body_state}: 
  {
    id: Id<"todos">; //will autocomplete and pull from existing table
    title: string;
    description: string;
    completed: boolean;
    mood_state: string;
    body_state: string;
    //disable onCompleteChange and onRemove
    // onCompleteChanged: (newValue: boolean) => void;
    //make another callback function to delete items
    // onRemove: () => void;
  }) {
    // update handler
    const updateTodo = useMutation(api.functions.updateTodo)
    const deleteTodo = useMutation(api.functions.deleteTodo)
  return (
    //remove key
    <li className = "w-full flex item-center gap-2 border rounded p-2">
        <input 
        type="checkbox" 
        checked={completed} 
        // refactor callback from onCompleteChanged(e.target.checked) to updateTodo()
        onChange={e => updateTodo({id, completed: e.target.checked})} />
        <div>
          <p className="font-semibold">
            {title}</p>
            {/* 300 - light, 600- darker */}
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-sm text-gray-600">{mood_state}</p>
          <p className="text-sm text-gray-600">{body_state}</p>
        </div>
        {/* delete button */}
        <div className="ml-auto">
        {/* refactor callback from onRemove() to deleteTodo  */}
          <button type="button" className="text-red-500" onClick={() => deleteTodo({id})}>Remove</button>
        </div>
      </li>
  )
}