import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { useUser } from './providers/UserProvider'
import { Button } from './components/ui/button'
import { ProtectedRoute } from './components/ProtectedRoute'

function Dashboard() {
  const { user, logout } = useUser()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || user?.email}!</h1>
      <p className="mb-4">You are logged in.</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route
        path="/register"
        element={
          <ProtectedRoute requireAuth={false}>
            <RegisterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
