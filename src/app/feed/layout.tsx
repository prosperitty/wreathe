import Navigation from '../users/[Username]/components/Navigation'

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className='bg-white dark:bg-gray-900'>
      {/* take the content section out and put into feed page */}
      <Navigation />
      {children}
      {/* <div className='grid grid-cols-12 h-screen'>
        <div className='hidden relative lg:block lg:col-span-4 bg-amber-200 h-screen border-r-2 border-white'>
          <div className='relative z-0 w-ful py-10 px-5'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-red-800'>
              Your trading journey awaits. Join the world of finance.
            </h1>
          </div>
          <div className='absolute bottom-0 py-10 px-5'>
            <Image
              src='/undraw_waiting.svg' 
              alt='waiting for you illustration'
              width={200}
              height={200}
              className='w-auto'
            />
          </div>
        </div> */}
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* </div> */}
    </section>
  )
}
