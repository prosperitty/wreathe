import { cookies } from 'next/headers'
import Content from './components/Content'
import Header from './components/Header'
export default async function Feed({ params }: { params: { Feed: string } }) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(`http://localhost:8080/users/${params.Feed}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
    },
  })
  const result = await response.json()
  console.log(result, 'user data')
  console.log(bearerToken)
  return (
    <>
      <Header />
      <Content />
    </>
  )
}
