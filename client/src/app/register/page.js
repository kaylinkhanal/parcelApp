'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Input,Button} from "@nextui-org/react";
import styles from './styles.module.css'
import {  toast } from 'react-toastify';
import Layout from '@/components/layout/page'
import { useRouter } from 'next/navigation'
import {RadioGroup, Radio} from "@nextui-org/react";

const SignupForm = () => {
  const router = useRouter()

   const SignupSchema = Yup.object().shape({
     email: Yup.string().email('Invalid email').required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
 });
 
 const registerUser = async(values)=> {
 const res=  await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/register/`,{
    method: 'POST',
    headers: {'Content-Type':'application/json' },
    body: JSON.stringify(values)
  })
  const data = await res.json()
  if(res.status == 200) {
    router.push('/login')
  }
  toast(data.msg)
  
 }
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      email: '',
      password: '',
      role:''
    },
    validationSchema:SignupSchema,
    onSubmit: values => {
      registerUser(values)
    },
  });

  return (
       <Layout>
    <div className=" flex items-center justify-center">
    <form  className={styles.formfields} onSubmit={formik.handleSubmit}>
      <h2 className='text-xl m-6 font-extrabold subpixel-antialiased text-orange-500'>Create new Account</h2>
      <div className="">

     
      <Input 
       id="phoneNumber"
       label="PhoneNumber"
       name="phoneNumber"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.phoneNumber}
       className='m-2'
      />
        {formik?.errors.phoneNumber}
      <Input 
       id="email"
       name="email"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.email}
      label="Email" 
      className='m-2'
      />
              {formik?.errors.email}
         <Input 
       id="password"
       name="password"
       type="password"
       onChange={formik.handleChange}
       value={formik.values.password}
      label="Password" 
      className='m-2'
      />
        <RadioGroup
        className='m-2 '
      label="Select your Role:"
      color='warning'
      onValueChange={formik.handleChange('role')}
                     value={formik.values.role}
    >
      <Radio value="user">User</Radio>
      <Radio value="rider">Rider</Radio>
    </RadioGroup>
      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
        submit
      </Button>
      </div>
    </form>
    </div>
  </Layout>
   
  );
};

export default SignupForm
