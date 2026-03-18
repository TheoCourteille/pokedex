import React from 'react'
import { Typography, Card, CardContent, Box, Stack, Chip, CircularProgress, Grid } from '@mui/material'

function PokemonCard({ name, stats, types, id, image }) {

    return (
        <Card>
            <CardContent >
                <Stack sx={{ marginBottom: 1 }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h1">
                        {name}
                    </Typography>
                    <Typography variant='h2'>
                        #{id}
                    </Typography>
                </Stack>
                <Box>
                    <Stack direction="row" spacing={1}>
                        {types && types.map((type, index) => (
                            <Chip key={index} label={type} size="small" />
                        ))}
                    </Stack>
                </Box>
            </CardContent>
            <img src={image} alt={name} style={{ width: '100%', height: 'auto' }} />
            <CardContent>
                <Typography sx={{ marginBottom: 1 }} variant='h3'>
                    Statistiques
                </Typography>
                <Box>
                    <Grid container spacing={{ xs: 5, md: 12 }} sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {stats.map((stat, index) => (
                            <Grid item key={index} xs={4}>
                                <Box display="flex" flexDirection="column" alignItems="center" px={2}>
                                    <Box sx={{ marginBottom: 1 }} position="relative" display="inline-flex">
                                        <CircularProgress variant="determinate" value={stat.value} />
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
                                            <Typography variant="caption" color="text.secondary">
                                                {stat.value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography sx={{ whiteSpace: 'nowrap' }}>{stat.name}</Typography>
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