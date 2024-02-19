import { cookies } from 'next/headers'
import Image from 'next/image'
import { Suspense } from 'react'
import MessageHeader from './components/Header'
import Messages from './components/Messages'
import { revalidatePath } from 'next/cache'
import Room from './components/Room'

export default async function Recepient({
  params,
}: {
  params: { recepientUsername: string }
}) {
  const cookieStore = cookies()
  const user = cookieStore.get('userData')
  const userData = JSON.parse(user?.value)
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(
    `http://localhost:8080/messages/${params.recepientUsername}`,
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'include', // Needed to include the cookie
      headers: {
        Authorization: bearerToken,
      },
    }
  )
  const result = await response.json()
  console.log(result.directMessages)

  async function sendMessage(formData: FormData) {
    'use server'
    const content = formData.get('content')
    try {
      const response = await fetch(
        `http://localhost:8080/messages/${params.recepientUsername}`,
        {
          method: 'POST',
          // mode: 'cors',
          // credentials: 'include', // NOT Needed to include the cookie WHEN IT IS SERVER COMPONENT/ACTION
          headers: {
            Authorization: bearerToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        }
      )
      // console.log(response)
      if (!response.ok) {
        console.error('FAILED TO SEND MESSAGE', response)
        throw new Error('FAILED TO SEND MESSAGE')
      }
      const result = await response.json()
      // console.log('does the SEND MESSAGE system work?! ======', result)
      return result
    } catch (error) {
      console.error('ERROR SENDING A MESSAGE:', error)
    }
    // revalidatePath('/messages/[recepientUsername]', 'page')
  }

  return (
    <div className='h-screen flex flex-col'>
      <header className='bg-gray-100 p-2 sm:p-4 text-gray-700 text-center flex-0 border-b border-gray-300 dark:border-gray-600 dark:text-white dark:bg-gray-800'>
        <Suspense fallback={'loading.....'}>
          <MessageHeader
            firstName={result.recepient.first_name}
            lastName={result.recepient.last_name}
            username={result.recepient.username}
            recepientId={result.recepient.user_uid}
          />
        </Suspense>
      </header>

      <Room
        userData={userData}
        recepientId={result.recepient.user_uid}
        directMessages={result.directMessages}
        sendMessage={sendMessage}
        bearerToken={bearerToken}
      />

      {/* <div className='flex-1 overflow-y-scroll px-4'>
        <div className='flex my-4 cursor-pointer'>
          <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
            <img
              src='https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='User Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
          <div className='flex max-w-96 bg-white rounded-lg p-3 gap-3'>
            <p className='text-gray-700'>Hey Bob, how's it going?</p>
          </div>
        </div>

        <div className='flex justify-end my-4 cursor-pointer'>
          <div className='flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
            <p>
              Hi Alice! I'm good, just finished a great book. How about you?
            </p>
          </div>
          <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
            <img
              src='https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='My Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
        </div>

        <div className='flex my-4 cursor-pointer'>
          <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
            <img
              src='https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='User Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
          <div className='flex max-w-96 bg-white rounded-lg p-3 gap-3'>
            <p className='text-gray-700'>
              That book sounds interesting! What's it about?
            </p>
          </div>
        </div>

        <div className='flex justify-end my-4 cursor-pointer'>
          <div className='flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
            <p>
              It's about an astronaut stranded on Mars, trying to survive.
              Gripping stuff!
            </p>
          </div>
          <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
            <img
              src='https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='My Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
        </div>

        <div className='flex my-4 cursor-pointer'>
          <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
            <img
              src='https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='User Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
          <div className='flex max-w-96 bg-white rounded-lg p-3 gap-3'>
            <p className='text-gray-700'>
              I'm intrigued! Maybe I'll borrow it from you when you're done?
            </p>
          </div>
        </div>

        <div className='flex justify-end my-4 cursor-pointer'>
          <div className='flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
            <p>Of course! I'll drop it off at your place tomorrow.</p>
          </div>
          <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
            <img
              src='https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='My Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
        </div>

        <div className='flex my-4 cursor-pointer'>
          <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
            <img
              src='https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='User Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
          <div className='flex max-w-96 bg-white rounded-lg p-3 gap-3'>
            <p className='text-gray-700'>Thanks, you're the best!</p>
          </div>
        </div>

        <div className='flex justify-end my-4 cursor-pointer'>
          <div className='flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
            <p>Anytime! Let me know how you like it. 😊</p>
          </div>
          <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
            <img
              src='https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='My Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
        </div>

        <div className='flex my-4 cursor-pointer'>
          <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
            <img
              src='https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='User Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
          <div className='flex max-w-96 bg-white rounded-lg p-3 gap-3'>
            <p className='text-gray-700'>So, pizza next week, right?</p>
          </div>
        </div>

        <div className='flex justify-end my-4 cursor-pointer'>
          <div className='flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
            <p>Absolutely! Can't wait for our pizza date. 🍕</p>
          </div>
          <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
            <img
              src='https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='My Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
        </div>
        <div className='flex my-4 cursor-pointer'>
          <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
            <img
              src='https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato'
              alt='User Avatar'
              className='w-8 h-8 rounded-full'
            />
          </div>
          <div className='flex max-w-96 bg-white rounded-lg p-3 gap-3'>
            <p className='text-gray-700'>Hoorayy!!</p>
          </div>
        </div>
        <Suspense fallback={'loading.....'}>
          <Messages
            userId={result.userId}
            directMessages={result.directMessages}
          />
        </Suspense>
      </div>

      <footer className='bg-gray-100 text-black border-t border-gray-300 dark:border-gray-600 px-2 pb-3 pt-2 mb-12 sm:p-4 sm:mb-0 flex-0 w-full dark:text-white dark:bg-gray-800'>
        <form action={sendMessage} className='flex items-center'>
          <input
            name='content'
            type='text'
            maxLength={1000}
            placeholder='Type a message...'
            className='w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 dark:bg-slate-700'
            required
          />
          <button
            type='submit'
            className='bg-[#9B6BFF] text-white px-4 py-2 rounded-md ml-2'
          >
            Send
          </button>
        </form>
      </footer> */}
    </div>
  )
}
