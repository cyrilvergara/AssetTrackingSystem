import mongoose from "mongoose";

let isConnected = false;

/**
 * Connects to the MongoDB database.
 * @async
 * @function connectToDB
 * @returns {Promise<void>} A Promise that resolves when the connection is established.
 */
export const connectToDB = async () => {
  // Set strictQuery option to true for mongoose
  mongoose.set("strictQuery", true);

  // Check if already connected to MongoDB
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // Connect to MongoDB using the provided MONGODB_URL
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "AssetTracking2",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Update isConnected flag to true
    isConnected = true;

    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log(error);
  }
};






// Pseudocode:
// Define a boolean variable isConnected and set it to false

// Define an asynchronous function connectToDB

//   Set the strictQuery option for mongoose to true

//   If isConnected is true
//     Log "MongoDB is already connected"
//     Return from the function

//   Try to
//     Connect to MongoDB using the MONGODB_URL environment variable with the following options:
//       dbName set to "HaloChat"
//       useNewUrlParser set to true
//       useUnifiedTopology set to true

//     Set isConnected to true

//     Log "MongoDB is connected successfully"

//   If there's an error
//     Log the error