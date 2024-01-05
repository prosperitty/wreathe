'use server'
import { cookies } from 'next/headers'

export default async function likePost(isLiked: boolean, url: string) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  if (isLiked) {
    console.log('this post is already liked.')
    console.log('unliking this post.....')
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: bearerToken,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      console.error('Failed to like the post')
      throw new Error('Failed to like the post')
    }
    const result = await response.json()
    console.log('does the like ysstem work?! ======', result)
    return result
  } catch (error) {
    console.error('Error liking the post:', error)
  }
}
