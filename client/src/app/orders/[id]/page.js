"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/page";
import Image from "next/image";
import CustomTimeLine from "@/components/timeline/page";

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

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Image src="http://localhost:5000/orders/1707795476040download.jpeg" width={30} height={30} alt="test"/>
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
          <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Status:</h2>
            <p>{orderDetails?.status}</p>
            
          </div>
        </div>
        <CustomTimeLine status={orderDetails?.status}/>
      </div>
    </Layout>
  );
};

export default page;
