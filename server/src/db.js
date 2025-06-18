// Import the MongoClient class from the mongodb package
import { MongoClient } from 'mongodb';

// Declare a variable to store the MongoDB client instance
// This will be initialized when the connection is established
let client;

// Function to initialize the database connection
export const initializeDbConnection = async () => {
  try {
    // Attempt to connect to MongoDB running on localhost port 27017
    // The connection is stored in the client variable
    client = await MongoClient.connect('mongodb://localhost:27017');
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    // If connection fails, log the error and throw it to be handled by the caller
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

// Function to get a database instance
export const getDbConnection = (dbName) => {
  // Check if the client is initialized
  if (!client) {
    throw new Error('Database connection not initialized');
  }
  // Return the database instance for the specified database name
  return client.db(dbName);
};

// Function to close the database connection
export const closeDbConnection = async () => {
  // Check if client exists before attempting to close
  if (client) {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  }
};
