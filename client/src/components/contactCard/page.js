'use client'
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function ContactCard(props) {
  return (
    <Link onClick={()=>props.setSelectedContact(props.item)}>
 <Card className={ props.selectedContact?._id == props.item?._id ? "m-12 max-w-[400px] bg-orange-500" : "m-12 max-w-[400px]"}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{props.item.fullName}</p>
          <p className="text-small text-default-500">{props.item.phoneNumber}</p>
          <button>...</button>
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
