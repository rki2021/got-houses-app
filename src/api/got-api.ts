import { gotApiEndpoint } from '../config'
import { House } from '../types/House'
import { Character } from '../types/Character'
import Axios from 'axios'

export async function getHouses(page: number, pageSize: number): Promise<House[]> {
    
    const response = await Axios.get(`${gotApiEndpoint}/houses?page=${page}&pageSize=${pageSize}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return response.data
}


export async function getHouse(id: number): Promise<House> {
    
    const response = await Axios.get(`${gotApiEndpoint}/houses/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })

   return response.data
}

export async function getCharacter(id: number): Promise<Character> {
    
    const response = await Axios.get(`${gotApiEndpoint}/characters/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })

   return response.data
}