"use client"
import { addShipmentDetails ,addDeliveryTiming} from '@/redux/reducerSlice/orderSlice'
import { Button } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import { FaFileAlt, FaBox } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import Contact from '@/app/contact/page'


const ShipmentDetails = () => {
  const {userDetails} = useSelector(state=>state.user)
  const [contactList, setContactList] = useState([])
  const fetchContacts = async()=>{
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/contacts?userId=`+userDetails._id )
    const data = await res.json()
    setContactList(data.contactList )
  }
  useEffect(()=>{
    fetchContacts()
  },[])
  const dispatch= useDispatch()
  const [selectedOption, setSelectedOption] = useState(null)
  const [pieces, setPieces] = useState('')
  const [parcelImg, setParcelImg] = useState(null)
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('kg')
  const [parcelInput, setParcelInput] = useState('')
const [step, setStep ] = useState(1)
  const handleOptionSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option)
  }

  const chargeableWeight = pieces > 0 && weight > 0 ? pieces * weight : 0
  const handleSave = ()=>{
    const shipmentDetails = {
      selectedOption,
      pieces,
      weight,
      unit,
      parcelInput,
      parcelImg
    }
    dispatch(addShipmentDetails(shipmentDetails))
    //dispatch and call dispatch(addShipmentDetails(shipmentDetails))
  }

  const handleBack = ()=>{
    setStep(step- 1)
  }

  const handleProceed = () => {
    if(step===1){
      handleSave()
    }
    setStep(step +1)
  }
  const ShipmentInfo = ()=>{
return (
  <div className="flex flex-col items-center justify-center ">
  <h1 className="text-3xl mb-4">What is your shipment content?</h1>
  <div className="mb-4 flex">
    <div className="mr-4">
      <button
        className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center ${
          selectedOption === 'documents' ? 'bg-green-500' : ''
        }`}
        onClick={() => handleOptionSelect('documents')}
      >
        <FaFileAlt className="w-6 h-6 mr-2" /> Document(s)
      </button>
    </div>
    <div>
      <button
        className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center ${
          selectedOption === 'parcel' ? 'bg-green-500' : ''
        }`}
        onClick={() => handleOptionSelect('parcel')}
      >
        <FaBox className="w-6 h-6 mr-2" /> Parcel
      </button>
    </div>
  </div>
  {selectedOption && (
    <div className="mb-4">
      <h2 className="text-xl">You have selected: {selectedOption}</h2>
      {selectedOption === 'parcel' && (
        <div>
          <p>Please provide additional information for your parcel:</p>
          <input
            type="text"
            placeholder="What's inside parcel ?"
            value={parcelInput}
            onChange={(e) => setParcelInput(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      )}
    </div>
  )}
  <div className="mb-4">
    <p>Help us calculate your shipment’s chargeable weight</p>
    <input
      type="number"
      placeholder="Number of Pieces"
      value={pieces}
      onChange={(e) => setPieces(Math.max(0, parseInt(e.target.value)))}
      className="border rounded px-2 py-1 mr-2"
    />
    <input
      type="number"
      placeholder="Total Gross Weight"
      value={weight}
      onChange={(e) => setWeight(Math.max(0, parseInt(e.target.value)))}
      className="border rounded px-2 py-1 mr-2"
    />
    <select
      value={unit}
      onChange={(e) => setUnit(e.target.value)}
      className="border rounded px-2 py-1"
    >
      <option value="kg">kg</option>
      <option value="lb">lb</option>
    </select>
  </div>
  <div className="mb-4">
    <p>Total Chargeable Weight: {chargeableWeight} {unit}</p>
  </div>
  <p>
    Upload: <input type="file" onChange={e=>setParcelImg(e.target.files[0])}/>
  </p>
</div>
)
  }
  const TimeContactPicker = () => (
    <Space direction="vertical" size={12}>
      <RangePicker showTime onChange={(_,dates)=> dispatch(addDeliveryTiming(dates))} />
      <Select 
        label="Pick receiver contact" 
        className="max-w-xs" 
      >
        {contactList?.map((item) => (
          <SelectItem key={item._id} value={item.fullName}>
            {item.fullName}
          </SelectItem>
        ))}
      </Select>
    </Space>
  );
  return (
    <div className='p-30 m-24'>
    {step == 1 && <ShipmentInfo/>}
    {step ==2 && <TimeContactPicker/>}
    <br/>
    <Button className='bg-orange-200 m-10' onClick={handleBack}>Back</Button>
    <Button className='bg-orange-200 m-10' onClick={handleProceed}>Proceed</Button>


    </div>
    
  )
}

export default ShipmentDetails