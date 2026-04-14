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
            setDeleteError('Incorrect password or an error occurred during deletion.')
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
            setLoginError('Incorrect password !');
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
        <Page id="page-connexion-user">
            <Box sx={{
                marginBottom: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant='h1'>Connect to the pokedex</Typography>
            </Box>

            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Delete the user</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the user's password of <strong>{userToDelete?.user_name}</strong> to confirm the deletion.
                    </DialogContentText>
                    <TextField
                        id="input-delete-password"
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
                    <Button id="btn-delete-cancel" onClick={closeDeleteDialog}>Cancel</Button>
                    <Button id="btn-delete-confirm" onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={loginDialogOpen} onClose={closeLoginDialog}>
                <DialogTitle>Log in</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your password to log in as <strong>{userToLogin?.user_name}</strong>.
                    </DialogContentText>
                    <TextField
                        id="input-login-password"
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
                    <Button id="btn-login-cancel" onClick={closeLoginDialog}>Cancel</Button>
                    <Button id="btn-login-confirm" onClick={handleConfirmLogin} variant="contained">Log in</Button>
                </DialogActions>
            </Dialog>
            <Box>
                {users.map((user, index) => (
                    <Box key={index} sx={{
                        marginY: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Avatar id={`avatar-user-${user.id}`} src={user['avatar']} sx={{ marginRight: 3, cursor: 'pointer' }} onClick={() => openLoginDialog(user)} />
                        <Typography id={`text-user-${user.id}`} sx={{ cursor: 'pointer' }} onClick={() => openLoginDialog(user)}>{user['user_name']}</Typography>
                        <Avatar id={`btn-delete-user-${user.id}`} src={bin} variant="contained" color="secondary" onClick={() => openDeleteDialog(user)} sx={{
                            marginLeft: 'auto',
                            display: 'flex',
                            cursor: 'pointer'
                        }} />
                    </Box>
                ))}
            </Box>
            <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
            <Box sx={{ marginBottom: 2 }}>
                <Link to="/Create">
                    <Button id="btn-create-user" variant="contained" fullWidth>
                        Create user
                    </Button>
                </Link>
            </Box>
        </Page>
    )
}

export default ConnexionUser