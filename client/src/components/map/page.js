'use client'
import React , { useState} from 'react'
import { GoogleMap, useJsApiLoader ,Marker} from '@react-google-maps/api'
import styles from './styles.module.css'
import { Button, Input } from '@nextui-org/react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { setStep, setSenderCoords, setReceiverCoords, setSenderAddrDetails, setReceiverAddrDetails } from '@/redux/reducerSlice/orderSlice'
import axios from 'axios'

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);


const Map=()=> {
  
  const dispatch = useDispatch()
  const {step, senderCoords, receiverCoords} =useSelector(state=> state.order)
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  })
  const [open, setopen] = useState(false)
  const handleDiv=()=>{
    setopen(!open)
    console.log(open)
  }

  const dragSender = async(e)=>{
    const senderCoords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    const {data} = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEO_APIFY_KEY}`)
    const {city, country, formatted} = data.results[0]
    dispatch(setSenderAddrDetails({city, country,formatted}))
    dispatch(setSenderCoords(senderCoords))
  }

  const dragReceiver =async(e)=>{
    const receiverCoords ={
     lat: e.latLng.lat(),
     lng: e.latLng.lng()
    }
    const {data} = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEO_APIFY_KEY}`)
    const {city, country, formatted} = data.results[0]
    dispatch(setReceiverAddrDetails({city, country,formatted}))
    dispatch(setReceiverCoords(receiverCoords))
  }
  const LocationInput =()=>{
    return(
      <div>
        <Input
        className='mt-2'
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-white",
          }}
          placeholder="Search pickup..."
          size="smS"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Input
        className='mt-2'
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-white",
          }}
          placeholder="Search destination..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Button className='bg-white mt-2' onClick={()=>handleDiv()}>Proceed</Button><br/>
      </div>
    )
  }
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }else if(isLoaded){
    return (<GoogleMap
        mapContainerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          zoom={13}
          center={{
            lat: 27.700769,
            lng: 85.300140
          }}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            
          }}
    >
        <div className={styles.map}>
        <Button onClick={()=> dispatch(setStep(step-1))} className='bg-white'><IoMdArrowRoundBack /></Button><br/>
          <div className='h-2'>
          <Marker
          draggable={true}
          onDragEnd={dragSender}
          icon={{
            url: "/Sender.png",
            scaledSize: new window.google.maps.Size(30,45)
          }}
          position={senderCoords}
        />
          </div>
       
        <Marker
          draggable={true}
          onDragEnd	= {dragReceiver}
          icon={{
            url: "/Receiver.png",
            scaledSize: new window.google.maps.Size(30,45)
          }}
          position={receiverCoords}
        />
        {open ?<LocationInput/>:<Button className='mt-2' onClick={()=>handleDiv()}>Search pickup/destinaton</Button>}
        
        </div>
    </GoogleMap>)
  }
}
export default Map