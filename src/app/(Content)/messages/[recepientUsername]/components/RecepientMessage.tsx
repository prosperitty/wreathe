import Image from 'next/image'

export default function RecepientMessage({ message }) {
  return (
    <div className="flex my-4">
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
        <Image
          src="/undraw_profile_pic.svg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
          width={16}
          height={16}
        />
      </div>
      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
        <p className="text-gray-700">{message.content}</p>
      </div>
    </div>
  )
}
