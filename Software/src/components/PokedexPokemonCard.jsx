import React from 'react'
import { Button, Typography, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { Link } from 'react-router-dom';

function PokedexPokemonCard({ name, image, pokemonId }) {

    return (
        <Card id={`card-pokemon-${pokemonId}`}>
            <CardMedia id={`img-pokemon-${pokemonId}`} sx={{ height: 150 }} image={image} title={name} />
            <CardContent>
                <Typography id={`text-pokemon-${pokemonId}`} variant="h5" sx={{ textAlign: 'center' }}>
                    {name}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Link id={`link-pokemon-${pokemonId}`} to={"/Pokemon/" + pokemonId}>
                    <Button id={`btn-see-pokemon-${pokemonId}`} size="small">See the pokemon</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default PokedexPokemonCard