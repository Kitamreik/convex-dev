"use client"; //MUST have this
import { ConvexProvider, ConvexReactClient } from "convex/react"; //MUST have this
import { ConvexClient  } from "convex/browser"; //MUST have this

//establish the client
const client = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({children}: {children: React.ReactNode}) {
    return (
        <ConvexProvider client={client}>{children}</ConvexProvider>
    )
}