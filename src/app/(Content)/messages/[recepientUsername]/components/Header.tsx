import Image from 'next/image'
import Link from 'next/link'

interface Props {
  firstName: string
  lastName: string
  username: string
  recepientId: string
}

export default function MessageHeader(props: Props) {
  return (
    <>
      <div className="flex items-center justify-center">
        <Link href={`/users/${props.recepientId}`} scroll={false}>
          <div className="relative h-10 w-10">
            <Image
              src="/undraw_profile_pic.svg"
              className="rounded-full border-2 border-white"
              alt="profile picture and dropdown"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
      </div>

      <div className="pt-2 font-medium text-sm text-center dark:text-white ">
        <h1 className="space-x-1">
          <Link href={`/users/${props.recepientId}`} scroll={false}>
            <span>{props.firstName}</span>
            <span>{props.lastName}</span>
          </Link>
        </h1>
        <h5 className="text-sm text-gray-500 dark:text-gray-400">
          <Link href={`/users/${props.recepientId}`} scroll={false}>
            <span>@{props.username}</span>
          </Link>
        </h5>
      </div>
    </>
  )
}
