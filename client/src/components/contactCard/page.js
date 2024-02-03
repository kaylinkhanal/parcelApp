'use client'
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function ContactCard(props) {
  return (
    <Link onClick={()=>props.setSelectedContact(props.item)}>
 <Card className={ props.selectedContact?._id == props.item?._id ? "m-5 max-w-[400px] bg-orange-300 text-gray-600" : "m-5 max-w-[400px]"}>
      <CardHeader className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-md">{props.item.fullName}</p>
          <p className="text-small text-default-500">{props.item.phoneNumber}</p>
        </div>
        <div className="flex cursor-pointer place-items-start">
        <Dropdown>
      <DropdownTrigger>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example" 
        onAction={(key) => alert(key)}
      >
        <DropdownItem key="edit">Edit</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>{props.item.email}</p>
      </CardBody>
      <Divider/>

    </Card>
    </Link>
   
  );
}
