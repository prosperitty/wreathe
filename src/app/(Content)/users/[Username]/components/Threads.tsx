'use client'

import { Suspense, useState } from 'react'
import { Tab } from '@headlessui/react'
import Thread from './Thread'
import ScrollToTopButton from '../../../components/ScrollButton'
import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Threads() {
  let [categories] = useState({
    Threads: [
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
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ut perferendis vero cumque doloribus, eius repellat neque, eos rem velit sit omnis, doloremque beatae voluptatum. Non, rem. Modi doloremque illo, obcaecati consectetur recusandae voluptas iusto laboriosam pariatur rem illum dolorum qui et blanditiis ipsam magnam beatae quidem aperiam excepturi eum explicabo veritatis. Sint accusantium pariatur quaerat, consectetur assumenda optio aliquid. Et at odit explicabo ut quod unde esse repellat quos tenetur accusantium iste, voluptatem, dolorem similique consequatur voluptates eaque beatae fugit nostrum? Dolores quis labore modi magnam totam impedit qui pariatur. Deleniti, ipsum magni dolorum sunt cupiditate veritatis nesciunt nobis architecto vel. Doloremque quidem nesciunt deleniti dolores quae architecto similique! Autem, error nam necessitatibus corrupti possimus itaque debitis esse voluptates.',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 4,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Comments: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Likes: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  })

  return (
    <main className='w-full px-2 sm:px-4 overflow-y-auto'>
      <ScrollToTopButton />
      <Tab.Group>
        <Tab.List className='flex rounded-xl'>
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 dark:text-white',
                  'ring-white/60 ring-offset-2 ring-offset-amber-200 focus:outline-none focus:ring-0',
                  selected
                    ? 'bg-[#9B6BFF] shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-0'
              )}
            >
              <ul>
                <Suspense
                  fallback={
                    <>
                      <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
                    </>
                  }
                >
                  {posts.map((post) => (
                    // <li
                    //   key={post.id}
                    //   className='relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-white/[0.12]'
                    // >
                    //   <h3 className='text-sm font-medium leading-5 text-black dark:text-white'>
                    //     {post.title}
                    //   </h3>

                    //   <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500'>
                    //     <li>{post.date}</li>
                    //     <li>&middot;</li>
                    //     <li>{post.commentCount} comments</li>
                    //     <li>&middot;</li>
                    //     <li>{post.shareCount} shares</li>
                    //   </ul>

                    //   <a
                    //     href='#'
                    //     className={classNames(
                    //       'absolute inset-0 rounded-md',
                    //       'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                    //     )}
                    //   />
                    // </li>
                    <Thread
                      key={post.id}
                      title={post.title}
                      date={post.date}
                      commentCount={post.commentCount}
                      shareCount={post.shareCount}
                    />
                  ))}
                </Suspense>
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </main>
  )
}
