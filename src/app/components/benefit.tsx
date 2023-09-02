import Image from 'next/image'
import { ReactComponentElement, ReactElement } from 'react'

interface Bullet {
  title: string
  desc: string
  icon: ReactElement
}

export default function Benefit(props: {
  src: string
  alt: string
  title: string
  desc: string
  benefit: Array<Bullet>
}) {
  return (
    <div className='container flex flex-wrap lg:flex-nowrap p-6 mx-auto lg:p-8 lg:gap-14'>
      <div className='flex justify-center w-full lg:w-1/2'>
        <Image src={props.src} alt={props.alt} width={1200} height={1200} />
      </div>
      <div className='flex flex-wrap items-center justify-center w-full lg:w-1/2'>
        <div className='flex flex-col w-full mt-4'>
          <h3 className='max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white'>
            {props.title}
          </h3>
          <p className='max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300'>
            {props.desc}
          </p>
        </div>

        <div className='w-full mt-5'>
          <div className='flex items-start mt-8 space-x-3'>
            <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11'>
              {props.benefit[0].icon}
            </div>
            <div>
              <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                {props.benefit[0].title}
              </h4>
              <p className='mt-1 text-gray-500 dark:text-gray-400'>
                {props.benefit[0].desc}
              </p>
            </div>
          </div>
        </div>

        <div className='w-full mt-5'>
          <div className='flex items-start mt-8 space-x-3'>
            <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 '>
              {props.benefit[1].icon}
            </div>
            <div>
              <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                {props.benefit[1].title}
              </h4>
              <p className='mt-1 text-gray-500 dark:text-gray-400'>
                {props.benefit[1].desc}
              </p>
            </div>
          </div>
        </div>

        <div className='w-full mt-5'>
          <div className='flex items-start mt-8 space-x-3'>
            <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 '>
              {props.benefit[2].icon}
            </div>
            <div>
              <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                {props.benefit[2].title}
              </h4>
              <p className='mt-1 text-gray-500 dark:text-gray-400'>
                {props.benefit[2].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
