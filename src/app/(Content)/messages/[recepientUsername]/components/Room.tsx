'use client'
import { useAuthContext } from '@/app/components/context'
import React, { useEffect, useState } from 'react'
// import { Socket, io } from 'socket.io-client'

interface SocketMessage {
  userId: string
  message: string
}

// let socket: Socket
let socket: WebSocket

export default function Room({ userData }) {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<SocketMessage[]>([])
  const [roomId, setRoomId] = useState('') // Room ID for private conversation

  useEffect(() => {
    // socket = io('http://localhost:8080')
    // socket.on('receive_msg', (data: string) => {
    //   console.log(data, 'FROM SERVER ==================')
    //   setChat((pre) => [...pre, data])
    // })
    // // Clean up the socket connection on component unmount
    // return () => {
    //   socket.disconnect()
    // }

    socket = new WebSocket('ws://localhost:8080')

    socket.onopen = () => {
      console.log('WebSocket connection opened')

      // Join a private room when the WebSocket connection is open
      if (userData) {
        socket.send(
          JSON.stringify({
            type: 'join-room',
            roomId,
            userId: userData.user_uid,
          })
        )
      }
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'chat-message') {
        console.log(data.content)

        setChat((prevMessages) => [
          ...prevMessages,
          { userId: data.userId, message: data.content },
        ])
      }
    }

    if (userData) {
      console.log(userData)
      console.log('starting with userdata....')
      startPrivateChat()
      console.log('ending with userdata....')
    }

    return () => {
      socket.close()
    }
  }, [])

  const startPrivateChat = () => {
    // Simulate creating a unique private room ID
    const newRoomId = `private-room-${userData.user_uid}-${Date.now()}`
    setRoomId(newRoomId)
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(roomId, message)
    e.preventDefault()
    if (roomId && message) {
      socket.send(
        JSON.stringify({
          type: 'chat-message',
          userId: userData.userUid,
          roomId,
          content: message,
        })
      )
      setMessage('')
    }
  }

  // const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   socket.emit('send_msg', message)
  //   setMessage('')
  //   console.log(chat)
  // }

  const chats = chat.map((msg, key) => (
    <div key={key}>
      <h3>{msg.message}</h3>
    </div>
  ))

  return (
    <>
      <div className='flex-1 overflow-y-scroll px-4'>{chats}</div>

      <footer className='bg-gray-100 text-black border-t border-gray-300 dark:border-gray-600 px-2 pb-3 pt-2 mb-12 sm:p-4 sm:mb-0 flex-0 w-full dark:text-white dark:bg-gray-800'>
        <form onSubmit={sendMessage} className='flex items-center'>
          <input
            name='content'
            type='text'
            maxLength={1000}
            placeholder='Type a message...'
            className='w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 dark:bg-slate-700'
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
