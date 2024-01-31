"use client";
import React, { useEffect , useState} from "react";

import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import ContactCard from "@/components/contactCard/page";

const page = () => {
  const [contactList, setContactList] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const {userDetails} = useSelector(state=>state.user)
  const fetchContacts = async()=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/contact?userId=`+userDetails._id )
    const data = await res.json()
    setContactList(data.contactList )
  }
  useEffect(()=>{
    fetchContacts()
  },[])

  const addNewContact = async(values)=> {
    values.userId = userDetails._id
 const res=  await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/contacts/`,{
       method: 'POST',
       headers: {'Content-Type':'application/json' },
       body: JSON.stringify(values)
     })
 if(res) fetchContacts()
     
    }
  const formik = useFormik({
    initialValues: selectedContact || {
      fullName: '',
      country: '',
      email: '',
      phoneNumber: ''
    },
    enableReinitialize: true,
    onSubmit: values => {
      addNewContact(values)
    },
  });

  
  return (
    <div> 
    {contactList.length>0 && contactList.map((item)=>{
      return  <ContactCard setSelectedContact={setSelectedContact} selectedContact={selectedContact} item={item}/>
    })}
      <form  className='p-2' onSubmit={formik.handleSubmit}>
      <section class="text-gray-600 body-font flex">
        <div class="ml-48 mr-48 mb-48 mt-20 py-24 bg-slate-50 shadow-2xl rounded-lg">
          <div class="flex flex-col text-center w-auto ">
            <h1 class="sm:text-3xl h-12 text-2xl font-medium title-font mb-4 text-gray-900">
              Add Contact
            </h1>
          </div>
          <div class="lg:w-1/1 md:w-2/3 mx-auto">
          <div class=" w-full">
                <div class="relative">
                  <label for="fullName" class="leading-7 text-sm text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    id="fullName"
                    name="fullName"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
         
              <div class=" w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Country
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    id="country"
                    name="country"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="phoneNumber" class="leading-7 text-sm text-gray-600">
                    Phonenumber
                  </label>
                  <input
                    type="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    id="phoneNumber"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
        
              <div class="p-2 w-full">
                <button class="flex mt-5 mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </form>
   
    </div>
  );
};

export default page;
