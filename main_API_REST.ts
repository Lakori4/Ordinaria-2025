// main.ts

import { MongoClient, ObjectId } from "mongodb";

// Fetch the MongoDB connection URL from environment variables
const MONGO_URL = Deno.env.get("mongo_url");

// Check if MONGO_URL exists; if not, log an error and exit
if (!MONGO_URL) {
  console.error("MONGO_URL is not set");
  Deno.exit(1);
}

// Create a new MongoDB client and connect to the server
const client = new MongoClient(MONGO_URL);
await client.connect();
console.info("Connected to MongoDB");

// Select the 'agenda' database and the 'users' collection
//const db = client.db("agenda");
//const collection = db.collection<>();

// Main handler function to manage incoming HTTP requests
const handler = async (req: Request): Promise<Response> => {
  
  return new Response("Hola")

  // If no matching route is found, return a 404 response
  return new Response("Not found", { status: 404 });
};

// Start the server on port 3000 and use the handler function to process requests
Deno.serve({ port: 3000 }, handler);
