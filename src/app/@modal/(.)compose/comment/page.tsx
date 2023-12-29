// import ComposeForm from '@/app/(Content)/compose/components/ComposeForm'
// import Modal from '@/app/components/Modal'
// import { postComment } from '@/app/(Content)/compose/comment/page'

// export default async function ComposeComment() {
//   // async function postComment(formData: FormData) {
//   //   'use server'
//   //   const content = formData.get('content')

//   //   const response = await fetch(`http://localhost:8080/compose/comment`, {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({ content }),
//   //   })

//   //   const result = await response.json()
//   //   console.log('this should work', result)
//   //   return result
//   // }

//   return (
//     <Modal threadType={'Comment'}>
//       <ComposeForm postContent={postComment} />
//     </Modal>
//   )
// }
