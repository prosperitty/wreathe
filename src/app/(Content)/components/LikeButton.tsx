'use client'
import likePost from '@/app/lib/likePost'
import unlikePost from '@/app/lib/unlikePost'
import { Transition } from '@headlessui/react'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

export default function LikeButton(props) {
  const [likes, setLikes] = useState(props.commentData.comment_likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const { Username, thread_uid } = useParams()

  useEffect(() => {
    if (props.isLiked) {
      setIsLiked(true)
    }
  }, [])

  const handleLikeButton = async () => {
    if (!isLiked) {
      try {
        const result = await likePost(
          isLiked,
          `http://localhost:8080/users/${Username}/threads/${thread_uid}/comments/${props.commentData.comment_uid}/like`
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
          `http://localhost:8080/users/${Username}/threads/${thread_uid}/comments/${props.commentData.comment_uid}/unlike`
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
    <>
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
    </>
  )
}
