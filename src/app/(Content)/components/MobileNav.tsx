import {
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function MobileNav() {
  return (
    <nav className='bg-white fixed bottom-0 w-full border-t border-gray-200 flex transition-transform translate-y-0 sm:translate-y-full dark:bg-gray-800 dark:border-gray-600 z-30'>
      <Link
        href='/feed'
        className='flex flex-grow items-center justify-center p-2 text-indigo-500 hover:text-indigo-500'
      >
        <div className='text-center'>
          <span className='flex justify-center h-8 text-3xl leading-8'>
            <HomeIcon className='h-6 w-6 mx-1 stroke-orange-400' />
          </span>
          <span className='block text-xs leading-none'>Home</span>
        </div>
      </Link>
      {/* <a
        href='#'
        className='flex flex-grow items-center justify-center p-2 text-indigo-500 hover:text-indigo-500'
      >
        <div className='text-center'>
          <span className='flex justify-center h-8 text-3xl leading-8'>
            <HomeIcon className='h-6 w-6 mx-1 stroke-orange-400' />
          </span>
          <span className='block text-xs leading-none'>Home</span>
        </div>
      </a> */}
      <Link
        href='/feed'
        className='flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-indigo-500 dark:text-white'
      >
        <div className='text-center'>
          <span className='flex justify-center h-8 text-3xl leading-8'>
            <MagnifyingGlassIcon className='h-6 w-6 mx-1 stroke-orange-400' />
          </span>
          <span className='block text-xs leading-none'>Search</span>
        </div>
      </Link>
      <Link
        href='users/1'
        className='flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-indigo-500 dark:text-white'
      >
        <div className='text-center'>
          <span className='flex justify-center h-8 text-3xl leading-8'>
            <EnvelopeIcon className='h-6 w-6 mx-1 stroke-orange-400' />
          </span>
          <span className='block text-xs leading-none'>Inbox</span>
        </div>
      </Link>
      <Link
        href='users/1'
        className='flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-indigo-500 dark:text-white'
      >
        <div className='text-center'>
          <span className='flex justify-center h-8 text-3xl leading-8'>
            <UserCircleIcon className='h-6 w-6 mx-1 stroke-orange-400' />
          </span>
          <span className='block text-xs leading-none'>Profile</span>
        </div>
      </Link>
    </nav>
  )
}
