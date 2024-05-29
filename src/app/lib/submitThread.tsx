'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function postThread(formData: FormData) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const content = formData.get('content')
  const reqHeader = {
    Authorization: bearerToken,
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(`http://localhost:8080/compose/thread`, {
      method: 'POST',
      headers: reqHeader,
      body: JSON.stringify({ content }),
    })
    if (response.ok) {
      const result = await response.json()
      console.log('this should work from the route page ====', result)
      return result
    }
  } catch (error) {
    console.log(error)
    throw error
  }

  revalidatePath('/feed')
  redirect('/feed')
}
