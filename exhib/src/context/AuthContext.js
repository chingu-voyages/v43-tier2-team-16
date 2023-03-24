import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase-config'
import { onAuthStateChanged } from '@firebase/auth'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [usersData, setUsersData] = useState([])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      // console.log(user);
    })
    return () => {
      unsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, usersData, setUsersData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
