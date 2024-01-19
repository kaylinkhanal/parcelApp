'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Input} from "@nextui-org/react";
import styles from './styles.module.css'
import {  toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
const SignupForm = () => {
  const router = useRouter()

   const SignupSchema = Yup.object().shape({
     email: Yup.string().email('Invalid email').required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
 });
 
 const registerUser = async(values)=> {
 const res=  await fetch('http://localhost:5000/register/',{
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
    <form  className={styles.formfields} onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">phoneNumber</label>
      <Input 
       id="phoneNumber"
       name="phoneNumber"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.phoneNumber}
      label="phoneNumber" />
        {formik?.errors.phoneNumber}
      <Input 
       id="email"
       name="email"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.email}
      label="email" />
              {formik?.errors.email}
         <Input 
       id="password"
       name="password"
       type="password"
       onChange={formik.handleChange}
       value={formik.values.password}
      label="password" />
          <Input 
       id="role"
       name="role"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.role}
      label="role" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm
