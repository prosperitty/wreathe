'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

interface Thread {
  thread_uid: string
  content: string
  ispublished: boolean
  thread_timestamp: Date
  author_ref: string | null
}

interface APIResponse {
  thread: Thread
  threadURL: string
}

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/compose/thread`,
      {
        method: 'POST',
        headers: reqHeader,
        body: JSON.stringify({ content }),
      },
    )
    if (response.ok) {
      const result: APIResponse = await response.json()
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

// async function postThread(formData: FormData) {
//   'use server'
//   const content = formData.get('content')

//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/compose/thread`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ content }),
//   })

//   const result = await response.json()
//   console.log('this should work', result)
//   return result
// }
