'use client '
import React, { useEffect } from 'react'
import CustomTimeLine from '@/components/timeline/page';
import Layout from '@/components/layout/page'


const orderStatusList = [
    {title:'pending', description:'Order is awaiting confirmation'},
    {title:'approved', description:'Order is confirmed'},
    {title:'pickedUp', description:'Picked it up from senders place'},
    {title:'dispatched', description:'Order has been sent for delivery'},
    {title:'delivered', description:'Order delivered to receiver'},
  ]


const page = () => {
    // const [orderDetails, setOrderDetails] = useState(null );

    const fetchOrderDetails = async (orderId) => {
        try {
          const res = await fetch(
            `http://localhost:${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`
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
        
        fetchOrderDetails()
       
      }, [])
      

  return (
    <div>
      <Layout>
          <CustomTimeLine  orderStatusList={orderStatusList} status={orderDetails?.status}/>
      </Layout>

    </div>
  )
}

export default page
