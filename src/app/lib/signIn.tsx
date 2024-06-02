'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include', // Needed to include the cookie
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const result = await response.json()
    if (!response.ok) {
      console.error('FAILED TO LOGIN', response)
      throw new Error(`FAILED TO LOGIN: ${result.errorMessage}`)
    }
    cookies().set('accessToken', result.accessToken, {
      // httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
      path: '/',
    })
    cookies().set('refreshToken', result.refreshToken, {
      // httpOnly: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/logout',
    })
    cookies().set('userData', JSON.stringify(result.userData), {
      // httpOnly: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    })
  } catch (error) {
    console.error('LOGIN ERROR:', error)
    throw error
  }

  revalidatePath('/(Content)')
  redirect('/feed')
}
