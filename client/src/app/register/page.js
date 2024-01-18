'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Input} from "@nextui-org/react";
const SignupForm = () => {
   const SignupSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Required'),
 });
 
 const registerUser = async(values)=> {
  await fetch('http://localhost:5000/register/',{
    method: 'POST',
    headers: {'Content-Type':'application/json' },
    body: JSON.stringify(values)
  })
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
    <form onSubmit={formik.handleSubmit}>
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
