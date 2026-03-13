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
        <Page>
            <Box>
                <Box sx={{
                    marginBottom: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant='h1' sx={{
                        marginBottom: 1
                    }}>Chercher un pokémon</Typography>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField label="Recherche..." fullWidth
                        onChange={(e) => {
                            setPokemonsSearch(e.target.value)
                        }}
                        value={pokemonsSearch}
                    />
                </Box>
                <Typography>{pokemons.length} pokémons trouvés</Typography>
                <Box>
                    <Grid container spacing={{ xs: 5, md: 15 }} sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {pokemons.map((pokemon, index) => (
                            <Grid item xs={5} key={index}>
                                <PokedexPokemonCard name={pokemon.name} image={getPokemonSpriteUrl(pokemon.index)} index={pokemon.index} />
                            </Grid>
                        ))}
                        {pokemons.length % 2 !== 0 && (
                            <Grid item xs={5}></Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Page >
    )
}

export default Pokemons
