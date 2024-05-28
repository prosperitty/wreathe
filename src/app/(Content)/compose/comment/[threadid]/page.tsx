import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ComposeForm from '../../components/ComposeForm'
import { revalidatePath } from 'next/cache'

export default async function ComposeCommentPage({ params }) {
  async function postComment(formData: FormData) {
    'use server'
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    const bearerToken = `Bearer ${accessToken?.value}`
    const content = formData.get('content')
    const reqHeader = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    }

    try {
      const response = await fetch(
        `http://localhost:8080/compose/comment/${params.threadid}`,
        {
          method: 'POST',
          headers: reqHeader,
          body: JSON.stringify({ content }),
        },
      )
      if (response.ok) {
        const result = await response.json()
        console.log('this should work for thwe comment route page ====', result)
        // return result
      }
    } catch (err) {
      console.log(err)
      console.error(err, 'FAILED TO POST COMMENT')
      throw err
    }

    revalidatePath(`/feed`)
    redirect(`/feed`)
  }

  return (
    <div>
      <h2>Compose a Comment</h2>
      <ComposeForm postContent={postComment} />
    </div>
  )
}
