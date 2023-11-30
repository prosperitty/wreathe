import { cookies } from 'next/headers'
import Content from '../../feed/components/Content'
import Header from './components/Header'
import Threads from './components/Threads'
import ScrollToTopButton from '../../components/ScrollButton'
import { Suspense } from 'react'
import Feed from './components/Feed'
import ThreadSkeleton from '../../components/ThreadSkeleton'

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
      <Header username={params.Username} />
      {/* <div>
        My Post: {params.Username} {result.message}
      </div> */}
      <Threads />
    </>
  )
}
