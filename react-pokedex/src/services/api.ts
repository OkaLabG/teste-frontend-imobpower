import axios from 'axios';
const URL = 'https://pokeapi.co/api/v2/pokemon/';

export const FetchData = async (url?: string) => {
    let changeURL = URL;
    if (url !== undefined) {
        changeURL = url
    }
    const response = await axios.get(changeURL)
    return response.data;
}
export const GetURL = async (url: string) => {
    try {
        const { data } = await axios.get(url)
        return data;
    } catch (error) {
        console.log(error)
    }
}
