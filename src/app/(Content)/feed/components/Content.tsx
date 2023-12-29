'use client'
import { useState, useEffect } from 'react'
import Thread from '../../components/Thread'
import ScrollToTopButton from '../../components/ScrollButton'
import { Suspense } from 'react'
import ThreadSkeleton from '../../components/ThreadSkeleton'
import { cookies } from 'next/headers'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Content(props) {
  const [refreshing, setRefreshing] = useState(false)
  // const [feed, setFeed] = useState(props.feedData)

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
      thread_uid: 1,
      wreathe_user: {
        first_name: 'client',
        last_name: 'doe',
        username: 'johndoe',
      },
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ut perferendis vero cumque doloribus, eius repellat neque, eos rem velit sit omnis, doloremque beatae voluptatum. Non, rem. Modi doloremque illo, obcaecati consectetur recusandae voluptas iusto laboriosam pariatur rem illum dolorum qui et blanditiis ipsam magnam beatae quidem aperiam excepturi eum explicabo veritatis. Sint accusantium pariatur quaerat, consectetur assumenda optio aliquid. Et at odit explicabo ut quod unde esse repellat quos tenetur accusantium iste, voluptatem, dolorem similique consequatur voluptates eaque beatae fugit nostrum? Dolores quis labore modi magnam totam impedit qui pariatur. Deleniti, ipsum magni dolorum sunt cupiditate veritatis nesciunt nobis architecto vel. Doloremque quidem nesciunt deleniti dolores quae architecto similique! Autem, error nam necessitatibus corrupti possimus itaque debitis esse voluptates.',
      thread_timestamp: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      thread_uid: 2,
      wreathe_user: {
        first_name: 'client',
        last_name: 'doe',
        username: 'johndoe',
      },
      content: "So you've bought coffee... now what?",
      thread_timestamp: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },

    {
      thread_uid: 3,
      wreathe_user: {
        first_name: 'client',
        last_name: 'doe',
        username: 'johndoe',
      },
      content: 'Is tech making coffee better or worse?',
      thread_timestamp: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      thread_uid: 4,
      wreathe_user: {
        first_name: 'client',
        last_name: 'doe',
        username: 'johndoe',
      },
      content: 'The most innovative things happening in coffee',
      thread_timestamp: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
    {
      thread_uid: 5,
      wreathe_user: {
        first_name: 'client',
        last_name: 'doe',
        username: 'johndoe',
      },
      content: 'Ask Me Anything: 10 answers to your questions about coffee',
      thread_timestamp: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      thread_uid: 6,
      wreathe_user: {
        first_name: 'client',
        last_name: 'doe',
        username: 'johndoe',
      },
      content: "The worst advice we've ever heard about coffee",
      thread_timestamp: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ])

  const posts = threads.map((post) => {
    return (
      <Thread
        key={post.thread_uid}
        user={post.wreathe_user}
        thread_uid={post.thread_uid.toString()}
        content={post.content}
        thread_timestamp={post.thread_timestamp}
        commentCount={post.commentCount}
        shareCount={post.shareCount}
      />
    )
  })

  const feedData = props.feedData.map((post) => {
    return (
      <Thread
        key={post.thread_uid}
        user={post.wreathe_user}
        thread_uid={post.thread_uid.toString()}
        content={post.content}
        thread_timestamp={post.thread_timestamp}
        commentCount={post.comment.length}
        shareCount={post.shareCount}
      />
    )
  })

  return (
    //overflow-y-auto was here replaced in layout
    <main className='px-2 sm:px-4 h-full'>
      <ScrollToTopButton />
      <ul>
        <Suspense
          fallback={
            <>
              <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
              <ThreadSkeleton />
            </>
          }
        >
          {feedData}
          {posts}
        </Suspense>
      </ul>
    </main>
  )
}
