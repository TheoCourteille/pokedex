import React from 'react'
import Page from './Page'
import { Typography, Box, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import PokedexPokemonCard from './PokedexPokemonCard';
import { getPokemonSpriteUrl, fetchPokemonNames } from '../services/APIPokmeon';

function Pokemons() {

    const [pokemons, setPokemons] = useState([]);
    const [pokemonsSearch, setPokemonsSearch] = useState('')

    useEffect(() => {
        async function fetchData() {
            const pokemons = await fetchPokemonNames(pokemonsSearch);
            if (pokemons) {
                setPokemons(pokemons);
            }
        }
        fetchData();
    }, [pokemonsSearch]);

    return (
        <Page id="page-pokemons-search">
            <Box>
                <Box sx={{
                    marginBottom: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography id="title-pokemons-search" variant='h1' sx={{
                        marginBottom: 1
                    }}>Search a pokemon</Typography>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField id="input-pokemon-search" label="Search..." fullWidth
                        onChange={(e) => {
                            setPokemonsSearch(e.target.value)
                        }}
                        value={pokemonsSearch}
                    />
                </Box>
                <Typography id="text-pokemon-count">{pokemons.length} pokemon found</Typography>
                <Box>
                    <Grid id="grid-pokemons-search" container spacing={{ xs: 5, md: 15 }} sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {pokemons.map((pokemon) => (
                            <Grid item xs={5} key={pokemon.id} id={`search-pokemon-item-${pokemon.id}`}>
                                <PokedexPokemonCard id={`search-pokemon-${pokemon.id}`} name={pokemon.name} image={getPokemonSpriteUrl(pokemon.id)} pokemonId={pokemon.id} />
                            </Grid>
                        ))}
                        {pokemons.length % 2 !== 0 && (
                            <Grid item xs={5} id="grid-search-empty-placeholder"></Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Page >
    )
}

export default Pokemons
