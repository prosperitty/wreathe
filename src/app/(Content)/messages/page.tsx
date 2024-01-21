import { cookies } from 'next/headers'
// import { Suspense } from 'react'

export default async function Messages() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(`http://localhost:8080/messages`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
    },
  })
  const result = await response.json()
  console.log(result)

  return (
    <div>
      <p>this is messages route</p>
    </div>
  )
}
