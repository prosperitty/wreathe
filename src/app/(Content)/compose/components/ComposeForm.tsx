'use client'
import React, { FormEvent, useState } from 'react'

export default function ComposeForm({ postContent }) {
  // const router = useRouter()
  let [characterCount, setCharacterCount] = useState(0)

  function handleCharacterCount(e: FormEvent<HTMLTextAreaElement>) {
    let text = (e.target as HTMLTextAreaElement).value
    let count = (e.target as HTMLTextAreaElement).value.length
    setCharacterCount(count)

    if (text.trim() === '') {
      console.log('EMPTY START')
      e.target.setCustomValidity('Text cannot start with an empty space')
    } else {
      // If the condition is not met, reset custom validity and clear error message
      e.target.setCustomValidity('')
    }
  }

  return (
    <form action={postContent}>
      <div className="space-y-2 p-4 text-[15.5px] leading-relaxed text-gray-500 relative">
        <textarea
          name="content"
          minLength={1}
          maxLength={250}
          onChange={handleCharacterCount}
          className="block py-2.5 px-0 w-full h-72 max-h-[500px] border-0 border-b text-lg text-gray-900 break-all bg-transparent appearance-none dark:text-white  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none invalid:focus:caret-pink-500 invalid:focus:dark:border-pink-500 valid:focus:dark:border-green-500 valid:caret-green-500"
          required
        />

        <label
          htmlFor="content"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-1 -z-10 origin-[0] peer-focus:start-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          {"What's on your mind?"}
        </label>
      </div>
      <div className="flex items-center gap-3 p-4 border-t">
        <button
          className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
          // onClick={() => router.back()}
          type="submit"
        >
          Post
        </button>
        <div>
          <span>{characterCount}</span>
          <span>/</span>
          <span>250</span>
          {/* <span className="px-2">{pending}</span> */}
        </div>
      </div>
    </form>
  )
}
