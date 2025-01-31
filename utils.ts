import { GraphQLError } from "graphql";
import { APICity, APIPhone } from "./types.ts";


export async function validatePhone (phone:string) {

    const api_key = Deno.env.get("api_key")
    
    if (!api_key) { throw new GraphQLError ("API KEY ERROR")}

    const url = `https://api.api-ninjas.com/v1/validatephone?number=${phone}`
    const data = await fetch (url, {
        headers: {
        'X-Api-Key': api_key
        }})

        if (data.status != 200) { throw new GraphQLError("API ERROR") }

    const response: APIPhone = await data.json()

    return response.is_valid  
} 

export async function getCountry(city: string) {
    const api_key = Deno.env.get("api_key")
    
    if (!api_key) { throw new GraphQLError ("API KEY ERROR")}

    const url = `https://api.api-ninjas.com/v1/city?name=${city}`
    const data = await fetch (url, {
        headers: {
        'X-Api-Key': api_key
        }})

        if (data.status != 200) { throw new GraphQLError("API ERROR") }

    const response: APICity[] = await data.json()

    if (!response) { throw new GraphQLError("City not found")}
    
    return response[0].country
}

export async function getWeather(city: string) {

    const api_key = Deno.env.get("api_key")
    
    if (!api_key) { throw new GraphQLError ("API KEY ERROR")}

    const url = `https://api.api-ninjas.com/v1/city?name=${city}`
    const data = await fetch (url, {
        headers: {
        'X-Api-Key': api_key
        }})

        if (data.status != 200) { throw new GraphQLError("API ERROR") }

    const response: APICity[] = await data.json()
    if (!response) { throw new GraphQLError("City not found")}

    console.log(response)

    return getTrueWeather(response[0].latitude, response[0].longitude, api_key)

}

async function getTrueWeather (lat: number, lon: number, api_key:string) {

    

    const url = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`
    const data = await fetch (url, {
        headers: {
        'X-Api-Key': api_key
        }})

        if (data.status != 200) { throw new GraphQLError("API ERROR") }

    const response:APICity = await data.json()

    return response.temp
}

export async function getLocaltime(city:string) {


    const api_key = Deno.env.get("api_key")
    
    if (!api_key) { throw new GraphQLError ("API KEY ERROR")}

    const url = `https://api.api-ninjas.com/v1/city?name=${city}`
    const data = await fetch (url, {
        headers: {
        'X-Api-Key': api_key
        }})

        if (data.status != 200) { throw new GraphQLError("API ERROR") }

    const response: APICity[] = await data.json()
    if (!response) { throw new GraphQLError("City not found")}

    console.log(response)

    return getTrueLocaltime(response[0].latitude, response[0].longitude, api_key)
    
}

async function getTrueLocaltime(lat:number, lon: number, api_key: string) {

    const url = `https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`
    const data = await fetch (url, {
        headers: {
        'X-Api-Key': api_key
        }})

        if (data.status != 200) { throw new GraphQLError("API ERROR") }

    const response:APICity = await data.json()

    console.log(response)
    
    return response.hour + ":" + response.minute
}
