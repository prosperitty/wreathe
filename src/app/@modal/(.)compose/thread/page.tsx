import ComposeForm from '@/app/(Content)/compose/components/ComposeForm'
import Modal from '@/app/components/Modal'
import postThread from '@/app/lib/submitThread'

export default async function ComposeThread() {
  return (
    <Modal threadType={'Thread'}>
      <ComposeForm postContent={postThread} />
    </Modal>
  )
}
