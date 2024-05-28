'use server'
import { redirect } from 'next/navigation'
import { fetchSearchedUsers } from './fetchSearchedUsers'

export default async function searchUsername(formData: FormData) {
  const query = formData.get('query')
  redirect(`/messages/${query}`)
}

export async function searchProfile(formData: FormData) {
  const query = formData.get('query')
  const result = query ? await fetchSearchedUsers(query.toString()) : null
  if (result.searchedUsers.length !== 0) {
    const { user_uid } = result.searchedUsers[0]
    user_uid ? redirect(`/users/${user_uid}`) : 'no user found'
  }
}
