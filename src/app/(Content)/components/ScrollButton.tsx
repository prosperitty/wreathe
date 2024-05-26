import { ArrowUpIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const isScrollingDown = scrollY > 100 // Adjust the scroll threshold as needed
      setIsVisible(isScrollingDown)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 sm:bottom-4 right-4 p-3 sm:p-4 bg-blue-500 text-white rounded-full transition-all ${
        isVisible ? 'opacity-100 z-30' : 'opacity-0 -z-10'
      }`}
    >
      <ArrowUpIcon className="w-4 h-4 sm:w-7 sm:h-7" />
    </button>
  )
}

export default ScrollToTopButton
