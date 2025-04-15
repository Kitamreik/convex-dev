//to start the project, add useClient
"use client";
import React, {useState} from "react"; //import hooks
import { NewForm } from "./_components/new-form";

//Typescript: identify the type, define the schema
type ToDoItem = {
  title: string;
  description: string;
  completed: boolean;
  //completedAt: number, // Unix timestamp: https://www.unixtimestamp.com/ 
   // adding mood and body state, adding ? makes it optional for unfinished tasks
  mood_state: string | undefined; 
  body_state: string | undefined;
}

export default function Home() {
  // in the body, define the state of the List
  const [todos, setTodos] = useState<ToDoItem[]>([
    // establish test data from the schema
    {
      title: "Example Entry",
      description: "This log is an example",
      //completedAt: 1744637713, //6:35 4/14, as example data
      completed: false,
      mood_state: "Calm",
      body_state: "Grounded"
    }
  ]);

  //move state, Handler function to new-form
  //Move setTodos below

  return (
    // take up the max screen size horizontally, where it flexes, and space between the elements
   <div className="max-w-screen-md mx-auto p-4 space-y-4">
    <h1 className="text-xl font-bold">Somatic Serenity</h1>
    <br />
    {/* set the ul container and adding spacing between elements */}
    <ul className="space-y-2">
      {/* Begin mapping */}
      {todos.map(({title, description, completed, mood_state, body_state}, index) => (
        <LineItem 
        key={index}
        title={title}
        description={description}
        completed={completed}
        mood_state={mood_state}
        body_state={body_state} 
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
        }}/>
      ))}
    </ul>
    {/* add form component here */}
    <NewForm onCreate = {(title, description, mood_state, body_state) => {
      //insert setTodos here
      // stage the setter function to track items
      setTodos(prev => {
        const newTodos = [...prev];
        //inside the array, push new data
        newTodos.push({title, description, completed: false, mood_state, body_state});
        return newTodos; //the arr
      });
    }}/>
   </div>
  );
}

function LineItem({title, description, completed, mood_state, body_state, onCompleteChanged, onRemove}: 
  {
    title: string;
    description: string;
    completed: boolean;
    mood_state: string;
    body_state: string;
    onCompleteChanged: (newValue: boolean) => void;
    //make another callback function to delete items
    onRemove: () => void;
  }) {
  return (
    //remove key
    <li className = "w-full flex item-center gap-2 border rounded p-2">
        <input 
        type="checkbox" 
        checked={completed} 
        // refactor callback
        onChange={e => onCompleteChanged(e.target.checked)} />
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
          <button type="button" className="text-red-500" onClick={() => onRemove()}>Remove</button>
        </div>
      </li>
  )
}

//Template
/*
 <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
*/ 

{/* Establish form and values of state --> moved to new-form */}
{/*
<form onSubmit={handleSubmit}>
  <label htmlFor="title">Title: </label>
  <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
  <br />
  <hr />
  <br />
  <label htmlFor="description">Description: </label>
  <input type="text" name="description" id="description" value={description} onChange={e => setDesc(e.target.value)} />
  <br />
  <hr />
  <br />
  <label htmlFor="mood-state">Mood: </label>
  <input type="text" name="mood-state" id="mood-state" value={mood_state} onChange={e => setMood(e.target.value)} />
  <br />
  <hr />
  <br />
  <label htmlFor="body-state">Body: </label>
  <input type="text" name="body-state" id="body-state" value={body_state} onChange={e => setBody(e.target.value)} />
  <br />
  <hr />
  <br />
  <span>
    <button type="submit">Create Entry</button>
  </span>
</form>
*/}
