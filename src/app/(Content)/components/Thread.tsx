'use client'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { useAuthContext } from '@/app/components/context'
import likePost from '@/app/lib/likePost'
import unlikePost from '@/app/lib/unlikePost'
import timeAgo from '@/app/lib/timeAgo'

interface Props {
  thread: thread
  isLiked: boolean
}

interface thread {
  thread_uid: string
  content: string
  ispublished: boolean
  thread_timestamp: string
  author_ref: string
  wreathe_user: PostUser
  comment: Array<Comment>
  likes: Array<Likes>
}

interface PostUser {
  user_uid: string
  first_name: string
  last_name: string
  username: string
}

interface Comment {
  comment_uid: string
  content: string
  ispublished: boolean
  comment_timestamp: string
  thread_ref: string
  author_ref: string
}

interface Likes {
  user_uid: string
  thread_uid: string
}

export default function Thread(props: Props) {
  const [likes, setLikes] = useState(props.thread.likes.length)
  const [date, setDate] = useState('')
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (props.isLiked) {
      setIsLiked(true)
    }
    const formattedDate = timeAgo(props.thread.thread_timestamp)
    setDate(formattedDate)
  }, [])

  const handleLikeButton = async () => {
    if (!isLiked) {
      try {
        const result = await likePost(
          isLiked,
          `http://localhost:8080/users/${props.thread.wreathe_user.user_uid}/threads/${props.thread.thread_uid}/likes`
        )
        console.log(result)
      } catch (error) {
        console.error('FAILED TO LIKE POST', error)
      } finally {
        setLikes(likes + 1)
        setIsLiked(true)
      }
    } else if (isLiked) {
      try {
        const result = await unlikePost(
          isLiked,
          `http://localhost:8080/users/${props.thread.wreathe_user.user_uid}/threads/${props.thread.thread_uid}/unlike`
        )
        console.log(result)
      } catch (error) {
        console.error('FAILED TO UNLIKE POST', error)
      } finally {
        setLikes(likes - 1)
        setIsLiked(false)
      }
    }
  }

  return (
    <li className='relative border-gray-600 border rounded-md p-3 my-3 over:bg-gray-100 dark:hover:bg-white/[0.12]'>
      <div className='flex items-center space-x-4'>
        <div className='relative h-12 w-12 z-20'>
          <Link
            href={`/users/${props.thread.wreathe_user.user_uid}`}
            scroll={false}
          >
            <Image
              src='/next.svg'
              className='rounded-full border border-gray-500'
              alt='profile picture'
              layout='fill'
              objectFit='contain'
              // width={35}
              // height={35}
            />
          </Link>
        </div>
        <div className='relative font-medium dark:text-white z-20'>
          <Link
            href={`/users/${props.thread.wreathe_user.user_uid}`}
            scroll={false}
          >
            <div>
              <span>{props.thread.wreathe_user.first_name}</span>
              <span> </span>
              <span>{props.thread.wreathe_user.last_name}</span>
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              <span>@</span>
              <span>{props.thread.wreathe_user.username}</span>
            </div>
          </Link>
        </div>
      </div>
      <h3 className='relative py-4 text-sm font-medium leading-5 text-black dark:text-white'>
        {props.thread.content}
      </h3>

      <ul className='relative pt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 z-20'>
        {/* <li>{props.thread.thread_timestamp}</li> */}
        <li>{date}</li>
        <li>&middot;</li>
        <li className='cursor-pointer hover:text-yellow-400'>
          <Link
            href={`/compose/comment/${props.thread.thread_uid}`}
            scroll={false}
          >
            {props.thread.comment.length} comments
          </Link>
        </li>
        <li>&middot;</li>
        <li className='cursor-pointer hover:text-yellow-400 flex items-center'>
          <span className='mr-1'>{likes} </span>
          <span>likes</span>
        </li>
        <li className='hover:text-yellow-400'>
          <div className='absolute right-0 flex items-center'>
            <button
              onClick={handleLikeButton}
              className='w-4 h-4 flex overflow-hidden relative'
            >
              <Transition
                as={Fragment}
                show={isLiked}
                enter='transition-opacity duration-200 ease-in-out'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-100 ease-in-out'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <HeartIconSolid className='text-yellow-400 absolute' />
              </Transition>
              <Transition
                as={Fragment}
                show={!isLiked}
                enter='transition-opacity duration-200 ease-linear'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-100 ease-linear'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <HeartIconOutline className='absolute' />
              </Transition>
            </button>
          </div>
        </li>
      </ul>

      <Link
        href={`/users/${props.thread.wreathe_user.user_uid}/threads/${props.thread.thread_uid}`}
        className='absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
        scroll={false}
      />
    </li>
  )
}
