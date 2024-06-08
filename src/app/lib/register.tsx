'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const email = formData.get('email')
  const username = formData.get('username')
  const password = formData.get('password')
  const last_name = formData.get('last_name')
  const first_name = formData.get('first_name')
  const repeat_password = formData.get('repeat_password')

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
          last_name,
          first_name,
          repeat_password,
        }),
      },
    )
    const res = await response.json()
    if (!response.ok) {
      console.error('FAILED TO FETCH REQUEST REGISTER', response)
      throw new Error(`FAILED TO FETCH REQUEST REGISTER: ${res.errorMessage}`)
    }
  } catch (error) {
    console.error('REGISTER ERROR:', error)
    throw error
  }

  revalidatePath('/')
  redirect('/login')
}
