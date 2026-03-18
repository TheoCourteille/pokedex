import React from 'react'
import { Button, Typography, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { Link } from 'react-router-dom';

function PokedexPokemonCard({ name, image, index }) {

    return (
        <Card>
            <CardMedia sx={{ height: 150 }} image={image} title={name} />
            <CardContent>
                <Typography variant="h5" sx={{textAlign:'center'}}>
                    {name}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Link to={"/Pokemon/"+index}>
                    <Button size="small">Voir le pokemon</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default PokedexPokemonCard