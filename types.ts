import { OptionalId } from "mongodb";


export type RestaurantModel = OptionalId<{
    name: string,
    address: string,
    city: string,
    phone: string,
}>

export type Restaurant = {
    id: string,
    name: string,
    address: string,
    city: string,
    phone: string,
    temp: string,
    localtime: string
}


export type APIPhone = {
    is_valid: boolean
}

export type APICity = {
    lat: number,
    lon: number,
    country: string,
    temp: number
}

//sjdv