// import Image from 'next/image'
// import Link from 'next/link'
// import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
// import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
// import CommentsSection from './Comments'
// import { Transition } from '@headlessui/react'
// import { Fragment } from 'react'

export default async function Post() {
  return (
    <div>hello</div>
    // <>
    //   <div className="border-gray-600 border rounded-md my-6 p-3">
    //     <div className="flex items-center space-x-4">
    //       <div className="relative h-12 w-12 z-20">
    //         <Image
    //           src="/next.svg"
    //           className="rounded-full border border-white"
    //           alt="profile picture"
    //           layout="fill"
    //           objectFit="contain"
    //           // width={35}
    //           // height={35}
    //         />
    //       </div>
    //       <div className="relative font-medium dark:text-white z-20">
    //         <Link href="2" scroll={false}>
    //           <div>
    //             <span>{thread.wreathe_user.first_name}</span>
    //             <span> </span>
    //             <span>{thread.wreathe_user.last_name}</span>
    //           </div>
    //           <div className="text-sm text-gray-500 dark:text-gray-400">
    //             <span>@</span>
    //             <span>{thread.wreathe_user.username}</span>
    //           </div>
    //         </Link>
    //       </div>
    //     </div>
    //     <h3 className="relative py-4 text-sm font-medium leading-5 text-black dark:text-white">
    //       {thread.content}
    //     </h3>

    //     <ul className="relative pt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 z-20">
    //       <li>{thread.thread_timestamp}</li>
    //       <li>&middot;</li>
    //       <li className="cursor-pointer hover:text-white">
    //         <Link href={`/compose/comment/${thread.thread_uid}`} scroll={false}>
    //           {thread.comment.length} comments
    //         </Link>
    //       </li>
    //       <li>&middot;</li>
    //       <li className="cursor-pointer hover:text-white flex items-center">
    //         {/* <span className='mr-1'>{thread.likes.length} </span> */}
    //         <span>likes</span>
    //       </li>
    //       <li className="hover:text-white">
    //         <div className="absolute right-0 flex items-center">
    //           <button
    //             // onClick={handleLike}
    //             className="w-4 h-4 flex overflow-hidden relative"
    //           >
    //             <Transition
    //               as={Fragment}
    //               // show={isLiked}
    //               enter="transition-opacity duration-200 ease-in-out"
    //               enterFrom="opacity-0"
    //               enterTo="opacity-100"
    //               leave="transition-opacity duration-100 ease-in-out"
    //               leaveFrom="opacity-100"
    //               leaveTo="opacity-0"
    //             >
    //               <HeartIconSolid className="text-yellow-300 absolute" />
    //             </Transition>
    //             <Transition
    //               as={Fragment}
    //               show={!isLiked}
    //               enter="transition-opacity duration-200 ease-linear"
    //               enterFrom="opacity-0"
    //               enterTo="opacity-100"
    //               leave="transition-opacity duration-100 ease-linear"
    //               leaveFrom="opacity-100"
    //               leaveTo="opacity-0"
    //             >
    //               <HeartIconOutline className="absolute" />
    //             </Transition>
    //           </button>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    //   <CommentsSection
    //     comments={thread.comment}
    //     thread={thread}
    //     user={thread.wreathe_user}
    //   />
    // </>
  )
}
