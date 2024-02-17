'use client'
import React from 'react'
import { Ri24HoursLine } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import { LiaHourglassHalfSolid } from "react-icons/lia";

import { useRouter } from "next/navigation";
const page = () => {
const router = useRouter();

  return (
    <div className="flex text-center justify-center">
                 <div
                onClick={() => router.push("/ongoing")}
                className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer"
              >
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg hover:bg-orange-100">
                  <FaTruckFast className="mx-auto" size={80} color="orangered" />
                  <h2 className="title-font font-medium text-3xl text-gray-900 m-2">
                   On Going Orders
                  </h2>
                  <p className="leading-relaxed">
                    All Pending Orders
                  </p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg hover:bg-orange-100">
                <Ri24HoursLine className="mx-auto" size={80} color="orangered"  />
                  <h2 className="title-font font-medium text-3xl text-gray-900 m-2">
                    Order History
                  </h2>
                  <p className="leading-relaxed">
                    Browse all your Shipment logs.
                  </p>
                </div>
              </div>
              <div
                onClick={() => router.push("/orders/pending")}
                className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer"
              >
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg hover:bg-orange-100">
                  <LiaHourglassHalfSolid className="mx-auto" size={80} color="orangered" />
                  <h2 className="title-font font-medium text-3xl text-gray-900 m-2">
                   Pending Orders
                  </h2>
                  <p className="leading-relaxed">
                    All Pending Orders
                  </p>
                </div>
              </div>
    </div>
  )
}

export default page