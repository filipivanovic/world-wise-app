import { createContext, useContext } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={true}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
}