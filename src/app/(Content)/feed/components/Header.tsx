'use client'
import Image from 'next/image'
import {
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Header() {
  return (
    <header className='sticky top-0 px-2 sm:px-4 py-3 flex dark:bg-gray-900  justify-between items-center z-30'>
      <Image
        src='logo.svg'
        className='rounded-full cursor-pointer'
        alt='profile picture and dropdown'
        width={35}
        height={35}
        sizes=''
        onClick={scrollToTop}
      />
      <div className='flex '>
        <Link href='/logout'>
          <ArrowLeftOnRectangleIcon
            aria-label='Logout'
            title='Logout'
            className='w-6 h-6 ml-3 cursor-pointer'
          />
        </Link>
        <Link href='/feed'>
          <MagnifyingGlassIcon
            aria-label='Search'
            title='Search'
            className='w-6 h-6 ml-3 cursor-pointer'
          />
        </Link>
        <Link href='/feed'>
          <PencilSquareIcon
            aria-label='Compose A Thread'
            title='Compose A Thread'
            className='w-6 h-6 ml-3 cursor-pointer'
          />
        </Link>
      </div>
    </header>
  )
}
