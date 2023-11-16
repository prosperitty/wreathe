import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-white dark:bg-gray-900 pb-16 sm:pb-0'>
      <Sidebar />
      <div className='px-2 sm:px-4 sm:ml-64'>
        <div className='max-w-2xl mx-auto'>{children}</div>
      </div>
      <MobileNav />
    </div>
  )
}
