'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function Search({
  action,
}: {
  action: (formData: FormData) => unknown
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    console.log(params)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <form autoComplete="off" action={action}>
      <input
        className="rounded-md p-2 text-center bg-gray-100 transition duration-200 focus:text-start focus:outline-none focus:ring-2 w-full dark:bg-gray-600 "
        type="search"
        placeholder="Search"
        name="query"
        minLength={1}
        maxLength={150}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        onBlur={(e) => {
          handleSearch('')
          e.target.value = ''
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </form>
  )
}
