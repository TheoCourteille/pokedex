import { ThemeProvider, createTheme } from '@mui/material'
import { defaultTheme } from '../../Documentation/assets/defaultTheme'
import './App.css'
import CreateUser from './components/CreateUser'
import ConnexionUser from './components/ConnexionUser'
import Pokedex from './components/Pokedex'
import Pokemons from './components/Pokemons'
import Pokemon from './components/Pokemon'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCurrentUser } from './services/users'

function App() {

  const theme = createTheme(defaultTheme)
  return (
    <>
      <ThemeProvider theme={theme} >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={(getCurrentUser) ? <CreateUser /> : <Pokedex /> } />
            <Route path="Create" element={<CreateUser />} />
            <Route path="Pokemons" element={<Pokemons />} />
            <Route path="Pokemon/:id" element={<Pokemon />} />
            <Route path="Connexion" element={<ConnexionUser />} />
            <Route path="Pokedex" element={<Pokedex />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App