import { MongoClient } from "mongodb"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer} from "@apollo/server/standalone"

import { typeDefs } from "./schema.ts"
import { resolvers } from "./resolvers.ts"
import { RestaurantModel } from "./types.ts";

const mUrl = Deno.env.get("mongo_url")

if (!mUrl) {
  throw new Error(mUrl)
}

const client = new MongoClient(mUrl);

await client.connect();

const mongoDB = client.db("Ordinaria2025");

const RestaurantCollection = mongoDB.collection<RestaurantModel>("restaurants")


const server = new ApolloServer ({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    context: async () => await ({RestaurantCollection})
})


console.log(`🚀  Server ready at ${url}`);
