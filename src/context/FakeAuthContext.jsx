import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  user: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case 'logout':
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

  const login = (email, password) => {}
  const logout = () => {}

  return (
    <AuthContext.Provider value={(user, isAuthenticated, login, logout)}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
}