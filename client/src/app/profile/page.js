"use client";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import URI from "@/config/api";
import axios from 'axios'

const page = () => {
  const { userDetails } = useSelector((state) => state.user);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const handleChange = async()=>{
  await  axios.post(`${URI}/change-password/${userDetails._id}`, {
      oldPassword: '2222',
      newPassword: '2232'
    })
  }
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
                  Choose Profile
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
                  <p>{userDetails.email}</p>
                </div>
              </div>
              <div className="emai-phon flex flex-row space-x-16">
                <div className="email">
                  <h6 className="text-lg font-semibold">Phone Number</h6>
                  <p>{userDetails.phoneNumber}</p>
                </div>
              </div>
              <div className="emai-phon flex flex-row space-x-16">
                <div className="email">
                  <h6 className="text-lg font-semibold">Role</h6>
                  <p>{userDetails.role}</p>
                </div>
              </div>

              <hr className="mt-2 mb-6" />

              <div className="emai-phon flex flex-row space-x-16 pb-4"></div>
              <Button  onClick={onOpen} className=" w-24 ml-[31vh]  text-center text-purple-950 font-bold  hover:bg-gray-400">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
 
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
                <button onClick={handleChange}>Submit</button>
              </ModalBody>
             
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default page;
