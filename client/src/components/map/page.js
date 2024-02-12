'use client'
import React, { useState } from 'react'
import { GoogleMap, Autocomplete, useJsApiLoader, Marker, MarkerF } from '@react-google-maps/api'
import styles from './styles.module.css'

import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { setStep, setSenderCoords, setReceiverCoords, setSenderAddr, setReceiverAddr } from '@/redux/reducerSlice/orderSlice'
import axios from 'axios'
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import priceMap from '../../../config/priceMap.json'
import { getDistance } from 'geolib';
const libraries = ["places"]
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

const LocationInput = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { pricePerUnitKm, basePrice, pricePerUnitKg } = priceMap
  const dispatch = useDispatch()
  const [senderSearchResult, setsenderSearchResult] = useState([])
  const [receiverSearchResult, setreceiverSearchResult] = useState([])
  const { step, shipmentDetails, senderCoords, receiverCoords, senderAddr, receiverAddr } = useSelector(state => state.order)

  //   const handlePlaceChange = () => {
  //     if (searchResult && typeof searchResult.getPlace === 'function') {
  //       debugger
  //         const placeInfo = searchResult?.getPlace();
  //         const { lat, lng } = placeInfo.geometry.location;
  //         dispatch(setSenderAddr(placeInfo.formatted_address));
  //         dispatch(setSenderCoords({lat: lat(),lng: lng() }));
  //     }else {console.log("error")}
  // };
  const handleSenderChange = () => {
    const placeInfo = senderSearchResult.getPlace();
    const { lat, lng } = placeInfo.geometry.location
    dispatch(setSenderAddr(placeInfo.formatted_address))
    dispatch(setSenderCoords({ lat: lat(), lng: lng() }))
  }

    const handleReceiverChange = () => {
      const placeInfo = receiverSearchResult.getPlace();
      const { lat, lng } = placeInfo.geometry.location
      dispatch(setReceiverAddr(placeInfo.formatted_address))
      dispatch(setReceiverCoords({ lat: lat(), lng: lng() }))

    }


    function senderOnLoad(autocomplete) {
      setsenderSearchResult(autocomplete);
    }
    function receiverOnLoad(autocomplete) {
      setreceiverSearchResult(autocomplete);
    }

    const distance = getDistance(
      { latitude: senderCoords.lat, longitude: senderCoords.lng },
      { latitude: receiverCoords.lat, longitude: receiverCoords.lng }
    ) / 1000
    const price = basePrice + pricePerUnitKm * (distance) + pricePerUnitKg * (shipmentDetails.weight * shipmentDetails.pieces)


    const confirmOrder = () => {
      onOpenChange()
    }
    return (
      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Confirm Order Details</ModalHeader>
                <ModalBody>
                  <p>
                    {JSON.stringify({ step, shipmentDetails, senderCoords, receiverCoords, senderAddr, receiverAddr })}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <div className="bg-white rounded-xl ">
          <Autocomplete onLoad={senderOnLoad} onPlaceChanged={() => handleSenderChange()}>
            <Input
              className='mt-2'
              classNames={{
                base: "max-w-full sm:max-w-[20rem] h-8 ",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-white",
              }}
              value={senderAddr}
              placeholder="Sender Address..."
              onChange={(e) => dispatch(setSenderAddr(e.target.value))}
              size="smS"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </Autocomplete>
          <Autocomplete onLoad={receiverOnLoad} onPlaceChanged={() => handleReceiverChange()}>
            <Input
              className='mt-4 '
              classNames={{
                base: "max-w-full sm:max-w-[20rem] h-8",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-white",
              }}
              value={receiverAddr}
              placeholder="Receiver Address..."
              onChange={(e) => dispatch(setReceiverAddr(e.target.value))}
              size="smS"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </Autocomplete>



          <div className='m-2 bg-white p-2' >
            Price is: NRs. {price}
          </div>


          <div className='m-2 bg-white p-2' >
            Distance is:  {distance} km
          </div>
          <div className="flex justify-center">
          <Button className={step < 3 ? 'bg-white mt-2' : 'bg-orange-300 my-2 mx-auto '} onClick={confirmOrder}>
            {step < 3 ? 'Proceed' : 'Confirm'}
          </Button><br />
          </div>
          
        </div>
      </div>
    )
  }

  const Map = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const dispatch = useDispatch()
    const { step, shipmentDetails, senderCoords, receiverCoords, senderAddrDetails, receiverAddrDetails } = useSelector(state => state.order)
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      libraries
    })
    const [open, setopen] = useState(false)
    const handleDiv = () => {
      setopen(!open)
      console.log(open)
    }

    const dragSender = async (e) => {
      setopen(true)
      const senderCoords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      const { data } = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEO_APIFY_KEY}`)
      const { formatted } = data.results[0]
      dispatch(setSenderAddr(formatted))
      dispatch(setSenderCoords(senderCoords))
    }

    const dragReceiver = async (e) => {
      setopen(true)
      const receiverCoords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      const { data } = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEO_APIFY_KEY}`)
      const { formatted } = data.results[0]
      dispatch(setReceiverAddr(formatted))
      dispatch(setReceiverCoords(receiverCoords))
    }

    if (loadError) {
      return <div>Map cannot be loaded right now, sorry.</div>
    } else if (isLoaded) {
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

          <Button onClick={() => dispatch(setStep(step - 1))} className='bg-white'><IoMdArrowRoundBack /></Button><br />
          <div className='h-2'>
            <Marker
              draggable={true}
              onDragEnd={dragSender}
              icon={{
                url: "/sender.png",
                scaledSize: { width: 70, height: 100 }
              }}
              position={senderCoords}
            />
          </div>

          <Marker
            draggable={true}
            icon={{
              url: "/receiver.png",
              scaledSize: { width: 70, height: 100 }
            }}
            onDragEnd={dragReceiver}
            position={receiverCoords}
          />
          {open ? <LocationInput /> : <Button className='mt-2' onClick={() => handleDiv()}>

            Search pickup/destinaton</Button>}

        </div>
      </GoogleMap>)
    }
  }
  export default Map