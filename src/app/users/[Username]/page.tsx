import { cookies } from 'next/headers'
import Content from './components/Content'
import Header from './components/Header'

interface params {
  params: { Username: string }
}

export default async function Username({ params }: params) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(
    `http://localhost:8080/users/${params.Username}`,
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'include', // Needed to include the cookie
      headers: {
        Authorization: bearerToken,
      },
    }
  )
  const result = await response.json()
  console.log(result, 'user data')
  console.log(bearerToken)
  return (
    <>
      <div className='max-w-2xl mx-auto'>
        <Header />
        <Content />
        <div>
          My Post: {params.Username} {result.message}
        </div>
      </div>
    </>
  )
}
