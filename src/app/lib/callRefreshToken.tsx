'use client'

interface Response {
  userData: UserData
}

export async function callRefreshToken() {
  try {
    const response = await fetch(`/logout/refresh-token`, {
      // cache: 'force-cache',
      // next: { revalidate: 60 },
    })
    const res: Response = await response.json()
    return res.userData
  } catch (err) {
    console.error('There was an issue refreshing token: ', err)
    return null
  }
}

// async function callRefreshToken() {
//   const response = await fetch(`/logout/refresh-token`)
//   const res = await response.json()
//   return setUserData(res.userData)
// }
