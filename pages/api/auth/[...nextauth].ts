import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const { username, password } = credentials;
        // Add logic here to look up the user from the credentials supplied
        const isLoggedIn = password === process.env.ACCESS_PASSWORD && username === process.env.ACCESS_USERNAME;

        if (!isLoggedIn) {
          return null;
          // throw new TRPCError({
          //   code: 'FORBIDDEN',
          //   message: 'Invalid password'
          // })
        }
        const user = { name: username };
        return user
      }
    })
  ],
})