// 'use server'
import 'server-only'
import { cookies } from 'next/headers'

//cant use this without route handler or server action. cannot use in server component
export function deleteCookies() {
  cookies().delete('refreshToken')
  cookies().delete('accessToken')
  cookies().delete('userData')
}
