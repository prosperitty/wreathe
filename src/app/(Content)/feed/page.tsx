import { cookies } from 'next/headers'
import Content from './components/Content'
import Header from './components/Header'
export default async function Feed() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(`http://localhost:8080/feed`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return (
    <>
      <Header />
      {result.message}
      <Content feedData={result.threads} />
    </>
  )
}
