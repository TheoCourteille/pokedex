import Page from './Page'
import bin from '../assets/bin.svg'
import { Button, Typography, Box, Avatar, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { deleteUserById, getUsers, setCurrentUserInLocalStorage } from '../services/users'
import { Link } from 'react-router-dom'

function ConnexionUser() {

    const [users, setUsers] = useState([])

    const handleDeleteUser = async (id) => {
        await deleteUserById(id)
        const users = await getUsers()
        setUsers(users)
    }

    const handleConnectUser = (user) => {
        setCurrentUserInLocalStorage(user)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers()
            if (users) {
                setUsers(users)
            }
        }
        fetchUsers()
    }, [])

    return (
        <Page>
            <Box sx={{
                marginBottom: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant='h1'>Connexion au Pokedex</Typography>
            </Box>
            <Box>
                {users.map((user, index) => (
                    <Box key={index} sx={{
                        marginY: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Link to="/Pokedex">
                            <Avatar src={user['avatar']} sx={{ marginRight: 3 }} onClick={(e) => { handleConnectUser(user) }}></Avatar>
                        </Link>
                        <Link to="/Pokedex" style={{ textDecoration: 'none' }}>
                            <Typography onClick={(e) => { handleConnectUser(user) }}>{user['user_name']}</Typography>
                        </Link>
                        <Avatar src={bin} variant="contained" color="secondary" onClick={
                            () => {
                                handleDeleteUser(user.id)
                            }
                        } sx={{
                            marginLeft: 'auto',
                            display: 'flex'
                        }}></Avatar>
                    </Box>
                ))}
            </Box>
            <Divider sx={{marginBottom:2, marginTop:2}}/>
            <Box sx={{ marginBottom: 2}}>
                <Link to="/">
                    <Button variant="contained" fullWidth>
                        Créer un utilisateur
                    </Button>
                </Link>
            </Box>
        </Page>
    )
}

export default ConnexionUser