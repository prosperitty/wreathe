import { cookies } from 'next/headers'
import InboxItem from './components/InboxItem'
// import { Suspense } from 'react'

export default async function Messages() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(`http://localhost:8080/messages`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
    },
  })
  const result = await response.json()
  console.log(result.inboxList)

  return (
    <div>
      <header className='flex items-center text-3xl bg-gray-100 p-2 sm:p-4 text-gray-700 text-center flex-0 border-b border-l border-r border-gray-300 dark:border-gray-600 dark:text-white dark:bg-gray-800'>
        <h1>Inbox</h1>
      </header>

      <section className='flex flex-col pt-3 w-full border-x border-gray-300 dark:border-gray-600 bg-gray-50 h-full overflow-y-scroll dark:bg-gray-800'>
        <label className='px-3'>
          <input
            className='rounded-md p-2 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full dark:bg-gray-600'
            placeholder='Search...'
          />
        </label>

        <ul className='mt-6'>
          {result.inboxList.map((item) => (
            <InboxItem key={item.message_uid} item={item} />
          ))}
        </ul>
      </section>

      <p>this is messages route</p>
    </div>
  )
}
