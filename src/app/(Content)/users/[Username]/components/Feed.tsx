// import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'
// import { cookies } from 'next/headers'
// import { Suspense } from 'react'

// interface params {
//   params: { Username: string }
// }

// const delayFetch = (params, bearerToken) =>
//   new Promise((resolve) => {
//     setTimeout(
//       () =>
//         resolve(
//           fetch(`http://localhost:8080/users/${params}`, {
//             method: 'GET',
//             mode: 'cors',
//             credentials: 'include', // Needed to include the cookie
//             headers: {
//               Authorization: bearerToken,
//             },
//           })
//         ),
//       5000
//     )
//   })

// export default async function TestSkeleton({ params }: params) {
//   const cookieStore = cookies()
//   const accessToken = cookieStore.get('accessToken')
//   const bearerToken = `Bearer ${accessToken?.value}`
//   const response = await new Promise((resolve) => {
//     setTimeout(
//       () =>
//         resolve(
//           fetch(`http://localhost:8080/users/1`, {
//             method: 'GET',
//             mode: 'cors',
//             credentials: 'include', // Needed to include the cookie
//             headers: {
//               Authorization: bearerToken,
//             },
//           })
//         ),
//       100000
//     )
//   })
//   const result = await response.json()
//   console.log(result, 'user data')
//   console.log(bearerToken)
//   return (
//     <>
//       <Suspense fallback={<ThreadSkeleton />}>
//         <div>My Post: 1</div>
//         <div>My Post: 1</div>
//       </Suspense>
//     </>
//   )
// }
