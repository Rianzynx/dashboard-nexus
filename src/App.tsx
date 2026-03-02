import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Users from './pages/Users'
import Deposit from './pages/Deposit'
import Conversion from './pages/Conversion'
import Withdraw from './pages/Withdraw'
import Layout from './components/Layout';

import { TransactionProvider } from './contexts/TransactionContext'
import { mockUsers } from './mocks/users'

function App() {
  return (
    <BrowserRouter>
      <TransactionProvider initialUsers={mockUsers}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/conversion" element={<Conversion />} />
            <Route path="/withdraw" element={<Withdraw />} />


          </Route>

          <Route path="/login" element={<Login />} />
          {/* Rota de fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </TransactionProvider>
    </BrowserRouter>
  )
}

export default App