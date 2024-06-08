'use server'

interface ResponseData {
  accessToken: string
  refreshToken: string
  userData: string
  success: boolean
  error: string
}

export async function checkRefreshToken(bearerToken: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/logout/refresh-token`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken,
        },
      },
    )
    const res: ResponseData = await response.json()
    if (!response.ok || !res.success) {
      console.error('FAILED TO FETCH REFRESH TOKEN API ENDPOINT')
      throw new Error(res.error)
    }
    return {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      userData: res.userData,
    }
  } catch (error) {
    console.error('ERROR REFRESHING TOKEN:', error)
    return null
  }
}
