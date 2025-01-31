import { GraphQLError } from "graphql";
import { APIPhone, Restaurant, RestaurantModel } from "./types.ts";
import { Collection, ObjectId } from "mongodb";
import { getCountry, getLocaltime, getWeather, validatePhone } from "./utils.ts";

type Context = {
    RestaurantCollection: Collection<RestaurantModel>
    
}

export const resolvers = {

    Restaurant : {
        id: (parent: RestaurantModel) => parent._id?.toString(),
        address: async (parent: RestaurantModel) => parent.address + ", " + parent.city + ", " + await getCountry(parent.city),
        temp: (parent:RestaurantModel) => getWeather(parent.city),
        localtime: (parent:RestaurantModel) => getLocaltime(parent.city)        
    },


    Query: {
        getRestaurants: async (_:unknown, args :Restaurant, ctx: Context): Promise<RestaurantModel[]>  => {
            const { city } = args
            const restaurants = await ctx.RestaurantCollection.find({city}).toArray()
            return restaurants
        },
        getRestaurant: async (_:unknown, args:Restaurant, ctx: Context): Promise<RestaurantModel[]> => {
            const { id } = args
            const restaurants = await ctx.RestaurantCollection.find({_id: new ObjectId(id)}).toArray()
            return restaurants
        }
    },

    Mutation: {
        addRestaurant: async (_:unknown, args :Restaurant, ctx: Context): Promise<RestaurantModel> => {
            const { name, address, city, phone } = args


            const phoneExists = await ctx.RestaurantCollection.find({phone}).toArray()

            if (phoneExists.length != 0) { throw new GraphQLError("Phone already exists")}

            if (!await validatePhone(phone)) { throw new GraphQLError("Phone not valid")}

            const { insertedId } = await ctx.RestaurantCollection.insertOne({
                name,
                address,
                city,
                phone,
            })

            return {
                _id: insertedId,
                name,
                address,
                city,
                phone
            }
        }, 
        deleteRestaurant: async (_:unknown, args:Restaurant, ctx:Context): Promise<Boolean> => {
            const { id } = args

            const { deletedCount } = await ctx.RestaurantCollection.deleteOne({_id: new ObjectId(id)})

            if (deletedCount) return true

            return false
        } 
    }
}