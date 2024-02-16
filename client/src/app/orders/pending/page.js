'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const page = () => {
   const [orders, setOrders]= useState([])
    const fetchPendingOrders=  async()=>{
        const {data} = await axios.get( `http://localhost:${process.env.NEXT_PUBLIC_API_URL}/orders`);
        setOrders(data.orders)
    }
    useEffect(()=>{
        fetchPendingOrders()
    },[])
  return (
    <div>{
        orders.length>0 &&  orders?.map((item)=>{
           return (<div className='p-2 m-2 bg-red-500'>
               <p>pickup:  {item.senderAddr}</p>
               destination:  {item.receiverAddr}
       
                </div>)
        })
    
    }</div>
  )
}

export default page