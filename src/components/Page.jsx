import { Box, Container, Card, Typography, Avatar, Button } from '@mui/material'
import logo from '../assets/logo.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, removeCurrentUser } from '../services/users'

function Page({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleDisconnectUser = () => {
    removeCurrentUser()
    setUser(null)
  }


  return (
    <Box>
      <Box sx={{ backgroundColor: "#F8F4F4", minHeight: '100vh' }}>
        <Container maxWidth="sm">
          <Box sx={{ paddingTop: 5, paddingBottom: 6 }}>
            <Box sx={{ marginBottom: 5, maxWidth: '300px', marginX: 'auto' }}>
              <img src={logo} alt="logo pokemon" />
            </Box>
            <Box sx={{
              marginBottom: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {user && (
                <Avatar src={user['avatar']} sx={{ marginRight: 3 }}></Avatar>
              )}
              {user && (
                <Typography sx={{ marginRight: 3 }}>Bonjour {user['user_name']}</Typography>
              )}
              {user && (
                <Link to="/connexion">
                  <Button onClick={(e) => { handleDisconnectUser() }} variant='contained'>Se déconnecter</Button>
                </Link>
              )}
            </Box>
            <Card sx={{ padding: 2 }}>
              {children}
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Page