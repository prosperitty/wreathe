import Image from 'next/image'
import SenderMessage from './SenderMessage'
import RecepientMessage from './RecepientMessage'

interface Props {
  directMessages: Array<Message>
  userId: string
}

export default function Messages(props: Props) {
  const recepientMessages = props.directMessages.map((message, index) => {
    if (message.sender_ref === props.userId) {
      return (
        <SenderMessage key={message.message_uid} message={message} />
        // <div key={message.message_uid} className='flex justify-end my-4'>
        //   <div className='flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3'>
        //     <p>{message.content}</p>
        //   </div>
        //   <div className='w-9 h-9 rounded-full flex items-center justify-center ml-2'>
        //     <Image
        //       src='/undraw_profile_pic.svg'
        //       alt='My Avatar'
        //       className='w-8 h-8 rounded-full'
        //       width={16}
        //       height={16}
        //     />
        //   </div>
        // </div>
      )
    } else {
      return (
        <RecepientMessage key={message.message_uid} message={message} />
        // <div key={message.message_uid} className='flex my-4'>
        //   <div className='w-9 h-9 rounded-full flex items-center justify-center mr-2'>
        //     <Image
        //       src='/undraw_profile_pic.svg'
        //       alt='User Avatar'
        //       className='w-8 h-8 rounded-full'
        //       width={16}
        //       height={16}
        //     />
        //   </div>
        //   <div className='flex max-w-96 bg-white rounded-lg p-3 gap-3'>
        //     <p className='text-gray-700'>{message.content}</p>
        //   </div>
        // </div>
      )
    }
  })

  return <>{recepientMessages}</>
}
