import ComposeForm from '@/app/(Content)/compose/components/ComposeForm'
import Modal from '@/app/components/Modal'
import postThread from '@/app/lib/submitThread'

export default async function ComposeThread() {
  // async function postThread(formData: FormData) {
  //   'use server'
  //   const content = formData.get('content')

  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/compose/thread`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ content }),
  //   })

  //   const result = await response.json()
  //   console.log('this should work', result)
  //   return result
  // }

  return (
    <Modal threadType={'Thread'}>
      <ComposeForm postContent={postThread} />
    </Modal>
  )
}
