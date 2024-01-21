'use client'
import { useAuthContext } from '@/app/components/context'
import followUser from '@/app/lib/followUser'
import unFollowUser from '@/app/lib/unfollowUser'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { JsxElement } from 'typescript'

interface Props {
  username: string
  firstName: string
  lastName: string
  following: Array<any>
  followers: Array<any>
  posts: number
  bio: string
  isFollowing: boolean
}

export default function Header(props: Props) {
  const { userData } = useAuthContext()
  const { Username } = useParams()
  const [followEditBtn, setFollowEditBtn] = useState<JsxElement>()
  const [isFollowing] = useState(props.isFollowing)

  useEffect(() => {
    if (userData) {
      if (userData.user_uid === Username) {
        return setFollowEditBtn(renderEditButton)
      } else if (userData.user_uid !== Username) {
        return setFollowEditBtn(dynamicFollowButton)
      }
    }
  }, [userData])

  async function follow() {
    try {
      const response = await followUser(Username)
      const result = response.json()
      console.log(result, response)
    } catch (error) {
      console.error(error)
    }
  }

  async function unfollow() {
    try {
      const response = await unFollowUser(Username)
      const result = response.json()
      console.log(result, response)
    } catch (error) {
      console.error(error)
    }
  }

  function renderEditButton() {
    return (
      <Link href={`${Username}/settings`}>
        <button
          type='button'
          className='text-white bg-gradient-to-br from-[#9B6BFF] to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4'
        >
          Edit Profile
        </button>
      </Link>
    )
  }

  function dynamicFollowButton() {
    if (!isFollowing) {
      return (
        <button
          onClick={follow}
          type='button'
          className='text-white bg-gradient-to-br from-[#9B6BFF] to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4'
        >
          Follow
        </button>
      )
    } else if (isFollowing) {
      return (
        <button
          onClick={unfollow}
          type='button'
          className='text-white bg-gradient-to-br from-[#9B6BFF] to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4'
        >
          Unfollow
        </button>
      )
    }
  }

  return (
    <header className='px-2 sm:px-4'>
      <h2 className='text-center  py-4 sm:py-6'>
        <Suspense fallback={'loading....'}>
          <span> @{props.username}</span>
        </Suspense>
      </h2>
      <div className='my-4 flex items-center justify-center'>
        <div className='relative h-20 w-20'>
          <Image
            src='/undraw_profile_pic.svg'
            className='rounded-full border-2 border-white'
            alt='profile picture and dropdown'
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
      <div className='py-2 font-medium text-center dark:text-white '>
        <h3 className='space-x-1'>
          <Suspense fallback={'loading.....'}>
            <span>{props.firstName}</span>
            <span>{props.lastName}</span>
          </Suspense>
        </h3>
        <h5 className='text-sm text-gray-500 dark:text-gray-400'>
          <Suspense fallback={'loading....'}>
            <span>@{props.username}</span>
          </Suspense>
        </h5>
      </div>
      <div className='text-center'>
        {followEditBtn}
        {/* <button
          onClick={follow}
          type='button'
          className='text-white bg-gradient-to-br from-[#9B6BFF] to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4'
        >
          Follow
        </button> */}
      </div>
      <div className='py-2 font-sm text-center dark:text-white '>
        <h3>
          <Suspense fallback={'loading.....'}>
            <span>{props.bio}</span>
          </Suspense>
        </h3>
      </div>
      <div className='flex flex-row flex-wrap text-center py-2 my-4'>
        <div className='basis-1/3 leading-5'>
          <h4 className='text-gray-200 text-sm'>Posts</h4>
          <h2 className='py-2 text-xl font-semibold'>
            <Suspense fallback={'--'}>{props.posts}</Suspense>
          </h2>
        </div>
        <div className='basis-1/3 leading-5'>
          <Link href={`${Username}/followers`}>
            <h4 className='text-gray-200 text-sm'>Followers</h4>
            <h2 className='py-2 text-xl font-semibold'>
              <Suspense fallback={'--'}>{props.followers.length}</Suspense>
            </h2>
          </Link>
        </div>
        <div className='basis-1/3 leading-5'>
          <Link href={`${Username}/following`}>
            <h4 className='text-gray-200 text-sm'>Following</h4>
            <h2 className='py-2 text-xl font-semibold'>
              <Suspense fallback={'--'}>{props.following.length}</Suspense>
            </h2>
          </Link>
        </div>
      </div>
    </header>
  )
}
