'use client'
import React from 'react'
import { gql, useQuery } from '@apollo/client';
const GET_USERS = gql`{
   users{
    email
    id
  }
}`
const page = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default page