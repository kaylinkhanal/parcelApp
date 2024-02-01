'use client'
import React from 'react'
import { useSelector } from 'react-redux'


const page = () => {
    const {userDetails} = useSelector(state=>state.user)
  return (
    <div>
        full name: {userDetails.fullName}
        full emaill: {userDetails.email}


    </div>
  )
}

export default page