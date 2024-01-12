import { cookies } from 'next/headers'
import Content from './components/Content'
import Header from './components/Header'
import Link from 'next/link'
import Image from 'next/image'

export default async function Feed() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(`http://localhost:8080/feed`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  if (!result.threads || !accessToken) {
    return (
      <>
        <main className='p-2 sm:p-4 h-full'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white'>
            Please Sign In or Register for an account to view your feed.
          </h1>
          <h3>
            Don&#39;t an account?
            <Link href='/register' className='font-bold text-sky-500'>
              {' '}
              Register Here
            </Link>
          </h3>
          <h3>
            Have an account?
            <Link href='/login' className='font-bold text-sky-500'>
              {' '}
              Log In Here
            </Link>
          </h3>
          <Image
            src='/App monetization-bro.svg'
            alt='app monetization'
            width={500}
            height={500}
          />
        </main>
      </>
    )
  } else if (result.threads.length === 0 && accessToken) {
    return (
      <>
        <main className='p-2 sm:p-4 h-full'>
          <h1 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white'>
            Welcome to Wreathe.
          </h1>
          <h1 className='text-center text-lg font-bold tracking-tight text-gray-900 sm:text-xl dark:text-white'>
            You are not following any users yet. You can personalize your feed
            with content from people you choose to follow. To personalize your
            feed, start by following another user.
          </h1>
          <div className='flex justify-center'>
            <Image
              src='/App monetization-bro.svg'
              alt='app monetization'
              width={500}
              height={500}
            />
          </div>
        </main>
      </>
    )
  } else {
    return (
      <>
        <Header />
        {result.message}
        <Content feedData={result.threads} bearerToken={bearerToken} />
      </>
    )
  }
}
