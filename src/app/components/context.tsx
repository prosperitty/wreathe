'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('')

  useEffect(() => {
    async function checkRefreshToken() {
      try {
        const result = await (
          await fetch('http://localhost:8080/refresh-token', {
            method: 'POST',
            credentials: 'include', // Needed to include the cookie
            headers: {
              'Content-Type': 'application/json',
            },
          })
        ).json()
        // if (!result.ok) {
        //   throw new Error('Failed to refresh token')
        // }
        console.log(result)
        const newAccesstoken = result.accessToken
        newAccesstoken ? setUser(newAccesstoken) : setUser(null)
      } catch (error) {
        console.error('Error refreshing access token:', error)
      }
    }
    checkRefreshToken()
  }, [])

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
