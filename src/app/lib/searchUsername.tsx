'use server'
import { redirect } from 'next/navigation'
import { fetchSearchedUsers } from './fetchSearchedUsers'

export default async function searchUsername(formData: FormData) {
  const query = formData.get('query')
  const result = query ? await fetchSearchedUsers(query.toString()) : ''
  if (!result.success) {
    return 'no user found'
  }
  if (result.searchedUsers.length !== 0) {
    const { username } = result.searchedUsers[0]
    if (username) {
      return redirect(`/users/${username}`)
    } else {
      return 'no user found'
    }
    // username ? redirect(`/messages/${username}`) : 'no user found'
  }
}

export async function searchProfile(formData: FormData) {
  const query = formData.get('query')
  const result = query ? await fetchSearchedUsers(query.toString()) : ''
  if (!result.success) {
    return 'no user found'
  }
  if (result.searchedUsers.length !== 0) {
    const { user_uid } = result.searchedUsers[0]
    if (user_uid) {
      return redirect(`/users/${user_uid}`)
    } else {
      return 'no user found'
    }
    // user_uid ? redirect(`/users/${user_uid}`) : 'no user found'
  }
}
