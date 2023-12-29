'use client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
// import { cookies } from 'next/headers'

// async function getData() {
//   const res = await fetch('http://localhost:8080/users')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

// async function logoutReq() {
//   const res = await fetch('http://localhost:8080/refresh-token/logout', {
//     method: 'POST',
//     mode: 'cors',
//     credentials: 'include', // Needed to include the cookie
//     cache: 'no-cache',
//   })
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

export default function Logout() {
  //have to use client component to logout, next js probably provides a way to logout with a server component
  useEffect(() => {
    const fetchLogOut = async () => {
      const response = await fetch(
        'http://localhost:8080/refresh-token/logout',
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include', // Needed to include the cookie
        }
      )
      if (!response.ok) return undefined
      console.log(response)
      return response.json()
    }
    fetchLogOut()
    return redirect('/')
  }, [])

  // logoutReq()

  // const data = await getData()
  // const elements = data.map((data) => {
  //   return (
  //     <div key={data.first_name}>
  //       <p>{data.first_name}</p>
  //       <p>{data.username}</p>
  //       <p>{data.last_name}</p>
  //       <p>{data.refresh_token}</p>
  //       <p>==================</p>
  //     </div>
  //   )
  // })
  // const cookiesList = cookies()
  // const list = cookiesList.getAll().map((cookie) => (
  //   <div key={cookie.name}>
  //     <p>Name: {cookie.name}</p>
  //     <p>Value: {cookie.value}</p>
  //   </div>
  // ))

  // return (
  //   <main>
  //     <div> {elements}</div>
  //     <div>{list}</div>
  //   </main>
  // )
  // return redirect('/')
}
