// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
// import { useRouter } from 'next/navigation'
// import { useEffect, useLayoutEffect } from 'react'
// import { useSelector } from 'react-redux'
export  function Providers({children}) {
  // const router = useRouter()
  // const {token} = useSelector(state=>state.user)
  // useLayoutEffect(()=>{
  //   if(!token){
  //     router.push('/')
  //   }
  // },[])
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}