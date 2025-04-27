// DO NOT TOUCH CONFIG
"use client"; //MUST have this
import { ReactNode } from "react"; //Docs, Step 7: https://docs.convex.dev/quickstart/nextjs
import { ConvexProvider, ConvexReactClient } from "convex/react"; //MUST have this

import {ConvexProviderWithClerk} from "convex/react-clerk"; //set provider with Clerk

import {useAuth, ClerkProvider} from "@clerk/nextjs"; //useAuth hook from Clerk

//establish the client

const client = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!); 

export function ConvexClientProvider({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={client} useAuth={useAuth}>{children}</ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
