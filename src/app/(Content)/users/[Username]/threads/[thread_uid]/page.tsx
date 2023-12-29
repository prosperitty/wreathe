'use server'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import CommentsSection from './components/Comments'
import { Suspense, useState } from 'react'
import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'
import { cookies } from 'next/headers'
import Post from './components/Post'
import { useParams } from 'next/navigation'
// import { Fragment, useEffect, useState } from 'react'

export default async function ThreadPage({ params }) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const API_URL = `http://localhost:8080/users/${params.Username}/threads/${params.thread_uid}`
  const response = await fetch(API_URL, {
    method: 'GET',
    mode: 'cors',
    // credentials: 'include', // Needed to include the cookie
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  const { thread } = result
  console.log('this should work from the thread page ====', thread.wreathe_user)
  // const [likes, setLikes] = useState(0)
  // const [isLiked, setIsLiked] = useState(false)
  // const params = useParams()
  // console.log(params)

  // const handleLike = () => {
  //   if (isLiked) {
  //     console.log('this post is already liked.')
  //     console.log('unliking this post.....')
  //     setLikes(likes - 1)
  //     return setIsLiked(false)
  //   }
  //   setLikes(likes + 1)
  //   setIsLiked(true)
  // }

  return (
    <Suspense fallback={<ThreadSkeleton />}>
      <Post thread={thread} />
    </Suspense>
  )
}
