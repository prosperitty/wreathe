'use client'
import Image from 'next/image'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Search from '../../messages/components/Search'
import { searchProfile } from '@/app/lib/searchUsername'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 px-2 sm:px-4 py-3 flex dark:bg-gray-900  justify-between items-center z-30">
      <Image
        src="logo.svg"
        className="rounded-full cursor-pointer p-1"
        alt="profile picture and dropdown"
        width={50}
        height={50}
        sizes=""
        onClick={scrollToTop}
      />
      <div className="flex ">
        {/* <Link href='/logout' scroll={false}>
          <ArrowLeftOnRectangleIcon
            aria-label='Logout'
            title='Logout'
            className='w-6 h-6 ml-3 cursor-pointer'
          />
        </Link> */}
        <search className="relative w-48 mr-2 hidden sm:block">
          <Search action={searchProfile} />
          {children}
        </search>
        <Link href="/compose/thread" scroll={false}>
          <button className="text-sm flex justify-evenly w-20 rounded-md px-2 py-2 duration-150 bg-white hover:bg-gray-100 text-white bg-gradient-to-br from-[#9B6BFF] to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium text-center">
            <PencilSquareIcon
              aria-label="Compose A Thread"
              title="Compose A Thread"
              className="w-6 h-6 cursor-pointer"
            />{' '}
            <span>Post</span>
          </button>
        </Link>
      </div>
    </header>
  )
}
