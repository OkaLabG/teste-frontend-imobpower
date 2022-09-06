// Exportando métodos
// Fazendo a conexão com a API, definindo o async para ter uma prévia resposta da API e não deixar o usuário esperando

export const SearchPokemon = async (pokemon) => {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch(url)
        return await response.json()
        
    } catch (error) {
        console.log("ERROR", error)
    }
}
// Exportando métodos
// Fazendo a conexão com a API, definindo o async para ter uma prévia resposta da API e não deixar o usuário esperando

export const GetPokemons = async (limit = 50, offset =0) => {
    try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response = await fetch(url)
        return await response.json()
        
    } catch (error) {
        console.log("ERROR", error)
    }
}

export const GetPokemonsData = async (url) => {
    try {
        const response = await fetch(url)
        return await response.json()
        
    } catch (error) {
        console.log("ERROR", error)
    }
}