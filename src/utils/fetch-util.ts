import axios from "axios"
import { env } from "./env"


export const fetchUtils = async () => {
    const { data } = await axios.get(`${env.base_url}`)
    
    return data
}