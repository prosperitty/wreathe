'use server'
import { cookies } from 'next/headers'

export default async function sendMessage(recepientUsername: string) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  try {
    const response = await fetch(
      `http://localhost:8080/messages/${recepientUsername}`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Needed to include the cookie
        headers: {
          Authorization: bearerToken,
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      console.error('FAILED TO FOLLOW USER', response)
      throw new Error('FAILED TO FOLLOW USER')
    }
    const result = await response.json()
    console.log('does the SEND MESSAGE system work?! ======', result)
    return result
  } catch (error) {
    console.error('Error FOLLOWING the USER:', error)
  }
}
