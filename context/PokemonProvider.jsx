import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"

export const PokemonProvider = ({children }) => {

    const [offset, setoffset] = useState(0) //los pokemons inician en 0 y van hasta limit (50)
     
    //llama 50 pokemons a la API
    const getAllPokemons = async ( limit = 50) => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json();
    }

    useEffect(() => {
      getAllPokemons() //no le paso nada por parametro y tomará el valor de limit(50)
    }, [])
    





  return (
    <PokemonContext.Provider value={{
        numero : 0
    }}>
        {children}
    </PokemonContext.Provider>
    )
}
 