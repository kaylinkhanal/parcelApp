// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const riderRoutes= ['/rider-dashboard', 'rider-home'] 
const userRoutes= ['/home', 'user-home'] 

export  function Providers({children}) {
  const path = usePathname()
  const router = useRouter();
  const {userDetails} = useSelector(state=>state.user)

  useEffect(()=>{
    if(userDetails.role == 'user' && riderRoutes.includes(path)){
        router.push('/404')
    }else if(userDetails.role == 'rider' && userRoutes.includes(path)){
      router.push('/404')
  }
  },[])
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}