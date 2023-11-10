import Image from 'next/image'

interface Props {
  title: string
  date: string
  commentCount: number
  shareCount: number
  classNames: (a: string, b?: string) => string
}

export default function Thread(props: Props) {
  return (
    <li className='relative border-gray-600 border rounded-md p-3 my-3 over:bg-gray-100 dark:hover:bg-white/[0.12]'>
      <div className='flex items-center space-x-4'>
        <div className='relative h-12 w-12 z-20'>
          <Image
            src='/next.svg'
            className='rounded-full border border-white'
            alt='profile picture'
            layout='fill'
            objectFit='contain'
            // width={35}
            // height={35}
          />
        </div>
        <div className='relative font-medium dark:text-white z-20'>
          <div>Jane Doe</div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>@name</div>
        </div>
      </div>
      <h3 className='relative py-4 text-sm font-medium leading-5 text-black dark:text-white'>
        {props.title}
      </h3>

      <ul className='relative mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 z-20'>
        <li>{props.date}</li>
        <li>&middot;</li>
        <li className='cursor-pointer hover:text-white'>
          <a href='users'>{props.commentCount} comments</a>
        </li>
        <li>&middot;</li>
        <li>{props.shareCount} shares</li>
      </ul>

      <a
        href='#'
        className={props.classNames(
          'absolute inset-0 rounded-md',
          'ring-blue-400 focus:-z-10 focus:outline-none focus:ring-2'
        )}
      />
    </li>
  )
}
