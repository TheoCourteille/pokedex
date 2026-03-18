import Page from './Page'
import { Button, Typography, Box, Grid, Divider } from '@mui/material'
import { getCurrentUser, getPokemonsFromUserId } from '../services/users'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PokedexPokemonCard from './PokedexPokemonCard';
import { getPokemonSpriteUrl, fetchPokemon } from '../services/APIPokmeon';
import { useNavigate } from 'react-router-dom';


function Pokedex() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getCurrentUser();
            console.log("Utilisateur actuel récupéré : ", userData);
            if (userData) {
                setUser(userData);
            } else {
                navigate('/Connexion');
            }
        }
        fetchUser();
    }, []);
    
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
                    }}>Pokedex</Typography>
                </Box>
                <Box>
                    {user && Object.keys(user['pokemons']).length === 0 ? (
                        <Typography sx={{
                            marginBottom: 1
                        }}>Votre pokedex est vide</Typography>
                    ) : (
                        <Grid container spacing={{ xs: 5, md: 15 }} sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {user && Object.values(user['pokemons']).map((pokemon, index) => (
                                <Grid item key={index}>
                                    <PokedexPokemonCard name={pokemon.name} image={getPokemonSpriteUrl(pokemon.id)} index={pokemon.id} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
                <Divider sx={{marginBottom:2, marginTop:2}}/>
                <Box sx={{ marginBottom: 1 }}>
                    <Link to="/Pokemons">
                        <Button variant="contained" fullWidth>Chercher un pokemon</Button>
                    </Link>
                </Box>
            </Box>
        </Page >
    )
}

export default Pokedex