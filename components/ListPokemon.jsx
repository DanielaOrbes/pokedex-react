import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { CardPokemon } from '../components/CardPokemon';
import { Loader } from './Loader';


export const ListPokemon = () => {

    const { allPokemons, loading } = useContext(PokemonContext);



    return (
        <>
            {
                loading ? (<Loader />) : (

                    <div className='card-list-pokemon container'>
                        {allPokemons.map(pokemon => (
                            <CardPokemon key={pokemon.id} pokemon={pokemon} />
                        ))}

                    </div>
                )}
        </>
    )

}