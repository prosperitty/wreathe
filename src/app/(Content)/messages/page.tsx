import { cookies } from 'next/headers'
import InboxItem from './components/InboxItem'
import { Suspense } from 'react'
import Search from './components/Search'
import SearchList from './components/SearchList'
import searchUsername from '@/app/lib/searchUsername'

interface APIResponse {
  success: boolean
  message: string
  inbox: Array<Message>
  inboxList: Array<Message>
}

export default async function Messages({
  searchParams,
}: {
  searchParams?: { query: string }
}) {
  const query = searchParams?.query ?? ''
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const user = cookieStore.get('userData')
  const userData = user ? JSON.parse(user.value) : undefined
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // Needed to include the cookie
    headers: {
      Authorization: bearerToken,
    },
  })
  const result: APIResponse = await response.json()
  // console.log(result.inboxList)
  // console.log(await fetchSearchedUsers(query))

  return (
    <div className="h-screen flex flex-col">
      <header className="flex flex-col bg-gray-100 p-3 text-gray-700 flex-0 border-b border-l border-r border-gray-300 dark:border-gray-600 dark:text-white dark:bg-gray-800">
        <h1 className="text-center text-2xl font-bold pb-3">Inbox</h1>
        <search className="relative">
          <Search action={searchUsername} />
          <Suspense fallback={'loading.....'}>
            <SearchList query={query} />
          </Suspense>
        </search>
      </header>

      <section className="flex-0 sm:overflow-y-hidden sm:hover:overflow-y-scroll w-full border-x border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
        <ul>
          {result.inbox.map((item) => (
            <InboxItem key={item.message_uid} item={item} userData={userData} />
          ))}
        </ul>
      </section>
    </div>
  )
}
