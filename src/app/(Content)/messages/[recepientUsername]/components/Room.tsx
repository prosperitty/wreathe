'use client'
import React, { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

let socket: Socket

export default function Room() {
  const [currentMsg, setCurrentMsg] = useState('')
  const [chat, setChat] = useState<string[]>([])

  useEffect(() => {
    socket = io('http://localhost:8080')

    socket.on('receive_msg', (data: string) => {
      console.log(data, 'FROM SERVER ==================')
      setChat((pre) => [...pre, data])
    })

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('send_msg', currentMsg)
    setCurrentMsg('')
    console.log(chat)
  }

  const chats = chat.map((msg, key) => (
    <div key={key}>
      <h3>{msg}</h3>
    </div>
  ))

  return (
    <>
      <div className='flex-1 overflow-y-scroll px-4'>{chats}</div>

      <footer className='bg-gray-100 text-black border-t border-gray-300 dark:border-gray-600 px-2 pb-3 pt-2 mb-12 sm:p-4 sm:mb-0 flex-0 w-full dark:text-white dark:bg-gray-800'>
        <form onSubmit={sendData} className='flex items-center'>
          <input
            name='content'
            type='text'
            maxLength={1000}
            placeholder='Type a message...'
            className='w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 dark:bg-slate-700'
            required
            value={currentMsg}
            onChange={(e) => setCurrentMsg(e.target.value)}
          />
          <button
            type='submit'
            className='bg-[#9B6BFF] text-white px-4 py-2 rounded-md ml-2'
          >
            Send
          </button>
        </form>
      </footer>
    </>
  )
}
