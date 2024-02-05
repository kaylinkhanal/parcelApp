'use client'
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import styles from './styles.module.css'
import { Input } from '@nextui-org/react'
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
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  })

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
    >
        <div className={styles.map}>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-white",
          }}
          placeholder="Search pickup..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        </div>
    </GoogleMap>)
  }
}
export default Map