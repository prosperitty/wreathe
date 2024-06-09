'use client'
import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import { useParams } from 'next/navigation'
import SenderMessage from './SenderMessage'
import RecepientMessage from './RecepientMessage'
// import { Socket, io } from 'socket.io-client'

interface Props {
  userData: UserCookie
  recepientId: string
  directMessages: Array<Message>
  sendMessage: (formData: FormData) => unknown
  bearerToken: string
}

interface SocketMessage {
  userId: string
  message: { content: string }
  type?: string
}

// let socket: Socket
let socket: WebSocket

export default function Room({
  userData,
  recepientId,
  directMessages,
  sendMessage,
  bearerToken,
}: Props) {
  const [chat, setChat] = useState<SocketMessage[]>([])
  const [pendingChat, setPendingChat] = useState('')
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState<React.JSX.Element[]>([])
  const [roomId, setRoomId] = useState('') // Room ID for private conversation
  const { recepientUsername } = useParams()

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

    const url = process.env.NEXT_PUBLIC_API_URL
    let domain =
      process.env.NODE_ENV === 'development'
        ? 'ws://' + url?.split('http://')[1]
        : 'wss://' + url?.split('https://')[1]

    socket = new WebSocket(domain)

    socket.onopen = () => {
      console.log('WebSocket connection opened')

      // Join a private room when the WebSocket connection is open
      if (userData && recepientId) {
        const orderedIds = [userData.user_uid, recepientId].sort() // Sort the IDs alphabetically
        const newRoomId = orderedIds.join('_')
        setRoomId(newRoomId)
        socket.send(
          JSON.stringify({
            type: 'join-room',
            roomId: newRoomId,
            userId: userData.user_uid,
            recepientId,
          }),
        )
      }
      scrollToBottom()
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'chat-message') {
        setChat((prevMessages) => [
          ...prevMessages,
          { userId: data.userId, message: { content: data.content } },
        ])
      } else if (data.type === 'connection-message') {
        setChat((prevMessage) => [
          ...prevMessage,
          {
            userId: data.userId,
            message: { content: data.content },
            type: data.type,
          },
        ])
      }
    }

    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    setMessages()
  }, [chat])
  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  const scrollToBottom = () => {
    const chatbox = document.getElementById('chatbox')
    chatbox?.scrollTo({
      top: chatbox?.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  const sendMessageSocket = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(roomId, message)
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: { [key: string]: string } = {}
    formData.forEach((value, key) => {
      if (value instanceof File) {
        return new Error('FORM DATA CONTAINS HAS AN INSTANCE OF A FILE')
      } else {
        data[key] = value
      }
    })
    const jsonData = JSON.stringify(data)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/${recepientUsername}`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include', // NOT Needed to include the cookie WHEN IT IS SERVER COMPONENT/ACTION
          headers: {
            Authorization: bearerToken,
            'Content-Type': 'application/json',
          },
          body: jsonData,
        },
      )
      // console.log(response)
      if (!response.ok) {
        console.error('FAILED TO SEND MESSAGE', response)
        throw new Error('FAILED TO SEND MESSAGE')
      }
      const result = await response.json()
      if (roomId && message) {
        socket.send(
          JSON.stringify({
            type: 'chat-message',
            userId: userData.user_uid,
            recepientId,
            roomId,
            content: message,
          }),
        )
        setMessage('')
      }
      console.log('does the SEND MESSAGE system work?! ======', result)
      return result
    } catch (error) {
      console.error('ERROR SENDING A MESSAGE:', error)
    } finally {
      return scrollToBottom()
    }
  }

  // const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   socket.emit('send_msg', message)
  //   setMessage('')
  //   console.log(chat)
  // }

  // const chats = chat.map((msg, key) => (
  //   <div key={key}>
  //     <h3>{msg.message}</h3>
  //   </div>
  // ))

  function setMessages() {
    const chats = chat.map((msg, key) => {
      if (msg.type === 'connection-message') {
        return (
          <div key={key}>
            <h3>{msg.message.content}</h3>
          </div>
        )
      } else if (msg.userId === userData.user_uid) {
        return <SenderMessage key={key} message={msg.message} />
      } else {
        return <RecepientMessage key={key} message={msg.message} />
      }
    })

    setMessageList(chats)
  }

  return (
    <>
      <div id="chatbox" className="flex-1 overflow-y-scroll px-4">
        <Messages directMessages={directMessages} userId={userData.user_uid} />
        {messageList}
      </div>

      <footer className="bg-gray-100 text-black border-t border-gray-300 dark:border-gray-600 px-2 pb-3 pt-2 mb-12 sm:p-4 sm:mb-0 flex-0 w-full dark:text-white dark:bg-gray-800">
        <form
          action={sendMessage}
          onSubmit={sendMessageSocket}
          className="flex items-center"
        >
          <input
            name="content"
            type="text"
            maxLength={1000}
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 dark:bg-slate-700"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#9B6BFF] text-white px-4 py-2 rounded-md ml-2"
          >
            Send
          </button>
        </form>
      </footer>
    </>
  )
}
