"use client";
import React from "react";
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
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/reducerSlice/userSlice";
import { useRouter } from "next/navigation";

export default function App() {
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
      <Link href={'/home'} className="font-semibold dark:to-gray-200 hover:text-orange-300">Home</Link>
      <Link href={'/shipment-details'} className="font-semibold dark:to-gray-200 hover:text-orange-300">Shipment</Link>
      <Link href={'#'} className="font-semibold dark:to-gray-200 hover:text-orange-300">Track</Link>
      <Link href={'/contact'} className="font-semibold dark:to-gray-200 hover:text-orange-300">Contact</Link>
      </div>
      <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
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
