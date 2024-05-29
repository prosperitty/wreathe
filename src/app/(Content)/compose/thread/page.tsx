'use server'
import postThread from '@/app/lib/submitThread'
import ComposeForm from '../components/ComposeForm'

export default async function ComposeThreadPage() {
  return (
    <div>
      <h2>Compose a Thread</h2>
      <ComposeForm postContent={postThread} />
    </div>
  )
}
