'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Logout1() {
  // const cookieStore = cookies()
  // const accessToken = cookieStore.get('accessToken')
  // const refreshToken = cookieStore.get('refreshToken')
  // const bearerToken = `Bearer ${refreshToken?.value}`
  // // console.log(refreshToken)
  // if (refreshToken && accessToken) {
  //   try {
  //     const response = await fetch(
  //       'http://localhost:8080/refresh-token/logout',
  //       {
  //         method: 'POST',
  //         mode: 'cors',
  //         credentials: 'include', // Needed to include the cookie
  //         headers: {
  //           Authorization: bearerToken,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     const result = await response.json()
  //     console.log(response.ok)

  //     if (!response.ok) {
  //       return undefined
  //     } else {
  //       console.log('successfull response')
  //       // cookies().set('accessToken', '')
  //       // cookies().set('refreshToken', '')
  //       deleteCookies()
  //       // return response.json()
  //     }
  //   } catch (_) {}
  // }
  return redirect('/')
}
