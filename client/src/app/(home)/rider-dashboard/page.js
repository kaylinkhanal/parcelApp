'use client'
import React from 'react'
import { MdContactPhone } from "react-icons/md";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
const page = () => {
const router = useRouter();

  return (
    <div className="flex flex-wrap -m-4 text-center">
                 <div
                onClick={() => router.push("/ongoing")}
                className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer"
              >
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <MdContactPhone className="ml-24" size={80} color="orangered" />
                  <h2 className="title-font font-medium text-3xl text-gray-900 m-2">
                   On Going Orders
                  </h2>
                  <p className="leading-relaxed">
                    All Pending Orders
                  </p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <Image
                    className="mx-24"
                    src="/history.png"
                    width="70"
                    height="80"
                  />
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
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <MdContactPhone className="ml-24" size={80} color="orangered" />
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