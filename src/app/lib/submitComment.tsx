'use server'
import { cookies } from 'next/headers'

export default async function postComment(formData: FormData) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const content = formData.get('content')
  const reqHeader = {
    Authorization: bearerToken,
    'Content-Type': 'application/json',
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/compose/comment`,
    {
      method: 'POST',
      headers: reqHeader,
      body: JSON.stringify({ content }),
    },
  )

  const result = await response.json()
  console.log('this should work for thwe comment route page ====', result)
  return result
}
