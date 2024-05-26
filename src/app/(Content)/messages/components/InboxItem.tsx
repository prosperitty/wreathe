import timeAgo from '@/app/lib/timeAgo'
import Image from 'next/image'
import Link from 'next/link'

export default function InboxItem(props) {
  const formattedDate = timeAgo(props.item.message_timestamp)
  const recepientName =
    props.item.sender.user_uid === props.userData.user_uid
      ? props.item.recepient
      : props.item.sender
  return (
    <li className="relative p-3 border-b border-gray-300 dark:border-gray-600 transition hover:bg-indigo-100 dark:hover:bg-gray-600">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="relative h-10 w-10">
          <Image
            src="/undraw_profile_pic.svg"
            className="rounded-full border border-gray-300 dark:border-gray-600"
            alt="profile picture and dropdown"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex-1">
          <Link
            href={`messages/${recepientName.username}`}
            className="flex justify-between items-center"
          >
            <div className="flex space-x-2">
              <h3 className="text-md font-semibold text-gray-900 truncate dark:text-white">
                <span>{recepientName.first_name}</span>
                <span> </span>
                <span>{recepientName.last_name}</span>
              </h3>
              <h3 className="text-md text-gray-500 truncate dark:text-gray-400">
                @{recepientName.username}
              </h3>
            </div>
            <p className="text-md text-gray-400">{formattedDate}</p>
          </Link>
          <div className="text-md italic text-gray-400">
            {props.item.content}
          </div>
        </div>
      </div>
      <Link
        href={`messages/${recepientName.username}`}
        className="absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
        scroll={false}
      ></Link>
    </li>
  )
}
