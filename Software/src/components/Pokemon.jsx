import Page from './Page'
import { Button, Box, FormGroup, FormControl } from '@mui/material'
import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemonSpriteUrl, fetchPokemon } from '../services/APIPokmeon';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addPokemonToCurentUser, getCurrentUser, deletePokemonFromCurrentUser } from '../services/users';
import { useNavigate } from 'react-router-dom'

function Pokemon() {

    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = getCurrentUser();
        if (userData) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const pokemonData = await fetchPokemon(id);
            if (pokemonData) {
                setPokemon(pokemonData);
            }
        }
        fetchData();
    }, []);

    const handleAddPokemon = async () => {
        await addPokemonToCurentUser(id, pokemon);
        navigate("/Pokedex");
    }

    const handleDeletePokemon = async () => {
        await deletePokemonFromCurrentUser(id);
        navigate("/Pokedex");
    }

    return (
        <Page>
            <Box>
                <Box>
                    {user && pokemon && pokemon.name && (
                        <PokemonCard name={pokemon.name} stats={pokemon.stats} types={pokemon.types} id={id} image={getPokemonSpriteUrl(id)} />
                    )}
                </Box>
                <FormGroup>
                    <FormControl sx={{ marginBottom: 2 }}>
                        {user && user.pokemons && user.pokemons.some(userPokemon => userPokemon.id === id) ? (
                            <Button onClick={() => { handleDeletePokemon() }} variant="contained" fullWidth>Supprimer du pokedex</Button>
                        ) : (
                            <Button onClick={() => { handleAddPokemon() }} variant="contained" fullWidth>Ajouter dans le pokedex</Button>
                        )}
                    </FormControl>
                    <FormControl>
                        <Link to="/Pokedex">
                            <Button variant="outlined" fullWidth>Retour au pokedex</Button>
                        </Link>
                    </FormControl>
                </FormGroup>

            </Box>
        </Page >
    )
}

export default Pokemon