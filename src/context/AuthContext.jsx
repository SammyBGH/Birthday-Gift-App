import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // ✅ Load admin credentials from .env
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_USN
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken')
      if (token) {
        setUser({ id: 'admin', email: ADMIN_EMAIL, role: 'admin' })
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  // ✅ Fix login logic
  const login = async (enteredEmail, enteredPassword) => {
    try {
      if (enteredEmail === ADMIN_EMAIL && enteredPassword === ADMIN_PASS) {
        const mockUser = { id: 'admin', email: ADMIN_EMAIL, role: 'admin' }
        localStorage.setItem('authToken', 'mock-token')
        setUser(mockUser)
        toast.success('Logged in successfully!')
        return true
      } else {
        toast.error('Invalid credentials')
        return false
      }
    } catch (error) {
      toast.error('Login failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
