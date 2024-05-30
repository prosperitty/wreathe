import Image from 'next/image'
import Link from 'next/link'

interface Props {
  users: Array<UserData>
}

export default function UserCard(props: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <ul className="">
        {props.users.map((user) => (
          <li key={user.user_uid} className="py-2">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Link href={`/users/${user.user_uid}`} scroll={false}>
                  <Image
                    src="/undraw_profile_pic.svg"
                    className="flex-none w-11 h-11 rounded-full"
                    alt="profile picture and dropdown"
                    width={100}
                    height={100}
                    sizes=""
                  />
                </Link>
                <div>
                  <Link href={`/users/${user.user_uid}`} scroll={false}>
                    <div className="text-sm text-gray-700 font-semibold dark:text-white">
                      <span>{user.first_name}</span>
                      <span>{user.last_name}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span>@</span>
                      <span>{user.username}</span>
                    </div>
                  </Link>
                </div>
              </div>
              <button className="text-sm rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100 text-white bg-gradient-to-br from-[#9B6BFF] to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium text-center">
                Manage
              </button>
            </div>
            <div className="text-xs mx-14">
              <p>{user.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
