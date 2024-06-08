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
    const currentTime = new Date().getTime()
    const oneDay = 24 * 60 * 60 * 1000
    const oneMinute = 60 * 60 * 1000
    cookies().set('refreshToken', result.refreshToken, {
      httpOnly: process.env.NODE_ENV === 'development' ? false : true,
      secure: true,
      sameSite: 'strict',
      expires: currentTime + oneDay,
      path: '/logout',
    })
    cookies().set('accessToken', result.accessToken, {
      httpOnly: process.env.NODE_ENV === 'development' ? false : true,
      secure: true,
      sameSite: 'strict',
      expires: currentTime + oneMinute,
      path: '/',
    })
    cookies().set('userData', JSON.stringify(result.userData), {
      httpOnly: process.env.NODE_ENV === 'development' ? false : true,
      secure: true,
      sameSite: 'strict',
      expires: currentTime + oneMinute,
      path: '/',
    })
  } catch (error) {
    console.error('LOGIN ERROR:', error)
    throw error
  }

  revalidatePath('/(Content)')
  redirect('/feed')
}
