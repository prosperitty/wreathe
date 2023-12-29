import Thread from '@/app/(Content)/components/Thread'
import Image from 'next/image'
import Link from 'next/link'

export default function CommentsSection(props) {
  const commentList = props.comments.map((post) => {
    return (
      <div
        key={post.comment_uid}
        className='border-gray-600 border rounded-md p-3'
      >
        <div className='flex items-center space-x-4'>
          <div className='relative h-12 w-12 z-20'>
            <Link
              href={`users/e62092f1-a8ee-45de-ba19-3b28c7d1d221/threads/${post.comment_uid}`}
            >
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
            {/* <Link href='2'>
              <div>
                <span>{post.wreathe_user.first_name}</span>
                <span> </span>
                <span>{post.wreathe_user.last_name}</span>
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                <span>@</span>
                <span>{post.wreathe_user.username}</span>
              </div>
            </Link> */}
          </div>
        </div>
        <h3 className='relative py-4 text-sm font-medium leading-5 text-black dark:text-white'>
          {post.content}
        </h3>

        <ul className='relative pt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 z-20'>
          <li>{post.comment_timestamp}</li>
          <li>&middot;</li>
          {/* <li className='cursor-pointer hover:text-white'>
            <Link href={`/compose/comment/${post.thread_uid}`}>
              {post.comments.length} comments
            </Link>
          </li> */}
          <li>&middot;</li>
          <li className='cursor-pointer hover:text-white flex items-center'>
            <span className='mr-1'>{post.likes.length} </span>
            <span>likes</span>
          </li>
          <li className='hover:text-white'>
            <div className='absolute right-0 flex items-center'></div>
          </li>
        </ul>
      </div>
    )
  })

  return (
    <section>
      <ul>{commentList}</ul>
    </section>
  )
}
