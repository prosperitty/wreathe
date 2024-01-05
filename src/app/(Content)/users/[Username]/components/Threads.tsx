'use client'

import { Suspense, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import Thread from '../../../components/Thread'
import ScrollToTopButton from '../../../components/ScrollButton'
import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'
import Comment from '@/app/(Content)/components/Comment'
import { useAuthContext } from '@/app/components/context'
import LikeButton from '@/app/(Content)/components/LikeButton'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Threads(props) {
  const [threads, setThreads] = useState([])
  const [comments, setComments] = useState([])
  const { userData } = useAuthContext()
  let [categories] = useState({
    Threads: [...props.profileThreads],
    Comments: [...props.profileComments],
    Likes: [...props.profileLikes],
  })

  useEffect(() => {
    if (userData) {
      setProfileFeed(userData)
      setCommentFeed(userData)
    } else {
      setProfileFeed(null)
      setCommentFeed(null)
    }
  }, [userData])

  const setProfileFeed = (user) => {
    if (user) {
      const profileFeed = categories.Threads.map((post) => {
        const isLiked = post.likes.some(
          (like) =>
            like.user_uid === user.user_uid &&
            like.thread_uid === post.thread_uid
        )
        return <Thread key={post.thread_uid} isLiked={isLiked} thread={post} />
      })
      setThreads(profileFeed)
    } else {
      const profileFeed = categories.Threads.map((post) => {
        return <Thread key={post.thread_uid} isLiked={false} thread={post} />
      })
      setThreads(profileFeed)
    }
  }

  const setCommentFeed = (user) => {
    if (user) {
      const commentFeed = props.profileComments.map((post) => {
        const isLiked = post.comment_likes.some(
          (like) =>
            like.user_uid === user.user_uid &&
            like.comment_uid === post.comment_uid
        )
        console.log(isLiked)
        return (
          <li key={post.comment_uid}>
            <Comment
              commentData={post}
              likeButton={<LikeButton isLiked={isLiked} commentData={post} />}
            />
          </li>
        )
      })
      setComments(commentFeed)
    } else {
      const commentFeed = props.profileComments.map((post) => {
        return (
          <li key={post.comment_uid}>
            <Comment
              commentData={post}
              likeButton={<LikeButton isLiked={false} commentData={post} />}
            />
          </li>
        )
      })
      setComments(commentFeed)
    }
  }

  return (
    <main className='w-full px-2 sm:px-4'>
      <ScrollToTopButton />
      <Tab.Group>
        <Tab.List className='flex rounded-xl'>
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 dark:text-white',
                  'ring-white/60 ring-offset-2 ring-offset-amber-200 focus:outline-none focus:ring-0',
                  selected
                    ? 'bg-[#9B6BFF] shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-0'
            )}
          >
            <ul className='overflow-y-auto'>
              <Suspense
                fallback={
                  <>
                    <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
                  </>
                }
              >
                {threads}
              </Suspense>
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-0'
            )}
          >
            <ul className='overflow-y-auto space-y-3'>
              <Suspense
                fallback={
                  <>
                    <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
                  </>
                }
              >
                {comments}
              </Suspense>
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-0'
            )}
          >
            <ul className='overflow-y-auto space-y-3'>
              <Suspense
                fallback={
                  <>
                    <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
                  </>
                }
              >
                {props.profileLikes.map((post) => (
                  <Thread
                    key={post.thread.thread_uid}
                    isLiked={true}
                    thread={post.thread}
                  />
                ))}
              </Suspense>
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  )
}
