import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function Settings({
  params,
}: {
  params: { Username: string }
}) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const response = await fetch(
    `http://localhost:8080/users/${params.Username}/settings`,
    {
      method: 'GET',
      mode: 'cors',
      //WEIRD BUG WHERE IF YOU INCLUDE CREDENTIALS, IT DOES NOT POPULATE THE QUERY OF A PRISMA QUERY: INCLUDE FIELD
      //MUST REVALIDATE TO INITIATE DYNAMIC RENDERING
      credentials: 'include', // Needed to include the cookie
      headers: {
        Authorization: bearerToken,
      },
      next: { revalidate: 0 },
    }
  )
  const result = await response.json()
  const { user } = result
  let bioValue = user.bio
  bioValue === null ? (bioValue = '') : bioValue
  console.log(result.message)

  async function saveNewCredentials(formData: FormData) {
    'use server'
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    const bearerToken = `Bearer ${accessToken?.value}`
    const firstName = formData.get('first-name')
    const lastName = formData.get('last-name')
    const username = formData.get('username')
    const password = formData.get('password')
    const email = formData.get('email')
    const bio = formData.get('bio')
    const reqHeader = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    }

    try {
      const response = await fetch(
        `http://localhost:8080/users/${params.Username}/settings`,
        {
          method: 'POST',
          headers: reqHeader,
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            bio,
            username,
          }),
        }
      )
      if (response.ok) {
        const result = await response.json()
        console.log('DOES UPDATE SETTINGS FUNCTIONALITY WORK', result)
        // return result
      }
    } catch (err) {
      console.error(err, 'FAILED TO POST COMMENT')
    }

    redirect(`http://localhost:3000/users/${params.Username}`)
  }

  return (
    <>
      <Suspense fallback={<ThreadSkeleton />}>
        <main className='p-4'>
          <form className='max-w-sm mx-auto' action={saveNewCredentials}>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type='text'
                  name='first-name'
                  id='first-name'
                  defaultValue={`${user.first_name}`}
                  placeholder='First Name'
                  minLength={1}
                  maxLength={30}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  required
                />
                <label
                  htmlFor='first-name'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  First name
                </label>
              </div>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type='text'
                  name='last-name'
                  id='last-name'
                  defaultValue={`${user.last_name}`}
                  placeholder='Last Name'
                  minLength={1}
                  maxLength={30}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  required
                />
                <label
                  htmlFor='last-name'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Last name
                </label>
              </div>
            </div>
            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                defaultValue={`${user.email}`}
                placeholder='Email'
                maxLength={100}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                required
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='username'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Username
              </label>
              <input
                type='username'
                name='username'
                id='username'
                defaultValue={`${user.username}`}
                placeholder='@'
                minLength={1}
                maxLength={50}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                required
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='new-password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                New Password
              </label>
              <input
                type='password'
                name='new-password'
                id='password'
                placeholder='New Password'
                minLength={1}
                maxLength={100}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Verify Password
              </label>
              <input
                type='password'
                name='password'
                id='repeat-password'
                placeholder='Verify Password'
                minLength={1}
                maxLength={100}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='large-input'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Bio
              </label>
              <textarea
                name='bio'
                id='large-input'
                defaultValue={`${bioValue}`}
                placeholder='Bio'
                maxLength={150}
                className='block w-full h-40 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none'
              />
            </div>
            <div className='mb-5'>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='avatar'
              >
                Upload Profile Picture
              </label>
              <input
                aria-describedby='user_avatar_help'
                id='avatar'
                name='avatar'
                type='file'
                className='block w-full h-12 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
              />
            </div>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Save
            </button>
          </form>

          <form className='max-w-sm mx-auto my-12'>
            <button
              type='submit'
              className='text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-900 dark:focus:ring-red-800'
            >
              Delete Account
            </button>
          </form>
        </main>
      </Suspense>
    </>
  )
}
