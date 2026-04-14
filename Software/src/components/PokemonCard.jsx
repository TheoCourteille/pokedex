import React from 'react'
import { Typography, Card, CardContent, Box, Stack, Chip, CircularProgress, Grid } from '@mui/material'

function PokemonCard({ name, stats, types, pokemonId, image }) {

    return (
        <Card id={`card-pokemon-detail-${pokemonId}`}>
            <CardContent >
                <Stack sx={{ marginBottom: 1 }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography id={`text-pokemon-name-${pokemonId}`} variant="h1">
                        {name}
                    </Typography>
                    <Typography id={`text-pokemon-id-${pokemonId}`} variant='h2'>
                        #{pokemonId}
                    </Typography>
                </Stack>
                <Box>
                    <Stack id={`types-container-${pokemonId}`} direction="row" spacing={1}>
                        {types && types.map((type, index) => (
                            <Chip id={`type-${pokemonId}-${type}`} key={index} label={type} size="small" />
                        ))}
                    </Stack>
                </Box>
            </CardContent>
            <img id={`img-pokemon-${pokemonId}`} src={image} alt={name} style={{ width: '100%', height: 'auto' }} />
            <CardContent>
                <Typography id={`text-stats-title-${pokemonId}`} sx={{ marginBottom: 1 }} variant='h3'>
                    Statistics
                </Typography>
                <Box>
                    <Grid id={`stats-container-${pokemonId}`} container spacing={{ xs: 5, md: 12 }} sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {stats.map((stat) => (
                            <Grid item key={stat.name} xs={4} id={`stat-item-${pokemonId}-${stat.name}`}>
                                <Box display="flex" flexDirection="column" alignItems="center" px={2}>
                                    <Box sx={{ marginBottom: 1 }} position="relative" display="inline-flex">
                                        <CircularProgress id={`stat-circle-${pokemonId}-${stat.name}`} variant="determinate" value={stat.value} />
                                        <Box
                                            top={0}
                                            left={0}
                                            bottom={0}
                                            right={0}
                                            position="absolute"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography id={`stat-value-${pokemonId}-${stat.name}`} variant="caption" color="text.secondary">
                                                {stat.value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography id={`stat-name-${pokemonId}-${stat.name}`} sx={{ whiteSpace: 'nowrap' }}>{stat.name}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </CardContent>
        </Card >
    )
}

export default PokemonCard