'use server'
import postComment from '@/app/lib/submitComment'
import ComposeForm from '../components/ComposeForm'

export default async function ComposeCommentPage() {
  return (
    <div>
      <h2>Compose a Comment</h2>
      <ComposeForm postContent={postComment} />
    </div>
  )
}
