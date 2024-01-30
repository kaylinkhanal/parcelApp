'use client'
import React from 'react'
import Nav from '@/components/navBar/page'
import Layout from '@/components/layout/page'

import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement} from '@/redux/reducerSlice/countSlice'
import {chageColor,chageWidth,changeToCircle} from '@/redux/reducerSlice/boxSlice'
const page = () => {
  const {count} = useSelector(state=>state.count)
  const {width, height ,backgroundColor,borderRadius} = useSelector(state=>state.box)
  const dispatch = useDispatch();
  // 'Normal function call it increment()'
  // 'Redux function  dispatch and call it dispatch(increment())'
  const generateArea = () => {
    let area;
    if (borderRadius) {
      const radius = width / 2
      area = Math.PI * (radius ** 2)
    } else {
      area = width * height
    }
    return area.toFixed(2)
  }

  return (
    <div>
      <Layout>
        <div
          style={{width, height,backgroundColor,borderRadius}}
        >
          
        </div>
        area: {parseFloat(generateArea())}
        <input placeholder='color' onChange={(e)=>dispatch(chageColor(e.target.value))}/>
        <button onClick={()=>dispatch(changeToCircle())}>Change to {borderRadius ? 'rectangle': 'circle'}</button>
      
      </Layout>
   
     
      </div>
  )
}

export default page