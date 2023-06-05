import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { CardPokemon } from '../components/CardPokemon';
import { Loader } from './Loader';


export const ListPokemon = () => {

    const { allPokemons, loading, filteredPokemons } = useContext(PokemonContext);



    return (
        <>
            {loading ? (<Loader />) : (
                <div className='card-list-pokemon container'>
                    {filteredPokemons.length ? (
                            <>
                                {filteredPokemons.map(pokemon => (
                                    <CardPokemon key={pokemon.id} pokemon={pokemon} />
                                ))}
                            </>
                        ) : (
                            <>
                            {allPokemons.map(pokemon => (
                                <CardPokemon key={pokemon.id} pokemon={pokemon} />
                            ))}
                        </>
                        )}
                </div>
             )}
                
                
        </>
    )

}