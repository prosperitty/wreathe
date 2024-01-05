import { cookies } from 'next/headers'
import Header from './components/Header'
import Threads from './components/Threads'
import { Suspense } from 'react'
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
  const { profileData, profileThreads, profileComments, profileLikes } = result

  return (
    <>
      <Header
        username={profileData.username}
        firstName={profileData.first_name}
        lastName={profileData.last_name}
      />
      <Suspense
        fallback={
          <>
            <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
            <ThreadSkeleton />
          </>
        }
      >
        <Threads
          profileThreads={profileThreads}
          profileComments={profileComments}
          profileLikes={profileLikes}
        />
      </Suspense>
    </>
  )
}
