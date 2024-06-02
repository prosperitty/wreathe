'use client'

import { useAuthContext } from '@/app/components/context'
import Form from './components/form.'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const { accessToken, setAccessToken, setUserData } = useAuthContext()

  useEffect(() => {
    if (accessToken) {
      return router.push('/feed')
    }
  }, [accessToken, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: { [key: string]: string } = {}
    formData.forEach((value, key) => {
      if (value instanceof File) {
        return new Error('FORM DATA CONTAINS HAS AN INSTANCE OF A FILE')
      } else {
        data[key] = value
      }
    })
    const jsonData = JSON.stringify(data)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include', // Needed to include the cookie
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
    const result = await res.json()

    if (result.accessToken) {
      setAccessToken(result.accessToken)
      setUserData(result.userData)
      return router.push('/feed')
    } else {
      return console.log(result.error)
    }
  }

  return <Form handleSubmit={handleSubmit} />
}
