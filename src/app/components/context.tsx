'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type AccessToken = string | null

interface ResponseData {
  accessToken: string
  error: string
}

interface IAuthContext {
  accessToken: string | null
  setAccessToken: Dispatch<SetStateAction<AccessToken>>
}

const AuthContext = createContext<IAuthContext>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<AccessToken>(null)

  useEffect(() => {
    async function checkRefreshToken() {
      try {
        const res = await fetch('http://localhost:8080/refresh-token', {
          method: 'POST',
          credentials: 'include', // Needed to include the cookie
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const result: ResponseData = await res.json()
        if (!res.ok) {
          throw new Error(result.error)
        }
        console.log(result)
        const newAccesstoken = result.accessToken
        newAccesstoken ? setAccessToken(newAccesstoken) : setAccessToken(null)
      } catch (error) {
        console.error('Error refreshing access token:', error)
      }
    }
    checkRefreshToken()
  }, [])

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext<IAuthContext>(AuthContext)
