import { ActionCtx, QueryCtx } from "./_generated/server";

export const requireUser = async (ctx: ActionCtx | QueryCtx) => {
    //add a user where we trigger auth via getting the user's identity
    const user = await ctx.auth.getUserIdentity();
    //if you are not signed in, throw an error
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
}