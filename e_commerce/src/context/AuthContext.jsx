import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  const isAuthenticated = currentUser !== null

  function login(email, _password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({ email })
        resolve({ email })
      }, 800)
    })
  }

  function signup(email, _password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser({ email })
        resolve({ email })
      }, 800)
    })
  }

  function logout() {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
