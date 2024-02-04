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
        <button className="">...</button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="hide">Hide</DropdownItem>
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
