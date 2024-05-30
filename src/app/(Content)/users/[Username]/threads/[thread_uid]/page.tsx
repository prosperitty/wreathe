'use server'

import CommentsSection from './components/Comments'
import { Suspense } from 'react'
import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'
import { cookies } from 'next/headers'
import Thread from '@/app/(Content)/components/Thread'
import Link from 'next/link'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

export default async function ThreadPage({
  params,
}: {
  params: { Username: string; thread_uid: string }
}) {
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
      <header className="h-16 px-2 sm:px-4">
        <h1 className="h-full flex justify-center items-center font-bold text-2xl">
          Thread
        </h1>
      </header>
      <main className="px-2 sm:px-4">
        <ul className="overflow-y-auto">
          <Suspense fallback={<ThreadSkeleton />}>
            <Thread thread={thread} isLiked={isLike} />
          </Suspense>
        </ul>
      </main>
      <section className="px-2 sm:px-4">
        <Link href={`/compose/comment/${params.thread_uid}`} scroll={false}>
          <button className="text-sm flex justify-evenly items-center rounded-md px-2 py-2 duration-150 bg-white hover:bg-gray-100 text-white bg-gradient-to-br from-[#9B6BFF] to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium text-center">
            <PencilSquareIcon
              aria-label="Compose A Thread"
              title="Compose A Thread"
              className="w-6 h-6 mr-1 cursor-pointer"
            />
            <span>Reply</span>
          </button>
        </Link>
        <div className="py-4">
          <h1 className="h-full flex justify-center items-center font-bold text-2xl">
            Comments
          </h1>
        </div>

        <Suspense fallback={<ThreadSkeleton />}>
          <CommentsSection
            comments={thread.comment}
            threadAuthor={thread.wreathe_user.username}
          />
        </Suspense>
      </section>
    </>
  )
}
