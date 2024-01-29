import React from 'react'
// import { Image } from '@nextui-org/react'
import { IoDocumentSharp } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
const page = () => {
  return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-60 py-60 mx-auto">
                    <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">What is your shipment content?</h1>
                    </div>
                    <div className="flex flex-wrap -m-4 text-center">
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-col items-center">
                                <IoDocumentSharp style={{ width: 70, height: 80, color: 'orange' }} />
                                <h2 className="title-font font-medium text-3xl text-gray-900 m-2">Document</h2>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-col items-center">
                                <FaBox style={{ width: 70, height: 80, color: 'orange' }} />
                                <h2 className="title-font font-medium text-3xl text-gray-900 m-2">Parcel</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container  px-60 py-30  mx-auto">
                        <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Help us calcuate your shipment’s chargeable weight
                        </h1>
                        </div>
                    
                    <div className="p-4 w-full p-50 cursor-pointer border-2 border-gray-200">
                        <div className="flex flex-wrap">
                            <div className='label-pieces mx-10'>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Number of Pieces
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    </div>
                                    <input
                                    type="text"
                                    name="weight"
                                    id="pieces"
                                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="1"
                                    />
                                
                                </div>
                            </div>
                            <div className='label-weight'>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Total gross weight
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    </div>
                                    <input
                                    type="text"
                                    name="weight"
                                    id="weight"
                                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="0.5"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                    <label htmlFor="weight" className="sr-only">
                                        weight
                                    </label>
                                    <select
                                        id="weight"
                                        name="weight"
                                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    >
                                        <option>kg</option>
                                        <option>lb</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                        
                    
                </div>
            </section>
        </div>
  )
}

export default page
