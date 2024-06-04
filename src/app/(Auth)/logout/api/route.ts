import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')
  const bearerToken = `Bearer ${refreshToken?.value}`
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    },
  })
  const res = await response.json()
  if (!response.ok || !res.success) return undefined
  cookies().set('refreshToken', '', { maxAge: 0, path: '/logout' })
  cookieStore.delete('accessToken')
  cookieStore.delete('userData')

  return NextResponse.json({ res })
}
