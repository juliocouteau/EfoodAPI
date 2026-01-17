import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './styles/global' // Agora com o nome exato e entre chaves
import { Home } from './pages/home'
import { Perfil } from './pages/perfil'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App