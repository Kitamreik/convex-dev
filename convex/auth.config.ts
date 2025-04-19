export default {
    providers: [
      {
        domain: "https://hardy-sparrow-75.clerk.accounts.dev", //should be the issuer URL. When we sign in with Clerk, Convex will know.
        applicationID: "convex",
      },
    ]
  };