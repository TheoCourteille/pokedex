import Page from './Page'
import bin from '../../../Documentation/assets/bin.svg'
import { Button, Typography, Box, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { deleteUserById, getUsers, setCurrentUserInLocalStorage, verifyUserPassword } from '../services/users'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function ConnexionUser() {

    const [users, setUsers] = useState([])
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)
    const [password, setPassword] = useState('')
    const [deleteError, setDeleteError] = useState('')

    const [loginDialogOpen, setLoginDialogOpen] = useState(false)
    const [userToLogin, setUserToLogin] = useState(null)
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    const navigate = useNavigate();

    const openDeleteDialog = (user) => {
        setUserToDelete(user)
        setPassword('')
        setDeleteError('')
        setDeleteDialogOpen(true)
    }

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setUserToDelete(null)
        setPassword('')
        setDeleteError('')
    }

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        console.log(userToDelete);
        console.log(password);
        const success = await deleteUserById(userToDelete.id, password)
        if (!success) {
            setDeleteError('Mot de passe incorrect ou erreur lors de la suppression.')
            return
        }

        closeDeleteDialog()

        const users = await getUsers()
        setUsers(users)
    }

    const openLoginDialog = (user) => {
        setUserToLogin(user)
        setLoginPassword('')
        setLoginError('')
        setLoginDialogOpen(true)
    }

    const closeLoginDialog = () => {
        setLoginDialogOpen(false)
        setUserToLogin(null)
        setLoginPassword('')
        setLoginError('')
    }

    const handleConfirmLogin = async () => {
        if (!userToLogin) return;

        const ok = await verifyUserPassword(userToLogin.id, loginPassword)
        if (!ok) {
            setLoginError('Mot de passe incorrect.');
            return;
        }

        setCurrentUserInLocalStorage(userToLogin)
        closeLoginDialog()
        navigate('/Pokedex')
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

            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Supprimer l'utilisateur</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer le mot de passe de l'utilisateur <strong>{userToDelete?.user_name}</strong> pour confirmer la suppression.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(deleteError)}
                        helperText={deleteError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Annuler</Button>
                    <Button onClick={handleConfirmDelete} color="error">Supprimer</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={loginDialogOpen} onClose={closeLoginDialog}>
                <DialogTitle>Connexion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Entrez le mot de passe pour vous connecter en tant que <strong>{userToLogin?.user_name}</strong>.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        error={Boolean(loginError)}
                        helperText={loginError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeLoginDialog}>Annuler</Button>
                    <Button onClick={handleConfirmLogin} variant="contained">Se connecter</Button>
                </DialogActions>
            </Dialog>
            <Box>
                {users.map((user, index) => (
                    <Box key={index} sx={{
                        marginY: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Avatar src={user['avatar']} sx={{ marginRight: 3, cursor: 'pointer' }} onClick={() => openLoginDialog(user)} />
                        <Typography sx={{ cursor: 'pointer' }} onClick={() => openLoginDialog(user)}>{user['user_name']}</Typography>
                        <Avatar src={bin} variant="contained" color="secondary" onClick={() => openDeleteDialog(user)} sx={{
                            marginLeft: 'auto',
                            display: 'flex',
                            cursor: 'pointer'
                        }} />
                    </Box>
                ))}
            </Box>
            <Divider sx={{marginBottom:2, marginTop:2}}/>
            <Box sx={{ marginBottom: 2}}>
                <Link to="/Create">
                    <Button variant="contained" fullWidth>
                        Créer un utilisateur
                    </Button>
                </Link>
            </Box>
        </Page>
    )
}

export default ConnexionUser