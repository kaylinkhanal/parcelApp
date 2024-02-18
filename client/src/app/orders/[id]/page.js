import React from 'react'

const page = ({params}) => {
    //http://localhost:5000/orders/65cd854542aeb0296d503833
    //fetch details of particular id and display below
  return (
    <div>{params.id}</div>
  )
}

export default page