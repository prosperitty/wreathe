'use server'
import { cookies } from 'next/headers'

export default async function unFollowUser(userId: string) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  try {
    const response = await fetch(
      `http://localhost:8080/users/${userId}/unfollow`,
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
      console.error('FAILED TO UNFOLLOW USER')
      throw new Error('FAILED TO UNFOLLOW USER')
    }
    const result = await response.json()
    console.log('does the UNFOLLOW ysstem work?! ======', result)
    return result
  } catch (error) {
    console.error('Error UNFOLLOWING the USER:', error)
  }
}
