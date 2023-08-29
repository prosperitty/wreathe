import Image from 'next/image'
import Nav from './components/nav'

export default function Example() {
  return (
    <div className='bg-white'>
      <header className='absolute inset-x-0 top-0 z-50'>
        <Nav />
      </header>

      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9B6BFF] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className='py-48 sm:py-48 lg:py-32 lg:grid lg:grid-cols-12'>
          <div className='lg:col-span-6 place-self-center'>
            <div className='hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start'>
              <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                Announcing our next round of funding.{' '}
                <a href='#' className='font-semibold text-indigo-600'>
                  <span className='absolute inset-0' aria-hidden='true' />
                  Read more <span aria-hidden='true'>&rarr;</span>
                </a>
              </div>
            </div>
            <div className='text-center lg:text-start'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                Data to enrich your online business
              </h1>

              <p className='mt-6 text-lg leading-8 text-gray-600'>
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div className='mt-10 flex items-center justify-center lg:justify-start gap-x-6 '>
                <a
                  href='#'
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Get started
                </a>
                <a
                  href='#'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Learn more <span aria-hidden='true'>→</span>
                </a>
              </div>
            </div>
          </div>
          <div className='lg:col-span-6 hidden lg:block'>
            <Image
              src='/App monetization-bro.svg'
              alt='app monetization'
              width={1200}
              height={1200}
            />
          </div>
        </div>
        <div
          className='absolute inset-x-0 top-[calc(90%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(90%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9B6BFF] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] overflow-hidden'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <div className='container flex flex-wrap lg:flex-nowrap p-6 mx-auto lg:p-8 lg:gap-14'>
        <div className='flex justify-center w-full lg:w-1/2'>
          <Image
            src='/Consultative sales-bro.svg'
            alt='app monetization'
            width={1200}
            height={1200}
          />
        </div>
        <div className='flex flex-wrap items-center justify-center w-full lg:w-1/2'>
          <div className='flex flex-col w-full mt-4'>
            <h3 className='max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl '>
              Title title title title title title
            </h3>
            <p className='max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
              quod?
            </p>
          </div>

          <div className='w-full mt-5'>
            <div className='flex items-start mt-8 space-x-3'>
              <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 '>
                icon
              </div>
              <div>
                <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                  Lorem, ipsum dolor.
                </h4>
                <p className='mt-1 text-gray-500 dark:text-gray-400'>
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>

          <div className='w-full mt-5'>
            <div className='flex items-start mt-8 space-x-3'>
              <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 '>
                icon
              </div>
              <div>
                <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                  Lorem, ipsum dolor.
                </h4>
                <p className='mt-1 text-gray-500 dark:text-gray-400'>
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>

          <div className='w-full mt-5'>
            <div className='flex items-start mt-8 space-x-3'>
              <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 '>
                icon
              </div>
              <div>
                <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                  Lorem, ipsum dolor.
                </h4>
                <p className='mt-1 text-gray-500 dark:text-gray-400'>
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container flex flex-wrap lg:flex-nowrap p-6 mx-auto lg:p-8 lg:gap-14'>
        <div className='flex flex-wrap items-center justify-center w-full lg:w-1/2'>
          <div className='flex flex-col w-full mt-4'>
            <h3 className='max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl '>
              Title title title title title title
            </h3>
            <p className='max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
              quod?
            </p>
          </div>

          <div className='w-full mt-5'>
            <div className='flex items-start mt-8 space-x-3'>
              <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 '>
                icon
              </div>
              <div>
                <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                  Lorem, ipsum dolor.
                </h4>
                <p className='mt-1 text-gray-500 dark:text-gray-400'>
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>

          <div className='w-full mt-5'>
            <div className='flex items-start mt-8 space-x-3'>
              <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 '>
                icon
              </div>
              <div>
                <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                  Lorem, ipsum dolor.
                </h4>
                <p className='mt-1 text-gray-500 dark:text-gray-400'>
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>

          <div className='w-full mt-5'>
            <div className='flex items-start mt-8 space-x-3'>
              <div className='flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 '>
                icon
              </div>
              <div>
                <h4 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                  Lorem, ipsum dolor.
                </h4>
                <p className='mt-1 text-gray-500 dark:text-gray-400'>
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center w-full lg:w-1/2'>
          <Image
            src='/Finance leaders-bro.svg'
            alt='app monetization'
            width={1200}
            height={1200}
          />
        </div>
      </div>

      <div className='container px-6 mx-auto lg:px-8'>
        <div className='py-10 mt-5 text-sm text-center border-t border-gray-100 dark:border-trueGray-700  text-gray-600 dark:text-gray-400'>
          Copyright © {new Date().getFullYear()}. Made with ♥ by{' '}
          <a href='https://github.com/alex-lvl' target='_blank' rel='noopener'>
            Alex Marmolejo.{' '}
          </a>
          Illustrations from{' '}
          <a href='https://www.glazestock.com/' target='_blank' rel='noopener '>
            lorem
          </a>
        </div>
      </div>
    </div>
  )
}
