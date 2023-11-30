import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  date: string
  commentCount: number
  shareCount: number
}

export default function Thread(props: Props) {
  return (
    <li className='relative border-gray-600 border rounded-md p-3 my-3 over:bg-gray-100 dark:hover:bg-white/[0.12]'>
      <div className='flex items-center space-x-4'>
        <div className='relative h-12 w-12 z-20'>
          <Link href='2'>
            <Image
              src='/next.svg'
              className='rounded-full border border-white'
              alt='profile picture'
              layout='fill'
              objectFit='contain'
              // width={35}
              // height={35}
            />
          </Link>
        </div>
        <div className='relative font-medium dark:text-white z-20'>
          <Link href='2'>
            <div>Jane Doe</div>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              @name
            </div>
          </Link>
        </div>
      </div>
      <h3 className='relative py-4 text-sm font-medium leading-5 text-black dark:text-white'>
        {props.title}
      </h3>

      <ul className='relative mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 z-20'>
        <li>{props.date}</li>
        <li>&middot;</li>
        <li className='cursor-pointer hover:text-white'>
          <Link href='/users'>{props.commentCount} comments</Link>
        </li>
        <li>&middot;</li>
        <li>{props.shareCount} likes</li>
      </ul>

      <Link
        href='#'
        className='absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
      />
    </li>
  )
}
