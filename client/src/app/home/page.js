<<<<<<< HEAD
import React from 'react'
import { Image } from '@nextui-org/react'
import Checkbox from './checkbox'
=======
"use client";
import React from "react";
import { MdContactPhone } from "react-icons/md";
import { Image } from "@nextui-org/react";
import Layout from "@/components/layout/page";
import { useRouter } from "next/navigation";

>>>>>>> 83889fd154cfb02eaa30fe8ac41731c315439928
const page = () => {
  const router = useRouter();
  return (
    <div>
<<<<<<< HEAD
      <Checkbox/>
      <section className="text-gray-600 body-font">
  <div className="container px-60 py-60 mx-auto">
    
    <div className="flex flex-wrap -m-4 text-center">
      <div className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <Image className='mx-24' src="/shipment.png" width="70" height="80"/>
          <h2 className="title-font font-medium text-3xl text-gray-900 m-2">Create New Shipment</h2>
          <p className="leading-relaxed">Ship your products easily with ParcelApp.</p>
        </div>
      </div>
      <div className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <Image className='mx-24' src="/track.png" width="80" height="90"/>
          <h2 className="title-font font-medium text-3xl text-gray-900 m-2">Trace your order
          </h2>
          <p className="leading-relaxed">Get Details about the product.</p>
        </div>
      </div>
      <div className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <Image className='mx-24' src="/history.png" width="70" height="80"/>
          <h2 className="title-font font-medium text-3xl text-gray-900 m-2">Order History</h2>
          <p className="leading-relaxed">Browse all your Shipment logs.</p>
        </div>
      </div>
=======
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="container px-340 py-48 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div
                onClick={() => router.push("/shipment-details")}
                className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer"
              >
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <Image
                    className="mx-24"
                    src="/shipment.png"
                    width="70"
                    height="80"
                  />
                  <h2 className="title-font font-medium text-3xl text-gray-900 m-2">
                    Create New Shipment
                  </h2>
                  <p className="leading-relaxed">
                    Ship your products easily with ParcelApp.
                  </p>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <Image
                    className="mx-24"
                    src="/track.png"
                    width="80"
                    height="90"
                  />
                  <h2 className="title-font font-medium text-3xl text-gray-900 m-2">
                    Trace your order
                  </h2>
                  <p className="leading-relaxed">
                    Get Details about the product.
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
                onClick={() => router.push("/contact")}
                className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer"
              >
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <MdContactPhone className="ml-24" size={80} color="orangered" />
                  <h2 className="title-font font-medium text-3xl text-gray-900 m-2">
                    Add Contact
                  </h2>
                  <p className="leading-relaxed">
                    Create your new contact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
>>>>>>> 83889fd154cfb02eaa30fe8ac41731c315439928
    </div>
  );
};

export default page;
