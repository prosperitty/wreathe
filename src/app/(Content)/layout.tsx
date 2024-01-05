import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'
import React from 'react'

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className='bg-white dark:bg-gray-900 pb-16 sm:pb-0'>
      <Sidebar />
      <div className='sm:ml-64 h-full min-h-screen'>
        <div className='max-w-2xl mx-auto'>{children}</div>
      </div>
      <MobileNav />
    </div>
  )
}
