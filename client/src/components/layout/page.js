"use client"
import React from 'react'
import Footer from '../footer/page'
import Nav from '../navBar/page'
const page = ({children}) => {
  return (
    <div>
    <Nav/>
   <section className="text-gray-600 body-font relative">
  <div className="">

  
     
        {children}
       
        <Footer/>
  </div>
</section>
    </div>
  )
}

export default page