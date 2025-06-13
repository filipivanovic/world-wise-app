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

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz'
}

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER })
    }
  }
  const logout = () => {
    dispatch({ type: 'logout' })
  }

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

export { AuthProvider, useAuth }