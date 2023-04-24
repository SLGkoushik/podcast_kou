import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth , (authUser) => {
      if (authUser) {
        console.log("logged in")
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  return { user, signUp, login, logout }
}
