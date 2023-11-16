'use client'
import Image from 'next/image'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Header() {
  return (
    <header className='sticky top-0 py-2 flex border-gray-600 dark:bg-gray-900 justify-center items-center z-30'>
      <Image
        src='logo.svg'
        className='rounded-full cursor-pointer'
        alt='profile picture and dropdown'
        width={35}
        height={35}
        sizes=''
        onClick={scrollToTop}
      />
      {/* <h2 className='text-center py-2'>wreathe</h2> */}
    </header>
  )
}
