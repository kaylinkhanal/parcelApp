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
  const { isLoggedIn } = useSelector((state) => state.user);
  const handleLogout = ()=>{
    dispatch(logout())
    router.push('/')
  }
  const LoggedInDrop = () => {
    return (
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
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem onClick={()=>router.push('/profile')} key="Profile">Profile</DropdownItem>
          <DropdownItem key="team_settings">Account Settings</DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">Log Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
        <NavbarBrand className="mr-4">
          <Image src="/parcellogo.png" width="80" height="90" />
          <p  className="hidden sm:block font-bold text-inherit m-2"><Link href='/'>Parcel App</Link></p>
          <p  className="hidden sm:block font-bold text-inherit m-2"><Link href='/home'>Dashboard</Link></p>
        </NavbarBrand>
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

      <NavbarContent as="div" className="items-center" justify="end">
        {isLoggedIn ? <LoggedInDrop /> : <AuthButtons />}
      </NavbarContent>
    </Navbar>
  );
}
