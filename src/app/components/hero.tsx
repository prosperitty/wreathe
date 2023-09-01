import Image from 'next/image'

export default function Hero() {
  return (
    <div className='py-48 sm:py-48 lg:py-32 lg:grid lg:grid-cols-12'>
      <div className='lg:col-span-6 place-self-center'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start'>
          <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-gray-50/10 dark:hover:ring-gray-50/20'>
            Announcing our next round of funding.{' '}
            <a
              href='#'
              className='font-semibold text-indigo-600 dark:text-indigo-500'
            >
              <span className='absolute inset-0' aria-hidden='true' />
              Read more <span aria-hidden='true'>&rarr;</span>
            </a>
          </div>
        </div>
        <div className='text-center lg:text-start'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white'>
            Data to enrich your online business
          </h1>

          <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400'>
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
              className='text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200'
            >
              Learn more <span aria-hidden='true'>→</span>
            </a>
          </div>
        </div>
      </div>
      <div className='hidden lg:col-span-6 lg:block'>
        <Image
          src='/App monetization-bro.svg'
          alt='app monetization'
          width={1200}
          height={1200}
        />
      </div>
    </div>
  )
}
