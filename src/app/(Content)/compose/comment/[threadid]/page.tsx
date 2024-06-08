import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ComposeForm from '../../components/ComposeForm'
import { revalidatePath } from 'next/cache'

export default async function ComposeCommentPage({
  params,
}: {
  params: { threadid: string }
}) {
  //maybe use func.call to call this function when called outside of this component?
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
        `${process.env.NEXT_PUBLIC_API_URL}/compose/comment/${params.threadid}`,
        {
          method: 'POST',
          headers: reqHeader,
          body: JSON.stringify({ content }),
        },
      )
      const res = await response.json()
      if (!response.ok) {
        console.error('Error submitting comment')
        throw new Error('Error submitting comment')
      }
      console.log('this should work for thwe comment route page ====', res)
    } catch (err) {
      console.error(err, 'FAILED TO POST COMMENT')
      throw err
    }

    revalidatePath(`/users/feed`)
    redirect(`/feed`)
  }

  return (
    <div>
      <h2>Compose a Comment</h2>
      <ComposeForm postContent={postComment} />
    </div>
  )
}
