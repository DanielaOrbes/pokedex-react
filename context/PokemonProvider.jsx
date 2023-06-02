import { useEffect, useState } from 'react';
import { useForm } from '../hook/useForm';
import { PokemonContext } from './PokemonContext';

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0); //los pokemons inician en 0 y van hasta limit (50)


  const {valueSearch, onInputChange, onResetForm} = useForm({
    valueSearch : ''
  })


  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false) //filtrado, al presionar el boton se activara y pasa a True

  //llama 50 pokemons a la API
  const getAllPokemons = async (limit = 50) => {
    const baseURL = 'https://pokeapi.co/api/v2/';

    const res = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();
    const promises = data.results.map(async pokemon => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);

    setAllPokemons([
      ...allPokemons,
      ...results,
    ]);
    setLoading(false)
  }

  //pokemons global
  //pokemons global
const getGlobalPokemons = async() => { // Agrega el operador de flecha (=>) aquí
  const baseURL = 'https://pokeapi.co/api/v2/';

  const res = await fetch(
    `${baseURL}pokemon?limit=100000&offset=0`
  );
  const data = await res.json();
  const promises = data.results.map(async pokemon => {
    const res = await fetch(pokemon.url);
    const data = await res.json();
    return data;
  });
  const results = await Promise.all(promises);

  setGlobalPokemons(results)
  setLoading(false)
  }


  //search pokemon ID

  const getPokemonById = async(id) => {
    const baseURL = 'https://pokeapi.co/api/v2/';

    const res = await fetch (`${baseURL}pokemon/${id}`)
    const data = await res.json();
    return data;

  }


  useEffect(() => {
    getAllPokemons() //no le paso nada por parametro y tomará el valor de limit(50)
  }, [])


  useEffect(() => {
    getGlobalPokemons()
  }, [])
  



  return (
    <PokemonContext.Provider 
    value={{
      valueSearch,
      onInputChange,
      onResetForm,
      allPokemons,
      globalPokemons,
      getPokemonById,
        }}>
      {children}
    </PokemonContext.Provider>
  );
}
