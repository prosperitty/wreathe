'use server'
import { redirect } from 'next/navigation'

export default async function searchUsername(formData: FormData) {
  const query = formData.get('query')
  redirect(`/messages/${query}`)
}
