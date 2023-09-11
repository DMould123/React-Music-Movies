import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  // Initialize user as null - assuming no user is logged in initially
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch the user data from the server when the component mounts
    if (!user) {
      axios
        .get('/profile')
        .then(({ data }) => {
          setUser(data)
        })
        .catch((error) => {
          console.error('Error fetching user data:', error)
        })
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
