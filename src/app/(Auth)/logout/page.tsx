'use client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Logout() {
  // const { setAccessToken } = useAuthContext()
  //have to use client component to logout, next js probably provides a way to logout with a server component
  useEffect(() => {
    const fetchLogOut = async () => {
      const response = await fetch(`/logout/api`, {
        method: 'GET',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await response.json()
      if (!response.ok || !res.success) return <p>failed to log out</p>
      return console.log('successfully logged out.')
    }
    fetchLogOut()
    return redirect('/')
  }, [])
}
