import { useEffect, useState } from 'react';
import { userForm } from '../hooks/userForm';
import { PokemonContext } from './PokemonContext';


export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0); //los pokemons inician en 0 y van hasta limit (50)


  const {valueSearch, onInputChange, onResetForm} = userForm({
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
const getGlobalPokemons = async() => { 
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
    getAllPokemons()  
  }, [offset])


  useEffect(() => {
    getGlobalPokemons()
  }, [])
  
  //btn pokeMAS
  const onClickLoadMore = () => {
    setOffset(offset + 50);
  }

  const [typeSelected, setTypeSelected] = useState({
    fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
    grass: false,
		normal: false,
		fighting: false, 
  })
  const [filteredPokemons, setfilteredPokemons] = useState([])
  const handlerCheckbox = e => {
    setTypeSelected({
    ...typeSelected,
      [e.target.name]: e.target.checked
    })
    if (e.target.checked) {
      const filteredResults = globalPokemons.filter(pokemon => pokemon.types 
        .map(type => type.type.name)
        .includes(e.target.name))
        setFilterPokemons(...filteredResults, pokemon)
    } else {
      const filteredResults = filteredPokemons.filter(pokemon => !pokemon.types 
        .map(type => type.type.name)
        .includes(e.target.name))
        setfilteredPokemons(...filteredResults)
    }
  }
  


  return (
    <PokemonContext.Provider 
    value={{
      valueSearch,
      onInputChange,
      onResetForm,
      allPokemons,
      globalPokemons,
      getPokemonById,
      onClickLoadMore,
      loading,
      active,
      setActive,
      handlerCheckbox,
      filteredPokemons
        }}>
      {children}
    </PokemonContext.Provider>
  );
}



