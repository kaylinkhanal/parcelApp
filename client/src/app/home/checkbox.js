'use client'
import React,{useState} from 'react'
import {Checkbox} from "@nextui-org/react"
import {Input} from "@nextui-org/react";

const checkbox = () => {
    const [detailsopen, setdetailsopen] = useState(false)
    const handleChange=(e)=>{
        console.log(e)
            setdetailsopen(!detailsopen)
        
    }
  return (
    <div>
      {detailsopen?
      
        <div className="flex flex-row">
            <p className="w-1/6">How many pieces?
            <Input/>
</p>
            <p className="">Fill in the dimension.
            <section className=' flex w-1/4'><Input placeholder='length'/></section>
            <section className='w-1/4'><Input placeholder='width'/></section>
            <section className='w-1/4'><Input placeholder='height'/></section>
            </p>
            <p className=""></p>
        </div>
      
      :null}
      <Checkbox onChange={handleChange}>Option</Checkbox>
    </div>
  )
}

export default checkbox
