export default function Footer() {
  return (
    <footer className='px-6 mx-auto mt-10 lg:px-8 border-t border-gray-100 dark:border-neutral-700'>
      <div className='py-10 text-sm text-center text-gray-600 dark:text-gray-400'>
        Copyright © {new Date().getFullYear()}. Made with ♥ by{' '}
        <a href='https://github.com/alex-lvl' target='_blank' rel='noopener'>
          Alex Marmolejo.{' '}
        </a>
        Illustrations from{' '}
        <a href='https://storyset.com/' target='_blank' rel='noopener'>
          <u>Storyset</u>
        </a>
      </div>
    </footer>
  )
}
