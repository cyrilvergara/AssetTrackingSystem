import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectToDB } from "@mongodb";
import User from "@models/User";

/**
 * Handles the authentication process using NextAuth.
 *
 * @param {object} credentials - The user's credentials.
 * @param {object} req - The request object.
 * @returns {object} - The authenticated user.
 * @throws {Error} - If the email or password is invalid.
 */
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // Check if email or password is missing
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        // Connect to the database
        await connectToDB()

        // Find the user with the provided email
        const user = await User.findOne({ email: credentials.email });

        // Check if user or password is missing
        if (!user || !user?.password) {
          throw new Error("Invalid email or password");
        }

        // Compare the provided password with the stored password
        const isMatch = await compare(credentials.password, user.password);

        // Check if the password is invalid
        if (!isMatch) {
          throw new Error("Invalid password");
        }

        // Return the authenticated user
        return user
      },
    }),
  ],

  // Set the secret for NextAuth
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({session}) {
      // Find the user in the database based on the session email
      const mongodbUser = await User.findOne({ email: session.user.email })

      // Set the user id in the session
      session.user.id = mongodbUser._id.toString()

      // Merge the session user object with the MongoDB user document
      session.user = {...session.user, ...mongodbUser._doc}

      // Return the updated session
      return session
    }
  }
});

export { handler as GET, handler as POST };




// Pseudocode:
// Import necessary modules and functions

// Define a handler function using NextAuth with the following parameters:

//   Define providers array with a CredentialsProvider object that has:
//     A name property set to "Credentials"
//     An authorize function that takes credentials and req as parameters
//       If email or password is missing in credentials
//         Throw an error "Invalid email or password"
//       Connect to the database using connectToDB function
//       Find a user in the database with the provided email and assign it to a variable user
//       If user or user's password is missing
//         Throw an error "Invalid email or password"
//       Compare the provided password with the user's password and assign the result to a variable isMatch
//       If isMatch is false
//         Throw an error "Invalid password"
//       Return the user

//   Set the secret property to the NEXTAUTH_SECRET environment variable

//   Define callbacks object with a session function that takes an object with a session property
//     Find a user in the database with the email from the session user and assign it to a variable mongodbUser
//     Set the id of the session user to the id of mongodbUser
//     Merge the session user object with the mongodbUser document
//     Return the updated session

// Export the handler function as both GET and POST