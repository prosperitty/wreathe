'use server'
import { cookies } from 'next/headers'
import ComposeForm from '../components/ComposeForm'

export async function postComment(formData: FormData) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const bearerToken = `Bearer ${accessToken?.value}`
  const content = formData.get('content')
  const reqHeader = {
    Authorization: bearerToken,
    'Content-Type': 'application/json',
  }

  const response = await fetch(`http://localhost:8080/compose/comment`, {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify({ content }),
  })

  const result = await response.json()
  console.log('this should work for thwe comment route page ====', result)
  return result
}

export default async function ComposeCommentPage() {
  return (
    <div>
      <h2>Compose a Comment</h2>
      <ComposeForm postContent={postComment} />
    </div>
  )
}
