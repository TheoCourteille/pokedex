import Page from './Page'
import image1 from '../../../Documentation/assets/1.jpg'
import image2 from '../../../Documentation/assets/2.jpg'
import image3 from '../../../Documentation/assets/3.jpg'
import { Button, Typography, Box, TextField, Avatar } from '@mui/material'
import { useState } from 'react'
import { getUserByName, insertUser} from '../services/users'
import { useNavigate } from 'react-router-dom'

function CreateUser() {

    const [newUserName, setNewUserName] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const [newUserImage, setNewUserImage] = useState(image1)
    const navigate = useNavigate();

    const handleAddUser = async () => {

        if (!newUserName) {
            alert('Please enter a username.');
            return;
        }

        if (!newUserPassword) {
            alert('Please enter a password.');
            return;
        }

        const existingUsers = await getUserByName(newUserName);
        console.log(existingUsers);
        if (existingUsers.length > 0) {
            alert("This username is already taken. Please choose another one.");
            return;
        } else {
            await insertUser([{ user_name: newUserName, avatar: newUserImage, user_password: newUserPassword, pokemons: [] }]);
            console.log("user added");
            navigate("/Connexion");
        }
    };

    return (
        <Page id="page-create-user">
            <Box sx={{
                marginBottom: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography id="title-create-user" variant='h1'>Create user</Typography>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Typography variant='h4'>Choose avatar</Typography>
            </Box>
            <Box sx={{
                marginBottom: 2,
                display: 'flex'
            }}>
                <Avatar id="avatar-choice-1" src={image1} sx={{ marginRight: 1, filter: newUserImage === image1 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image1)
                }}></Avatar>
                <Avatar id="avatar-choice-2" src={image2} sx={{ marginRight: 1, filter: newUserImage === image2 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image2)
                }}></Avatar>
                <Avatar id="avatar-choice-3" src={image3} sx={{ filter: newUserImage === image3 ? 'none' : 'grayscale(100%)', width: 75, height: 75 }} onClick={(e) => {
                    setNewUserImage(image3)
                }}></Avatar>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <TextField id="input-create-username" label="Name" fullWidth
                    onChange={(e) => {
                        setNewUserName(e.target.value)
                    }}
                    value={newUserName}
                />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <TextField id="input-create-password" label="Password" type="password" fullWidth
                    onChange={(e) => {
                        setNewUserPassword(e.target.value)
                    }}
                    value={newUserPassword}
                />
            </Box>
            <Box sx={{ marginBottom: 1 }}>
                <Button id="btn-create-account" variant="contained" fullWidth onClick={handleAddUser}>
                    Create account
                </Button>
            </Box>
        </Page>
    )
}

export default CreateUser