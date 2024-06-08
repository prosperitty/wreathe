'use client'
import { Suspense, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import Thread from '../../../components/Thread'
import ScrollToTopButton from '../../../components/ScrollButton'
import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'
import Comment from '@/app/(Content)/components/Comment'
import LikeButton from '@/app/(Content)/components/LikeButton'
import { callRefreshToken } from '@/app/lib/callRefreshToken'

interface Props {
  profileThreads: Array<ThreadData>
  profileComments: Array<CommentData>
  profileLikes: any
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs(props: Props) {
  const [userData, setUserData] = useState<UserData | null>(null)
  let [categories] = useState({
    Threads: [...props.profileThreads],
    Comments: [...props.profileComments],
    Likes: [...props.profileLikes],
  })

  useEffect(() => {
    ;(async () => {
      const data = await callRefreshToken()
      setUserData(data)
    })()
  }, [])

  const setProfileFeed = () => {
    let profileFeed = []
    if (userData) {
      profileFeed = categories.Threads.map((post) => {
        const isLiked = post.likes.some(
          (like) =>
            like.user_uid === userData.user_uid &&
            like.thread_uid === post.thread_uid,
        )
        return <Thread key={post.thread_uid} isLiked={isLiked} thread={post} />
      })
    } else {
      profileFeed = categories.Threads.map((post) => {
        return <Thread key={post.thread_uid} isLiked={false} thread={post} />
      })
    }
    return profileFeed
  }

  const setCommentFeed = () => {
    let commentFeed = []
    if (userData) {
      commentFeed = props.profileComments.map((post) => {
        const isLiked = post.comment_likes.some(
          (like) =>
            like.user_uid === userData.user_uid &&
            like.comment_uid === post.comment_uid,
        )
        return (
          <li key={post.comment_uid}>
            <Comment
              commentData={post}
              threadAuthor={post.thread.wreathe_user.username}
              likeButton={<LikeButton isLiked={isLiked} commentData={post} />}
            />
          </li>
        )
      })
    } else {
      commentFeed = props.profileComments.map((post) => {
        return (
          <li key={post.comment_uid}>
            <Comment
              commentData={post}
              threadAuthor={post.thread.wreathe_user.username}
              likeButton={<LikeButton isLiked={false} commentData={post} />}
            />
          </li>
        )
      })
    }
    return commentFeed
  }

  const setLikeFeed = () => {
    let likeFeed: JSX.Element[] = []
    if (userData) {
      likeFeed = props.profileLikes.map((post: Likes & CommentLikes) => {
        if (post.thread_uid) {
          const isLiked = post.thread.likes.some(
            (like: Likes) =>
              like.user_uid === userData.user_uid &&
              like.thread_uid === post.thread.thread_uid,
          )
          return (
            <Thread
              key={post.thread.thread_uid}
              isLiked={isLiked}
              thread={post.thread}
            />
          )
        } else if (post.comment_uid) {
          const isLiked = post.comment.comment_likes.some(
            (like) =>
              like.user_uid === userData.user_uid &&
              like.comment_uid === post.comment.comment_uid,
          )
          return (
            <Comment
              key={post.comment.comment_uid}
              commentData={post.comment}
              threadAuthor={post.comment.thread.wreathe_user.username}
              likeButton={
                <LikeButton isLiked={isLiked} commentData={post.comment} />
              }
            />
          )
        }
      })
    } else {
      likeFeed = props.profileLikes.map((post: Likes & CommentLikes) => {
        if (post.thread_uid) {
          return (
            <Thread
              key={post.thread.thread_uid}
              isLiked={false}
              thread={post.thread}
            />
          )
        } else if (post.comment_uid) {
          return (
            <Comment
              key={post.comment.comment_uid}
              commentData={post.comment}
              threadAuthor={post.comment.thread.wreathe_user.username}
              likeButton={
                <LikeButton isLiked={false} commentData={post.comment} />
              }
            />
          )
        }
      })
    }
    return likeFeed
  }

  return (
    <main className="w-full px-2 sm:px-4">
      <ScrollToTopButton />
      <Tab.Group>
        <Tab.List className="flex rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 dark:text-white',
                  'ring-white/60 ring-offset-2 ring-offset-[#9B6BFF] focus:outline-none focus:ring-0',
                  selected
                    ? 'bg-[#9B6BFF] shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-0',
            )}
          >
            <ul className="overflow-y-auto">
              <Suspense
                fallback={
                  <>
                    <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
                  </>
                }
              >
                {setProfileFeed()}
              </Suspense>
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-0',
            )}
          >
            <ul className="overflow-y-auto space-y-3">
              <Suspense
                fallback={
                  <>
                    <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
                  </>
                }
              >
                {setCommentFeed()}
              </Suspense>
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-0',
            )}
          >
            <ul className="overflow-y-auto space-y-3">
              <Suspense
                fallback={
                  <>
                    <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
                  </>
                }
              >
                {setLikeFeed()}
              </Suspense>
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  )
}
