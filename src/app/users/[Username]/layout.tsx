import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-white dark:bg-gray-900 pb-16 sm:pb-0'>
      <MobileNav />
      <Sidebar />
      <div className='p-2 sm:p-4 sm:ml-64'>{children}</div>
    </div>
  )
}
