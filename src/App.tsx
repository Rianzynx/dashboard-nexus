import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Users from './pages/Users'
import Deposit from './pages/Deposit'
import Conversion from './pages/Conversion'
import Withdraw from './pages/Withdraw'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/conversion" element={<Conversion />} />
        <Route path="/withdraw" element={<Withdraw />} />

        {/* Rota de fallback: qualquer endereço errado manda para o login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
