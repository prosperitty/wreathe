import Image from 'next/image'

export default function SenderMessage({ message }) {
  return (
    <div className="flex justify-end my-4">
      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
        <p>{message.content}</p>
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <Image
          src="/undraw_profile_pic.svg"
          alt="My Avatar"
          className="w-8 h-8 rounded-full"
          width={16}
          height={16}
        />
      </div>
    </div>
  )
}
