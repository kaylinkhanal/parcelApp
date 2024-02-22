"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/page";
import Image from "next/image";

import CustomTimeLine from "@/components/timeline/page";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
const orderStatusList = [
  {title:'pending', description:'Order is awaiting confirmation'},
  {title:'approved', description:'Order is confirmed'},
  {title:'pickedUp', description:'Picked it up from senders place'},
  {title:'dispatched', description:'Order has been sent for delivery'},
  {title:'delivered', description:'Order delivered to receiver'},
]
const page = ({ params }) => {
  const [orderDetails, setOrderDetails] = useState({});

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await res.json();
      setOrderDetails(data.ordersDetails); // Assuming the data structure matches
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  
  const statusId = orderStatusList.indexOf(orderDetails.status)

  const changeOrderStatus =async (status)=>{
    debugger;
   await axios.patch(`http://localhost:5000/orders/${params.id}`, {
      status
    })
    fetchOrderDetails()
  }

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <Layout>
      <div className="flex m-20">
      <div className="w-[50%]">
        <Image src={"http://localhost:5000/order-image/"+orderDetails.orderImage} width={100} height={100} alt="test"/>
        <h1 className="text-3xl font-bold mb-4">Order Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Sender Address:</h2>
            <p>{orderDetails?.senderAddr}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Receiver Address:</h2>
            <p>{orderDetails?.receiverAddr}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Shipment Details:</h2>
            <p>
              <strong>Shipment Content:</strong>{" "}
              {orderDetails?.shipmentDetails?.selectedOption}
            </p>
            <p>
              <strong>Pieces:</strong> {orderDetails?.shipmentDetails?.pieces}
            </p>
            <p>
              <strong>Weight:</strong> {orderDetails?.shipmentDetails?.weight}{" "}
              {orderDetails?.shipmentDetails?.unit}
            </p>
            <p>
              <strong>{orderDetails?.shipmentDetails?.selectedOption} Name:</strong>{" "}
              {orderDetails?.shipmentDetails?.parcelInput}
            </p>
          </div>
        </div>
      </div>
      <div className="m-20">
      <CustomTimeLine changeOrderStatus={changeOrderStatus} orderStatusList={orderStatusList} status={orderDetails?.status}/>

      </div>
     
      </div>
    </Layout>
  );
};

export default page;
