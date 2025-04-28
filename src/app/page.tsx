//to start the project, add useClient
"use client";
import React, {useState} from "react"; //import hooks
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { NewForm } from "./_components/new-form";
import { LineItem } from "./_components/to-do-list";
import { ListComponents } from "../../convex/functions";
import { GenerateForm } from "./_components/generate-form";
import { TaskSummary } from "./_components/task-summary";
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
        <h1 className="text-xl font-bold">Somatic Serenity🌻😌</h1>
        <UserButton/>
        {/* creates icon for the user to sign out */}
      </div>
      <p className="text-lg">Daydream about your daily tasks, and journal your thoughts. What will you craft today?</p>
      <GenerateForm/>
      <br />
      <TaskSummary/>
      <br />
      <hr />
      <h2 className="text-xl font-bold">Typewriting Vibez 💻</h2>
      <p>Feeling like committing your hands to the keyboard to compose your thoughts? Type away at the form below.</p>
      <NewForm />
   </Authenticated>
    <Unauthenticated>
      <div className="mt-64 sign-in-modal flex flex-col items-center">
        <p className="text-gray-600 list-color flex items-center">Hello there, and welcome to Somatic Serenity. 
        </p>
        <p className="text-gray-600 list-color flex items-center">To embark on your journey, please sign in to continue. ✐ 😎</p>
        <br />
      <SignInButton>
        <button className="p-1 bg-blue-500 text-white rounded">Sign In</button>
      </SignInButton>
      </div>
    </Unauthenticated>
    <AuthLoading>
      <p>Loading...</p>
    </AuthLoading>
   </div>
  );
}