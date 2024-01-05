'use client'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import { useAuthContext } from '@/app/components/context'

export default function Dropdown() {
  const { userData, isLoading } = useAuthContext()

  if (userData && !isLoading) {
    return (
      <Menu
        as='div'
        className='p-2 text-left rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
      >
        <Menu.Button as='div' className='flex items-center space-x-4'>
          {/* <Image
            id='avatarButton'
            data-dropdown-toggle='userDropdown'
            data-dropdown-placement='bottom-start'
            className='w-10 h-10 rounded-full cursor-pointer'
            src='/logo.svg'
            alt='User dropdown'
            width={0}
            height={0}
            sizes='100vw'
          /> */}
          <Image
            src='/undraw_profile_pic.svg'
            className='rounded-full'
            alt='profile picture and dropdown'
            width={35}
            height={35}
            sizes=''
          />
          <div className='font-medium dark:text-white'>
            <div className='space-x-1'>
              <span>{userData.first_name}</span>
              <span>{userData.last_name}</span>
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              <span>@{userData.username}</span>
            </div>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          // enter='transition ease-out duration-100'
          enter='transform ease-out duration-400 sm:duration-400 transition'
          // enterFrom='transform opacity-0 scale-95'
          enterFrom='-translate-y-3/4 opacity-0'
          // enterTo='transform opacity-100 scale-100'
          enterTo='-translate-y-full opacity-100 '
          // leave='transition ease-in duration-75'
          leave='transition ease-out duration-100'
          // leaveFrom='transform opacity-100 scale-100'
          leaveFrom='-translate-y-full opacity-100'
          // leaveTo='transform opacity-0 scale-95'
          leaveTo='-translate-y-3/4 opacity-0'
        >
          <Menu.Items className='absolute -top-2 -translate-y-full mb-2 w-56 origin-top-right border border-gray-600 divide-y divide-gray-600 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active
                      ? 'bg-violet-500 text-white'
                      : 'text-gray-900 dark:text-white'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  href='/logout'
                >
                  Logout
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active
                      ? 'bg-violet-500 text-white'
                      : 'text-gray-900 dark:text-white'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  href={`/users/${userData.user_uid}/settings`}
                >
                  Settings
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }
}
