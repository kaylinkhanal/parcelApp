'use client'
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Input,Button} from "@nextui-org/react";
import { addUserDetails, loginUser } from '@/redux/reducerSlice/userSlice';
import {  toast } from 'react-toastify';
import Layout from '@/components/layout/page'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';

const SignInForm = () => {
  const router = useRouter()
  const dispatch =useDispatch()
   const SignInSchema = Yup.object().shape({
   phoneNumber: Yup.string().required('Required'),
 });
 

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
    },
    validationSchema:SignInSchema,
    onSubmit: values => {
      dispatch(loginUser(values)).then((role)=>{
        if(role == 'rider') router.push('/rider-dashboard')
        else router.push('/home')
      })
    },
  });

  return (
    <Layout>
    <form  className='p-24' onSubmit={formik.handleSubmit}>
      <h2>Sign In</h2>
      <Input 
       id="phoneNumber"
       label="phoneNumber"
       name="phoneNumber"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.phoneNumber}
      />
        {formik?.errors.phoneNumber}
         <Input 
       id="password"
       name="password"
       type="password"
       onChange={formik.handleChange}
       value={formik.values.password}
      label="password" />
      <Button type="submit">Submit</Button>
    </form>
  </Layout>
  );
};

export default SignInForm
