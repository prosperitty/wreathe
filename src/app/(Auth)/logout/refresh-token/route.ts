import { checkRefreshToken } from '@/app/lib/checkRefreshToken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')
  const userData = cookieStore.get('userData')
  const bearerToken = `Bearer ${refreshToken?.value}`
  try {
    if (!refreshToken) {
      cookieStore.delete('accessToken')
      cookieStore.delete('userData')
      return NextResponse.json(null)
    }
    if (accessToken && userData) {
      console.log('access token still exists!')
      return NextResponse.json({
        accessToken: accessToken.value,
        userData: JSON.parse(userData?.value),
      })
    }

    const cookieData = await checkRefreshToken(bearerToken)
    if (cookieData) {
      const { accessToken, refreshToken, userData } = cookieData
      // console.log('ALL COOKIE DATA', cookieData)
      const currentTime = new Date().getTime()
      const oneDay = 24 * 60 * 60 * 1000
      const oneMinute = 60 * 60 * 1000
      cookies().set('refreshToken', refreshToken, {
        httpOnly: process.env.NODE_ENV === 'development' ? false : true,
        secure: true,
        sameSite: 'strict',
        expires: currentTime + oneDay,
        path: '/logout',
      })
      cookies().set('accessToken', accessToken, {
        httpOnly: process.env.NODE_ENV === 'development' ? false : true,
        secure: true,
        sameSite: 'strict',
        expires: currentTime + oneMinute,
        path: '/',
      })
      cookies().set('userData', JSON.stringify(userData), {
        httpOnly: process.env.NODE_ENV === 'development' ? false : true,
        secure: true,
        sameSite: 'strict',
        expires: currentTime + oneMinute,
        path: '/',
      })
      console.log('REFRESHED ALL TOKENS')
    } else {
      return NextResponse.json(null)
    }

    return NextResponse.json({
      accessToken: cookieData.accessToken,
      userData: cookieData.userData,
    })
  } catch (err) {
    console.error('Failed to refresh token', err)
    throw err
  }
}

// const cookieStore = cookies()
// const accessTokenStore = cookieStore.get('accessToken')
// const refreshTokenStore = cookieStore.get('refreshToken')
// const userDataStore = cookieStore.get('userData')
// const bearerToken = `Bearer ${refreshTokenStore?.value}`
// let userData = userDataStore?.value
// let accessToken = accessTokenStore?.value
// let refreshToken = refreshTokenStore?.value
// if (!refreshToken) {
//   userData = null
//   accessToken = null
//   refreshToken = null
// }
// console.log('reached?')
// const cookieData = await checkRefreshToken()
// console.log(cookieData)
// if (cookieData) {
//   const { accessToken, refreshToken, userData } = cookieData
//   cookies().set('accessToken', accessToken, {
//     httpOnly: process.env.NODE_ENV === 'development' ? false : true,
//     sameSite: 'strict',
//     maxAge: 60 * 60 * 1000,
//     path: '/',
//   })
//   cookies().set('refreshToken', refreshToken, {
//     httpOnly: process.env.NODE_ENV === 'development' ? false : true,
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000,
//     path: '/logout',
//   })
//   cookies().set('userData', JSON.stringify(userData), {
//     httpOnly: process.env.NODE_ENV === 'development' ? false : true,
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000,
//     path: '/',
//   })
// }
