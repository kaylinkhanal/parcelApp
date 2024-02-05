'use client'
import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useDispatch } from 'react-redux'
import {addToFavorite} from '@/redux/reducerSlice/contactSlice'
const page = ({params}) => {
  const dispatch = useDispatch()
  const [contactDetails, setContactDetails] = useState({})
  const fetchContactDetails = async()=> {
   const {data} = await axios.get('http://localhost:5000/contacts/'+params.id)
    setContactDetails(data.contactList)
  }
 useEffect(()=>{
  fetchContactDetails()
},[])

const handleAdd=()=>{
  dispatch(addToFavorite(contactDetails))
}
  return (
    <div>
      {JSON.stringify(contactDetails)}
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  )
}

export default page