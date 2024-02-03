"use client";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,Input, user} from "@nextui-org/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  toast } from 'react-toastify';



const Form =(props)=>{

const {userDetails,onClose}= props

  const FormSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
    confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});

const changePassword = async(values)=> {
  console.log("frontEnd",userDetails)
  const res=  await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/change-password/${userDetails._id}`,{
     method: 'POST',
     headers: {'Content-Type':'application/json' },
     body: JSON.stringify(values)
   })
   const data = await res.json()
   if(res.status !== 200) {
    return toast.warning(data.msg)
   }
   
   onClose()
    toast.success(data.msg)

   
  }

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema:FormSchema,
    onSubmit: values => {
      changePassword(values)
    },
  });
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
                    <Input 
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.oldPassword}
                  label="Current password"
                  className="mb-3" />
                  {formik?.errors.oldPassword}
                    <Input 
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  label="New password" 
                  className="mb-3"/>
                  {formik?.errors.newPassword}
                    <Input 
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmNewPassword}
                  label="Confirm new password" 
                  className="mb-3" />
                  {formik?.errors.confirmNewPassword}
                  <div className="float-right">
                  <Button color="danger" variant="light"  onPress={onClose}>
                  Close
                  </Button>
                  <Button type="submit">Change</Button>
                  </div>
        </form>
    </>
  )
}
const page = () => {
  const { userDetails } = useSelector((state) => state.user);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    
    <div>
      <div className="main flex mx-auto h-[100vh] justify-center items-center  ">
        <div className="flex   rounded-2xl ">
          <div className="left bg-gray-300 w-[51vh] h-[51vh] rounded-s-2xl  shadow-purple-700  ">
            <div className="left.2 text-purple-800 rounded-tl-lg rounded-bl-lg p-12 items-center justify-center flex flex-col ">
              <img
                src="/history.png"
                alt="Profile"
                className="w-32 h-1/6 mx-auto my-5 cursor-pointer"
              />
              <h5 className="User Name text-lg font-semibold cursor-pointer">
                User Name
              </h5>

              <div className="choose-remove  flex mt-16  space-x-0 justify-center items-center text-xs text-white font-semibold bg-[#e68d52] rounded-xl">
                <button className=" h-11 w-max p-4 rounded-s-xl text-center flex items-center">
                  Choose Progfile
                </button>
                <div className="h-9 border-l border-gray-900"></div>

                <button className=" h-11 w-max p-4 rounded-e-xl text-center flex items-center">
                  Remove Profile
                </button>
              </div>
            </div>
          </div>

          <div className="right bg-[#e68d52] w-[51vh] h-[51vh] text-white rounded-e-2xl shadow ">
            <div className="px-8 pt-10">
              <div className="info ">
                <h6 className="text-2xl font-semibold items-center text-purple-950">
                  Information
                </h6>
                <hr className="mt-2 mb-6" />
              </div>

              <div className="emai-phon flex flex-row space-x-16">
                <div className="email">
                  <h6 className="text-lg font-semibold">Email</h6>
                  <p>{userDetails?.email}</p>
                </div>
              </div>
              <div className="emai-phon flex flex-row space-x-16">
                <div className="email">
                  <h6 className="text-lg font-semibold">Phone Number</h6>
                  <p>{userDetails?.phoneNumber}</p>
                </div>
              </div>
              <div className="emai-phon flex flex-row space-x-16">
                <div className="email">
                  <h6 className="text-lg font-semibold">Role</h6>
                  <p>{userDetails?.role}</p>
                </div>
              </div>

              <hr className="mt-2 mb-6" />

              <div className="emai-phon flex flex-row space-x-16 pb-4"></div>
              <Button onPress={onOpen} className="  float-right  text-center text-purple-950 font-bold  hover:bg-gray-400">
                Change Password
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Change Password</ModalHeader>
                      <ModalBody>
                        <Form onClose={onClose} userDetails={userDetails}/>
                      </ModalBody>
                
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
