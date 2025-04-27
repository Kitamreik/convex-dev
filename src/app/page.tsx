//to start the project, add useClient
"use client";
import React, {useState} from "react"; //import hooks
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { NewForm } from "./_components/new-form";
import { LineItem } from "./_components/to-do-list";
import { ListComponents } from "../../convex/functions";
import { GenerateForm } from "./_components/generate-form";
//Move to to-do-list.tsx only if compartmentalizing components
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const todos = useQuery(api.functions.ListComponents);

  return (
    // take up the max screen size horizontally, where it flexes, and space between the elements
   <div className="max-w-screen-md mx-auto p-4 space-y-4">
     {/* wrap the two components in the Auth component */}
     <Authenticated>
      {/* shortcut command: div.flex.items-center.justify-between */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Somatic Serenity</h1>
        <UserButton/>
        {/* creates icon for the user to sign out */}
      </div>
    
      <br />
      {/* set the ul container and adding spacing between elements. Begin mapping, add question mark re: rendering */}
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
          <GenerateForm/>
      <NewForm />
    </Authenticated>
    <Unauthenticated>
      <p className="text-gray-600">Please sign in to continue.</p>
      <SignInButton>
        <button className="p-1 bg-blue-500 text-white rounded">Sign In</button>
      </SignInButton>
    </Unauthenticated>
    <AuthLoading>
      <p>Loading...</p>
    </AuthLoading>
   </div>
  );
}