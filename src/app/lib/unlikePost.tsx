'use server'
import { cookies } from 'next/headers'

export default async function unlikePost(isLiked: boolean, url: string) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  if (!isLiked) {
    console.log('this post is not liked.')
    console.log('liking this post.....')
  }
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: bearerToken,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      console.error('Failed to unlike the post')
      throw new Error('Failed to unlike the post')
    }
    const result = await response.json()
    console.log(
      'does the unlike system work?! ========================= \n',
      result
    )
    return result
  } catch (error) {
    console.error('Error unliking the post:', error)
  }
}
