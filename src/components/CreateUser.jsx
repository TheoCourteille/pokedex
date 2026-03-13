import Page from './Page'
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import image3 from '../assets/3.jpg'
import { Button, Typography, Box, TextField, Avatar } from '@mui/material'
import { useState } from 'react'
import { getUserByName, insertUser} from '../services/users'
import { useNavigate } from 'react-router-dom'

function CreateUser() {

    const [newUserName, setNewUserName] = useState('')
    const [newUserImage, setNewUserImage] = useState(image1)
    const navigate = useNavigate();

    const handleAddUser = async () => {
        const existingUsers = await getUserByName(newUserName);
        console.log(existingUsers);
        if (existingUsers.length > 0) {
            alert("Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre. \nThis username is already taken. Please choose another one.");
            return;
        } else {
            await insertUser([{ user_name: newUserName, avatar: newUserImage, user_password: null, pokemons: [] }]);
            console.log("user added");
            navigate("/Connexion");
        }
    };

    return (
        <Page>
            <Box sx={{
                marginBottom: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant='h1'>Créer un utilisateur</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant='h4'>Choisir un avatar</Typography>
            </Box>
            <Box sx={{
                marginBottom: 2,
                display: 'flex'
            }}>
                <Avatar src={image1} sx={{ marginRight: 1, filter: newUserImage === image1 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image1)
                }}></Avatar>
                <Avatar src={image2} sx={{ marginRight: 1, filter: newUserImage === image2 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image2)
                }}></Avatar>
                <Avatar src={image3} sx={{ filter: newUserImage === image3 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image3)
                }}></Avatar>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <TextField label="Nom" fullWidth
                    onChange={(e) => {
                        setNewUserName(e.target.value)
                    }}
                    value={newUserName}
                />
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Button variant="contained" fullWidth onClick={handleAddUser}>
                    Créer un compte
                </Button>
            </Box>
        </Page>
    )
}

export default CreateUser