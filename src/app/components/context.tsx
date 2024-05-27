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
  userData: string
  error: string
}

interface UserData {
  user_uid: string
  first_name: string
  last_name: string
  email: string | null
  username: string
}

interface IAuthContext {
  accessToken: string | null
  setAccessToken: Dispatch<SetStateAction<AccessToken>>
  userData: UserData | null
  setUserData: Dispatch<SetStateAction<UserData | null>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<AccessToken | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function checkRefreshToken() {
    try {
      const res = await fetch('http://localhost:8080/logout/refresh-token', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result: ResponseData = await res.json()
      if (!res.ok) {
        console.error('FAILED TO FETCH REFRESH TOKEN API ENDPOINT')
        throw new Error(result.error)
      }
      const newAccesstoken = result.accessToken
      //bug in server code where refresh token i set as json stringify must be parsed
      result.userData
        ? setUserData(JSON.parse(result.userData))
        : setUserData(null)
      newAccesstoken ? setAccessToken(newAccesstoken) : setAccessToken(null)
    } catch (error) {
      console.error('ERROR REFRESHING TOKEN:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkRefreshToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userData,
        setUserData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext<IAuthContext | null>(AuthContext)
