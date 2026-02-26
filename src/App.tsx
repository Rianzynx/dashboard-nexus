import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import './pages/Login.tsx'
import './pages/Home.tsx'
import './pages/Users.tsx'
import './pages/Deposit.tsx'
import './pages/Withdraw.tsx'
import './pages/Conversion.tsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/usuarios" element={<h1>Users</h1>} />
        <Route path="/deposito" element={<h1>Deposit</h1>} />
        <Route path="/conversao" element={<h1>Conversion</h1>} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
