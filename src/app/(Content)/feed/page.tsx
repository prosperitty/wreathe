import { cookies } from 'next/headers'
import Content from './components/Content'
import Header from './components/Header'
import Link from 'next/link'
import Image from 'next/image'
import UserList from './components/UserList'
import { Suspense } from 'react'

export default async function Feed({
  searchParams,
}: {
  searchParams?: { query: string }
}) {
  const query = searchParams?.query ?? ''
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feed`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    },
  })
  const result: { threads: Array<ThreadData> } = await response.json()

  if (!result.threads || !accessToken) {
    return (
      <>
        <main className="p-2 sm:p-4 h-full">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Please Sign In or Register for an account to view your feed.
          </h1>
          <h3>
            Don&#39;t an account?
            <Link href="/register" className="font-bold text-sky-500">
              {' '}
              Register Here
            </Link>
          </h3>
          <h3>
            Have an account?
            <Link href="/login" className="font-bold text-sky-500">
              {' '}
              Log In Here
            </Link>
          </h3>
          <Image
            src="/App monetization-bro.svg"
            alt="app monetization"
            width={500}
            height={500}
          />
        </main>
      </>
    )
  } else if (result.threads.length === 0 && accessToken) {
    return (
      <>
        <Header>
          <div className="relative w-full rounded-md">
            <Suspense
              key={query}
              fallback={
                <div className="absolute w-full flex p-2 animate-pulse rounded-md bg-gray-900 border border-gray-600">
                  <svg
                    className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div className="space-y-2 self-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                  </div>
                </div>
              }
            >
              <UserList query={query} />
            </Suspense>
          </div>
        </Header>
        <main className="p-2 sm:p-4 h-full">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Welcome to Wreathe.
          </h1>
          <h1 className="text-center text-lg font-bold tracking-tight text-gray-900 sm:text-xl dark:text-white">
            You are not following any users yet. You can personalize your feed
            with content from people you choose to follow. To personalize your
            feed, start by following another user.
          </h1>
          <div className="flex justify-center">
            <Image
              src="/App monetization-bro.svg"
              alt="app monetization"
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
        <Header>
          <div className="relative w-full rounded-md">
            <Suspense
              key={query}
              fallback={
                <div className="absolute w-full flex p-2 animate-pulse rounded-md bg-gray-900 border border-gray-600">
                  <svg
                    className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div className="space-y-2 self-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                  </div>
                </div>
              }
            >
              <UserList query={query} />
            </Suspense>
          </div>
        </Header>

        <Content feedData={result.threads} bearerToken={bearerToken} />
      </>
    )
  }
}
