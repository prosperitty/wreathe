import Nav from './components/nav'
import Hero from './components/hero'
import Footer from './components/footer'
import Benefit from './components/benefit'
import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline'

const benefit1 = [
  {
    title: 'Catch market trends',
    desc: 'Stay updated with economic events.',
    icon: <ArrowTrendingUpIcon className='w-7 h-7' />,
  },
  {
    title: 'Improve your knowledge',
    desc: 'Learn together to become educated in personal finance.',
    icon: <DocumentChartBarIcon className='w-7 h-7' />,
  },
  {
    title: 'Risk management',
    desc: 'Manage your risk so you can become profitable.',
    icon: <CurrencyDollarIcon className='w-7 h-7' />,
  },
]

const benefit2 = [
  {
    title: 'Follow fellow traders',
    desc: 'You choose what you want to see on your timeline.',
    icon: <ArrowTrendingUpIcon className='w-7 h-7' />,
  },
  {
    title: 'View any market',
    desc: 'Whether its bonds, stocks, or crypto, you can view it here.',
    icon: <DocumentChartBarIcon className='w-7 h-7' />,
  },
  {
    title: 'Profit',
    desc: 'Look forward to profiting to achieve your financial goals.',
    icon: <CurrencyDollarIcon className='w-7 h-7' />,
  },
]

export default function Home() {
  return (
    <div className='bg-white dark:bg-gray-900'>
      <header className='absolute inset-x-0 top-0 z-50'>
        <Nav />
      </header>

      <div id='home' className='relative isolate px-6 pt-14 lg:px-8'>
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
        <Hero />
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

      <section id='benefits' className='[&>*:nth-child(even)]:flex-row-reverse'>
        <Benefit
          src='/Consultative sales-bro.svg'
          alt='consultative sales illustration'
          title='Market analysis'
          desc='This platform can be used to voice ideas about short term or long term market trends. There are various opinions floating around of how the market will perform, and this is the ideal place to discuss.'
          benefit={benefit1}
        />
        <Benefit
          src='/Finance leaders-bro.svg'
          alt='fincance leaders illustration'
          title="Don't trade alone"
          desc='You can use this social platform to discuss forecasts and analysis with a community of market participants. Grow with a community of traders looking to succeed.'
          benefit={benefit2}
        />
      </section>
      <Footer />
    </div>
  )
}
