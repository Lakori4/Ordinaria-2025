import { MongoClient } from "mongodb"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer} from "@apollo/server/standalone"

import { typeDefs } from "./schema.ts"
import { resolvers } from "./resolvers.ts"

const mUrl = Deno.env.get("mongo_url")

if (!mUrl) {
  throw new Error("No mongo url provided")
}

const client = new MongoClient(mUrl);

await client.connect();

const mongoDB = client.db("");

const contactCollection = mongoDB.collection<>("");


const server = new ApolloServer ({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    context: async () => ({contactCollection})
})


console.log(`🚀  Server ready at ${url}`);
