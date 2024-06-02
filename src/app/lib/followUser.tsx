'use server'
import { cookies } from 'next/headers'

export default async function followUser(userId: string) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/follow`,
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
    console.log('does the FOLLOW ysstem work?! ======', result)
    return result
  } catch (error) {
    console.error('Error FOLLOWING the USER:', error)
  }
}
