// import React from 'react'
// async function getData() {
//     const res = await fetch('http://localhost:5000/users')
//     if (!res.ok) {
//       throw new Error('Failed to fetch data')
//     }
//     return res.json()
//   }
   
// const page = async() => {
//     const {data} = await getData()
//   return (
//     <div>
//         {data.map((item)=>{
//             return<li>{item.email}</li>
//         })}
//     </div>
//   )
// }

// export default page

'use client'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [userList, setUserList] = useState([])
    const fetchUsers =async()=> {
        const res = await fetch('http://localhost:5000/users')
        const {data} = await res.json()
        setUserList(data)
    }
    useEffect(()=>{
        fetchUsers()
    },[])
  return (
    <div>
           {userList.map((item)=>{
            return<li>{item.email}</li>
        })}
        </div>
  )
}

export default page



