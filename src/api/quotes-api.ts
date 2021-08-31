import { quotesApiEndpoint } from '../config'
import { Quote } from '../types/Quote'
import Axios from 'axios'

export async function getQuotes(n: number = 4): Promise<Quote[]> {
    
    const response = await Axios.get(`${quotesApiEndpoint}/random/${n}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })

    console.log(`${response.data}`)

    return response.data
}