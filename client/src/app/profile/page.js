'use client'
import React ,{ useState }from 'react'
import { useSelector } from 'react-redux'
import Nav from '@/components/navBar/page'
import { Avatar ,Divider ,Button} from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Descriptions } from 'antd';
import { CiEdit } from "react-icons/ci";
import {  Col,  Drawer, Form, Input, Row,  Space } from 'antd'

const page = () => {
  const { userDetails } = useSelector(state => state.user)

  const items = [
    {
      key: '1',
      span:2,
      label: 'Full Name',
      children: userDetails.fullName,
    },
    {
      key: '2',
      label: 'Email',
      children: userDetails.email,
    },
    {
      key: '3',
      span:2,
      label: 'Phone No.',
      children: userDetails.phoneNumber,
    },
    {
      key: '4',
      label: 'Address',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
    {
      key: '5',
      label: 'Role',
      children: userDetails.role,
    },
  ];

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
    console.log('hi')
  };
  const onClose = () => {
    setOpen(false);
  };

  const EditForm =()=>{
    return(<Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your name',
                  },
                ]}
              >
                <Input placeholder="Please enter your name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Email"
                label="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter email',
                  },
                ]}
              >
                <Input placeholder="Please enter your email" />
              </Form.Item>
            </Col>
            
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Phone No"
                label="phoenNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please select ur phone no',
                  },
                ]}
              >
                <Input placeholder="Please select ur phone no">
                </Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Address"
                label="address"
                rules={[
                  {
                    required: true,
                    message: 'Please provide ur address',
                  },
                ]}
              >
                <Input placeholder="Please enter your address" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>)
  }

  return (
    <div className='w-screen h-screen bg-zinc-300' >
      <Nav />
      <div className="flex justify-end p-4">
        <Button onClick={showDrawer}><CiEdit />edit</Button>
        <EditForm/>
      </div>
      <div className="flex flex-col items-center ">
        <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="m-3 w-28 h-28 text-large " />
        <div className="">
          <section className="ml-12">
            <section className='text-2xl'><b>{userDetails.fullName} i have no full name</b></section>
            <section className='text-m ml-4'>Member since.......</section>
          </section>
        </div>
        <Divider className="my-4  " />
      </div>
      <div className="flex felx-col box g-4 items-center justify-center">
        <section className="">
          <Card className='m-3'>
            <CardBody>
              <p><b>TOTAL SHIPMENTS</b></p><br /><p>7</p>
            </CardBody>
          </Card>
        </section>
        <section className="">
          <Card className='items-center m-3 '>
            <CardBody>
              <section><b>ON PROGRESS SHIPMENTS</b></section>
              <section>7</section>
            </CardBody>
          </Card>
        </section>
        <section className="">
          <Card className='items-center m-3 '>
            <CardBody>
              <p><b>REWARD POINTS</b></p>
              <section>777</section>
            </CardBody>
          </Card>
        </section>
      </div>
      <div className="body pl-32 ml-32 m-10">
              <Descriptions title="User Info:" bordered items={items} />
      </div>
    </div>
  )
}

export default page