import Image from 'next/image'
import Link from 'next/link'

export default function UserCard(props) {
  return (
    <div className='max-w-2xl mx-auto px-4'>
      <ul className=''>
        {props.users.map((user) => (
          <li key={user.user_uid} className='py-2'>
            <div className='flex items-start justify-between'>
              <div className='flex gap-3'>
                <Link href={`/users/${user.user_uid}`} scroll={false}>
                  <Image
                    src='/undraw_profile_pic.svg'
                    className='flex-none w-11 h-11 rounded-full'
                    alt='profile picture and dropdown'
                    width={100}
                    height={100}
                    sizes=''
                  />
                </Link>
                <div>
                  <Link href={`/users/${user.user_uid}`} scroll={false}>
                    <div className='text-sm text-gray-700 font-semibold'>
                      <span>{user.first_name}</span>
                      <span>{user.last_name}</span>
                    </div>
                    <div className='text-sm text-gray-600'>
                      <span>@</span>
                      <span>{user.username}</span>
                    </div>
                  </Link>
                </div>
              </div>
              <button className='text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100'>
                Manage
              </button>
            </div>
            <div className='text-xs mx-14'>
              <p className=''>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint,
                labore dignissimos impedit veritatis obcaecati facilis dolore
                dicta aspernatur fugit voluptatem magni quibusdam, dolorem
                accusamus molestias deserunt vero? Dicta, qui quisquam?
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
