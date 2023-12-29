import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { userAgent } from 'next/server'

interface Props {
  thread_uid: string
  content: string
  thread_timestamp: string
  commentCount: number
  shareCount: number
  user: PostUser
}

interface PostUser {
  first_name: string
  last_name: string
  username: string
}

export default function Thread(props: Props) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      console.log('this post is already liked.')
      console.log('unliking this post.....')
      setLikes(likes - 1)
      return setIsLiked(false)
    }
    setLikes(likes + 1)
    setIsLiked(true)
  }

  return (
    <li className='relative border-gray-600 border rounded-md p-3 my-3 over:bg-gray-100 dark:hover:bg-white/[0.12]'>
      <div className='flex items-center space-x-4'>
        <div className='relative h-12 w-12 z-20'>
          <Link
            href={`e62092f1-a8ee-45de-ba19-3b28c7d1d221/threads/${props.thread_uid}`}
            scroll={false}
          >
            <Image
              src='/next.svg'
              className='rounded-full border border-white'
              alt='profile picture'
              layout='fill'
              objectFit='contain'
              // width={35}
              // height={35}
            />
          </Link>
        </div>
        <div className='relative font-medium dark:text-white z-20'>
          <Link href='2' scroll={false}>
            <div>
              <span>{props.user.first_name}</span>
              <span> </span>
              <span>{props.user.last_name}</span>
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              <span>@</span>
              <span>{props.user.username}</span>
            </div>
          </Link>
        </div>
      </div>
      <h3 className='relative py-4 text-sm font-medium leading-5 text-black dark:text-white'>
        {props.content}
      </h3>

      <ul className='relative pt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 z-20'>
        <li>{props.thread_timestamp}</li>
        <li>&middot;</li>
        <li className='cursor-pointer hover:text-white'>
          <Link href={`compose/comment/${props.thread_uid}`} scroll={false}>
            {props.commentCount} comments
          </Link>
        </li>
        <li>&middot;</li>
        <li className='cursor-pointer hover:text-white flex items-center'>
          <span className='mr-1'>{likes} </span>
          <span>likes</span>
        </li>
        <li className='hover:text-white'>
          <div className='absolute right-0 flex items-center'>
            <button
              onClick={handleLike}
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
                <HeartIconSolid className='text-yellow-300 absolute' />
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
        href={`users/e62092f1-a8ee-45de-ba19-3b28c7d1d221/threads/${props.thread_uid}`}
        className='absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
        scroll={false}
      />
    </li>
  )
}
