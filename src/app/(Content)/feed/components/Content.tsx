'use client'
import { useState, useEffect } from 'react'
import Thread from '../../users/[Username]/components/Thread'
import ScrollToTopButton from '../../components/ScrollButton'
import { Suspense } from 'react'
import ThreadSkeleton from '../../components/ThreadSkeleton'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Content() {
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const handleRefresh = () => {
      // Add your refresh logic here
      // For example, you can fetch new data from an API

      // Simulate an asynchronous operation (remove this in real implementation)
      setRefreshing(true)
      setTimeout(() => {
        setRefreshing(false)
      }, 1500)
    }

    window.addEventListener('scroll', handleRefresh)

    return () => {
      window.removeEventListener('scroll', handleRefresh)
    }
  }, [])

  let [threads] = useState([
    {
      id: 1,
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ut perferendis vero cumque doloribus, eius repellat neque, eos rem velit sit omnis, doloremque beatae voluptatum. Non, rem. Modi doloremque illo, obcaecati consectetur recusandae voluptas iusto laboriosam pariatur rem illum dolorum qui et blanditiis ipsam magnam beatae quidem aperiam excepturi eum explicabo veritatis. Sint accusantium pariatur quaerat, consectetur assumenda optio aliquid. Et at odit explicabo ut quod unde esse repellat quos tenetur accusantium iste, voluptatem, dolorem similique consequatur voluptates eaque beatae fugit nostrum? Dolores quis labore modi magnam totam impedit qui pariatur. Deleniti, ipsum magni dolorum sunt cupiditate veritatis nesciunt nobis architecto vel. Doloremque quidem nesciunt deleniti dolores quae architecto similique! Autem, error nam necessitatibus corrupti possimus itaque debitis esse voluptates.',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },

    {
      id: 3,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 4,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
    {
      id: 5,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 6,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ])

  const posts = threads.map((post) => {
    return (
      <Thread
        key={post.id}
        title={post.title}
        date={post.date}
        commentCount={post.commentCount}
        shareCount={post.shareCount}
      />
    )
  })

  return (
    <main className='px-2 sm:px-4 h-full overflow-y-auto'>
      <ScrollToTopButton />
      <ul>
        <Suspense
          fallback={
            <>
              <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />{' '}
              <ThreadSkeleton />
            </>
          }
        >
          {posts}
        </Suspense>
      </ul>
      {/* <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
        <div className='grid grid-cols-3 gap-4 mb-4'>
          <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
          <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
          <div className='flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
        </div>
        <div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
          <p className='text-2xl text-gray-400 dark:text-gray-500'>
            <svg
              className='w-3.5 h-3.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 18'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M9 1v16M1 9h16'
              />
            </svg>
          </p>
        </div>
        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
          <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
          <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
          <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
        </div>
        <div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
          <p className='text-2xl text-gray-400 dark:text-gray-500'>
            <svg
              className='w-3.5 h-3.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 18'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M9 1v16M1 9h16'
              />
            </svg>
          </p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
          <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
          <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
          <div className='flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
        </div>
      </div> */}
    </main>
  )
}
