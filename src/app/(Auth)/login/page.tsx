'use client'

import { useAuthContext } from '@/app/components/context'
import { redirect } from 'next/navigation'

export default function Login() {
  const [user, setUser] = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    const jsonData = JSON.stringify(data)

    const result = await (
      await fetch('http://localhost:8080/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })
    ).json()

    if (result.accessToken) {
      setUser(result.accessToken)
      console.log('result user has been set')
      return redirect('/')
    } else {
      console.log(result.error)
    }
  }

  if (!user) {
    return (
      <form
        action='http://localhost:8080/login'
        method='POST'
        onSubmit={handleSubmit}
        className='col-span-12 lg:col-span-8 self-center p-14'
      >
        <div className='relative z-0 w-full mb-12 group'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white'>
            Log in to Wreathe
          </h1>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='username'
            id='username'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='username'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Username
          </label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='password'
            name='password'
            id='password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Password
          </label>
        </div>
        <button
          type='submit'
          className='text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800'
        >
          Log In
        </button>
      </form>
    )
  } else {
    console.log(user)
    return redirect('/')
  }
}
