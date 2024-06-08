'use client'
import { useState, useEffect } from 'react'
import Thread from '../../components/Thread'
import ScrollToTopButton from '../../components/ScrollButton'
import { Suspense } from 'react'
import ThreadSkeleton from '../../components/ThreadSkeleton'
import { callRefreshToken } from '@/app/lib/callRefreshToken'

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ')
// }

interface Props {
  feedData: Array<ThreadData>
}

export default function Content(props: Props) {
  // const [refreshing, setRefreshing] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  //idk if this is even the way to do this....
  useEffect(() => {
    ;(async () => {
      const data = await callRefreshToken()
      setUserData(data)
    })()

    // const handleRefresh = () => {
    //   // Add your refresh logic here
    //   // For example, you can fetch new data from an API

    //   // Simulate an asynchronous operation (remove this in real implementation)
    //   setRefreshing(true)
    //   setTimeout(() => {
    //     setRefreshing(false)
    //   }, 1500)
    // }

    // window.addEventListener('scroll', handleRefresh)

    // return () => {
    //   window.removeEventListener('scroll', handleRefresh)
    // }
  }, [])

  if (userData) {
    return (
      //overflow-y-auto was here replaced in layout
      <main className="px-2 sm:px-4 h-full">
        <ScrollToTopButton />
        <ul className="overflow-y-auto">
          <Suspense
            fallback={
              <>
                <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
                <ThreadSkeleton />
              </>
            }
          >
            {props.feedData.map((post) => {
              const isLiked = post.likes.some(
                (like) =>
                  like.user_uid === userData.user_uid &&
                  like.thread_uid === post.thread_uid,
              )
              return (
                <Thread key={post.thread_uid} isLiked={isLiked} thread={post} />
              )
            })}
          </Suspense>
        </ul>
      </main>
    )
  }
}

// if (userData) {
//   const feed1 = props.feedData.map((post) => {
//     const isLiked = post.likes.some(
//       (like) =>
//         like.user_uid === userData.user_uid &&
//         like.thread_uid === post.thread_uid,
//     )
//     return <Thread key={post.thread_uid} isLiked={isLiked} thread={post} />
//   })
//   return setFeedData(feed1)
// } else {
//   callRefreshToken(setUserData)
// }
