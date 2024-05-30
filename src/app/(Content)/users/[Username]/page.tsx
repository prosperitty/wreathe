import { cookies } from 'next/headers'
import Header from './components/Header'
import { Suspense } from 'react'
import ThreadSkeleton from '../../components/ThreadSkeleton'
import Tabs from './components/Tabs'

interface AllLikes {
  thread: ThreadData[]
  comment: CommentData[]
}

export default async function Username({
  params,
}: {
  params: { Username: string }
}) {
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
    },
  )
  const result = await response.json()
  const {
    profileData,
    profileThreads,
    profileComments,
    profileLikes,
    allLikes,
    isFollowing,
  } = result

  return (
    <>
      <Header
        //profileData must be kept on server and must set individual fields because it contains sensitive credentials
        username={profileData.username}
        firstName={profileData.first_name}
        lastName={profileData.last_name}
        following={profileData.followers}
        followers={profileData.following}
        posts={profileThreads.length + profileComments.length}
        isFollowing={isFollowing}
        bio={profileData.bio}
      />
      <Suspense
        fallback={
          <>
            <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
            <ThreadSkeleton />
          </>
        }
      >
        <Tabs
          profileThreads={profileThreads}
          profileComments={profileComments}
          profileLikes={allLikes}
        />
      </Suspense>
    </>
  )
}
