'use client'
import React, {useState} from "react";
import {Checkbox} from "@nextui-org/react";

export default function App() {
    const [detailsOpen, setDetailsOpen ] = useState(false)
  
               
  return (
  <>
    <Checkbox onChange={()=> setDetailsOpen(!detailsOpen)}  checked={detailsOpen} >Option</Checkbox>
    {detailsOpen ? (

        <div>
            <input/><br/>
            <input/><br/>
            <input/><br/>
            <input/>

        </div>
    ): null}
  </>
  );
}
