'use client'
import React from 'react'
import Nav from '@/components/navBar/page'
import Layout from '@/components/layout/page'
import {Input, Button} from "@nextui-org/react";
import { FcCustomerSupport } from "react-icons/fc";
import { BsBoxSeamFill } from "react-icons/bs";
import { FcServices } from "react-icons/fc";
import { useSelector, useDispatch } from 'react-redux'
import { FaBeer } from 'react-icons/fa';
const page = () => {
<<<<<<< HEAD
  // 'Normal function call it increment()'
  // 'Redux function  dispatch and call it dispatch(increment())'

  
=======
>>>>>>> 83889fd154cfb02eaa30fe8ac41731c315439928
  return (
    <div>
      <Layout>

      <div className='p-3 max-w-lg mx-auto flex flex-row gap-1'>
        <Input type="text" label="Enter your order id" />
        <Button color="warning" size='lg'>TRACK</Button>  
      
    </div>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Ship, manage, track, deliver</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">So much goes into running your business. Take some time to recharge and read. Get guidance on everything from creating a returns strategy to improving sustainability.</p>
    </div>
    <h1 className="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900 ">Get In Touch</h1>
    <div className="flex flex-wrap -m-4 text-center">
      <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <span  className="text-indigo-500 w-12 h-12 mb-3 inline-block"> 
        <FcCustomerSupport size={60} />
          </span>
          <h2 className="title-font font-medium text-2xl text-gray-900">Customer Support</h2>
          <p className="leading-relaxed">Inquire about due deliveries</p>
        </div>
      </div>
      <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="orange" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
          </svg>
          <h2 className="title-font font-medium text-3xl text-gray-900">Careers</h2>
          <p className="leading-relaxed">Explore opportunities to join our team</p>
        </div>
      </div>
      <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <span  className="text-indigo-500 w-12 h-12 mb-3 inline-block"> 
        <BsBoxSeamFill size={50} color='orange' />
        </span>
          <h2 className="title-font font-medium text-2xl text-gray-900">Warehouse</h2>
          <p className="leading-relaxed">Store your order</p>
        </div>
      </div>
      <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <span  className="text-indigo-500 w-12 h-12 mb-3 inline-block"> 
          <FcServices size={50}/>
          </span>
          <h2 className="title-font font-medium text-2xl text-gray-900">Services</h2>
          <p className="leading-relaxed">Return your order</p>
        </div>
      </div>
    </div>
  </div>
</section>
      </Layout>
   
     
      </div>
  )
}

export default page