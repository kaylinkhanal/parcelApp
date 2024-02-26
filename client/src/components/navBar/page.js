"use client";
import React, { useEffect , useState} from "react";
import {
  Navbar,
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/reducerSlice/userSlice";
import { useRouter } from "next/navigation";

import { io } from 'socket.io-client';


const socket = io('http://localhost:5000');
const NotificationIcon = ({size, height, width, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill='currentColor'
        fillRule="evenodd"
      />
    </svg>
  );
};




export default function App() {
  const [newOrderList, setNewOrderList]= useState({})
  useEffect(()=>{
    socket.on('connection')

  },[])

  useEffect(()=>{
    const existingorders = {...newOrderList}
    socket.on('new order',(orderId)=>{
      const newOrder = {...existingorders, [orderId]:orderId }
      setNewOrderList(newOrder)
    })
  },[newOrderList])
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  const handleLogout = ()=>{
    dispatch(logout())
    router.push('/')
  }

  const handleRedirect = () =>{
    const path = isLoggedIn ? '/home' : '/'
    return path
  }

  const LoggedInDrop = () => {
    return (
      <div className="flex gap-10 items-center">
      <div className="flex gap-x-5 max-w-xl justify-center">
      <Badge content={Object.keys(newOrderList).length.toString()} shape="circle" color="danger">
      <Button
        radius="full"
        isIconOnly
        aria-label="more than 99 notifications"
        variant="light"
      >
        <NotificationIcon size={24} />
      </Button>
    </Badge>
      </div>
      <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
         <div>
          <Avatar
            isBordered
            id="avatar"
            key="avatar"
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{userDetails?.email}</p>
          </DropdownItem>
          <DropdownItem key="Profile"><Link href={"/profile"}>Profile</Link></DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
      </div>
    );
  };
  const AuthButtons = () => {
    return (
      <>
        <Button as={Link} href="/login">
          Login
        </Button>
        <Button as={Link} href="/register">
          Register
        </Button>
      </>
    );
  };
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
       <Link href={handleRedirect()}><NavbarBrand className="mr-4">
          <Image src="/parcellogo.png" width="80" height="90" />
          <p className="hidden sm:block font-bold text-inherit">Parcel App</p>
        </NavbarBrand></Link>
        {/* <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent> */}
      </NavbarContent>

      <NavbarContent as="div" className="flex items-center" justify="end">
        {isLoggedIn ? <LoggedInDrop /> : <AuthButtons />}
      </NavbarContent>
    </Navbar>
  );
}
