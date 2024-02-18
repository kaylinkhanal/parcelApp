'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from "@/components/layout/page";
import { useSelector } from 'react-redux';


const page = () => {
  const [orders, setOrders] = useState([])
  const fetchPendingOrders = async () => {
    const { data } = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/orders`);
    setOrders(data.orders)
  }
  useEffect(() => {
    fetchPendingOrders()
  }, [])

  const {deliveryTiming} = useSelector((state) => state.order)

  const PendingList = (props) => {
    return (
      <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
        <td className="size-px whitespace-nowrap align-top">
          <div className="block p-6">
            <div className="flex items-center gap-x-4">
              <div>
                <span className="block text-sm capitalize font-semibold text-gray-800 dark:text-gray-200">{props.items.shipmentDetails.selectedOption}</span>
              </div>
            </div>
          </div>
        </td>
        <td className="size-px whitespace-nowrap align-top">
          <div className="block p-6">
            <div className="flex items-center gap-x-3">
              <div className="grow">
                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Name</span>
                <span className="block text-sm text-gray-500">email@.com</span>
              </div>
            </div>
          </div>
        </td>
        <td className="size-px whitespace-nowrap align-top">
          <div className="block p-6">
            <div className="flex items-center gap-x-3">
              <div className="grow">
                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">9876543210</span>
              </div>
            </div>
          </div>
        </td>
        <td className="h-px w-20 min-w-20 align-top whitespace-nowrap">
          <div className="block p-6">
            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.items.senderAddr}</span>
            <span className="block text-sm text-gray-500">Nepal</span>
          </div>
        </td>
        <td className="h-px w-20 whitespace-nowrap min-w-20 align-top">
          <div className="block p-6">
            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{props.items.receiverAddr}</span>
            <span className="block text-sm text-gray-500">Nepal</span>
          </div>
        </td>

        <td className="size-px whitespace-nowrap align-top">
          <div className="block p-6">
            <span className="text-sm text-gray-600 dark:text-gray-400">{deliveryTiming.deliveryDate}</span>
          </div>
        </td>
        <td className="size-px whitespace-nowrap align-top">
          <div className="block p-6">
          <span
            className={`py-1 px-1.5 inline-flex capitalize items-center gap-x-1 text-xs font-medium rounded-full dark:text-teal-500 ${
                props.items.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                props.items.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-green-100 text-green-800'
            }`}
        >
            {props.items.status === 'pending' && (
                <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            )}
            {props.items.status === 'cancelled' && (
                <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            )}
            {props.items.status !== 'pending' && props.items.status !== 'cancelled' && (
                <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            )}
            {props.items.status}
        </span>
          </div>
        </td>
      </tr>
    )
  }
return (
  <Layout>
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <h1 className="text-lg font-bold flex justify-center mb-10">Pending Orders</h1>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">


              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Product
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Receiver Name
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Phone Number
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          From
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          To
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Date and Time
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Status
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.length > 0 && orders.map((items) => {
                  return <PendingList key={items.id} items={items} />
                })}
                </tbody>

              </table>

              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{orders.length}</span> results
                  </p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                      Prev
                    </button>

                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      Next
                      <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)
}

export default page