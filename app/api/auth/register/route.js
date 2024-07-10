import User from "@models/User";
import { connectToDB } from "@mongodb";
import { hash } from "bcryptjs";

/**
 * Handles the POST request for user registration.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the created user or an error message.
 */
export const POST = async (req, res) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const body = await req.json();

    // Extract username, email, and password from the request body
    const { username, email, password } = body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If a user with the same email exists, return an error response
      return new Response("User already exists", {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user object with the provided username, email, and hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success response with the created user object
    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (err) {
    // If an error occurs, log the error and return an error response
    console.log(err);
    return new Response("Failed to create a new user", {
      status: 500,
    });
  }
};


// Pseudocode:
// Define an asynchronous function POST that takes request and response objects as parameters

//   Try to
//     Connect to the database using the connectToDB function

//     Parse the request body and assign it to a variable named body

//     Extract username, email, and password from the body

//     Check if a user with the same email already exists in the database
//       If a user with the same email exists
//         Return an error response with the message "User already exists" and a status code of 400

//     Hash the password using bcryptjs and assign it to a variable named hashedPassword

//     Create a new user with the provided username, email, and hashed password and assign it to a variable named newUser

//     Save the newUser to the database

//     Return a success response with the newUser object and a status code of 200

//   If an error occurs
//     Log the error
//     Return an error response with the message "Failed to create a new user" and a status code of 500