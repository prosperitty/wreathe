'use client'

import { useState } from 'react'

export default function SidebarButton() {
  const [isToggled, setIsToggled] = useState(false)
  function toggleSidebar() {
    const sideBar = document.querySelector('#logo-sidebar')
    if (isToggled) {
      //THIS WILL PROBABLY CAUSE A BUG DURING PRODUCTION
      sideBar?.classList.toggle('-translate-x-full')
      // sideBar.style.transform = 'translateX(-100%)'
    } else {
      sideBar?.classList.toggle('-translate-x-full')
      // sideBar.style.transform = 'translateX(0px)'
    }
    setIsToggled((prev) => {
      if (prev === false) {
        return true
      } else {
        return false
      }
    })
  }

  return (
    <button
      data-drawer-target='default-sidebar'
      data-drawer-toggle='default-sidebar'
      aria-controls='default-sidebar'
      type='button'
      className='absolute inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
    >
      <span className='sr-only'>Open sidebar</span>
      <svg
        className='w-6 h-6'
        aria-hidden='true'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          clip-rule='evenodd'
          fill-rule='evenodd'
          d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
        ></path>
      </svg>
    </button>
  )
}

{
  /* <button
          data-drawer-target='logo-sidebar'
          data-drawer-toggle='logo-sidebar'
          aria-controls='logo-sidebar'
          type='button'
          className='inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          onClick={handleClick}
        >
          <span className='sr-only'>Open sidebar</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clip-rule='evenodd'
              fill-rule='evenodd'
              d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
            ></path>
          </svg>
        </button> */
}
