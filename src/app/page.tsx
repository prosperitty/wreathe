import Nav from './components/nav'
import Hero from './components/hero'
import Footer from './components/footer'
import Benefit from './components/benefit'

const benefit1 = [
  {
    title: 'Understand your customers',
    desc: 'Then explain the first point breifly in one or two lines.',
    icon: 'icon',
  },
  {
    title: 'Improve acquisition',
    desc: 'Here you can add the next benefit point.',
    icon: 'icon',
  },
  {
    title: 'Drive customer retention',
    desc: 'This will be your last bullet point in this section.',
    icon: 'icon',
  },
]

const benefit2 = [
  {
    title: 'Mobile Responsive Template',
    desc: 'Nextly is designed as a mobile first responsive template.',
    icon: 'icon',
  },
  {
    title: 'Powered by Next.js & TailwindCSS',
    desc: 'This template is powered by latest technologies and tools.',
    icon: 'icon',
  },
  {
    title: 'Dark & Light Mode',
    desc: 'Nextly comes with a zero-config light & dark mode. ',
    icon: 'icon',
  },
]

export default function Home() {
  return (
    <div className='bg-white dark:bg-gray-900'>
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

      <section className='[&>*:nth-child(even)]:flex-row-reverse'>
        <Benefit
          src='/Consultative sales-bro.svg'
          alt='consultative sales illustration'
          title='Highlight your benefits'
          desc='You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.'
          benefit={benefit1}
        />
        <Benefit
          src='/Finance leaders-bro.svg'
          alt='fincance leaders illustration'
          title='Offer more benefits here'
          desc='You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.'
          benefit={benefit2}
        />
      </section>
      <Footer />
    </div>
  )
}
