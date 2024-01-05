'use server'

import CommentsSection from './components/Comments'
import { Suspense } from 'react'
import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'
import { cookies } from 'next/headers'
import Thread from '@/app/(Content)/components/Thread'

export default async function ThreadPage({ params }) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const API_URL = `http://localhost:8080/users/${params.Username}/threads/${params.thread_uid}`
  const response = await fetch(API_URL, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  const { thread, isLike } = result

  return (
    <>
      {/* <Header /> */}
      <main>
        <ul className='overflow-y-auto'>
          <Suspense fallback={<ThreadSkeleton />}>
            <Thread thread={thread} isLiked={isLike} />
          </Suspense>
        </ul>
      </main>
      <Suspense fallback={<ThreadSkeleton />}>
        <CommentsSection comments={thread.comment} />
      </Suspense>
    </>
  )
}
