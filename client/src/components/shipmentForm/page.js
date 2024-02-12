'use client'
import React from 'react'
import { FaFileAlt, FaBox } from "react-icons/fa";
import {setParcelImg} from '@/redux/reducerSlice/orderSlice'
import { useDispatch } from 'react-redux';
const ShipmentInfo = (props) => {
  const dispatch = useDispatch()
    const {selectedOption,
        setSelectedOption,
        parcelInput,
        setParcelInput,
        pieces,
        setPieces,
        weight,
        setWeight,
        unit,
        setUnit,
        chargeableWeight,
        } =props
    return (
      <div className="flex flex-col items-center justify-center">
        <form id="shipment" name="shipment">

        <h1 className="text-3xl mb-4">What is your shipment content?</h1>
        <div className="mb-4 flex">
          <div className="mr-4">
            <button
              className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center ${
                selectedOption === "documents" ? "bg-green-500" : ""
              }`}
              onClick={(e) => {
                e.preventDefault()
                setSelectedOption("documents")
            }}
            >
              <FaFileAlt className="w-6 h-6 mr-2" /> Document(s)
            </button>
          </div>
          <div>
            <button
              className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center ${
                selectedOption === "parcel" ? "bg-green-500" : ""
              }`}
              onClick={(e) =>{
                e.preventDefault()
                setSelectedOption("parcel")}}
            >
              <FaBox className="w-6 h-6 mr-2" /> Parcel
            </button>
          </div>
        </div>
        {selectedOption && (
          <div className="mb-4">
            <h2 className="text-xl">You have selected: {selectedOption}</h2>
            {selectedOption === "parcel" && (
              <div>
                <p>Please provide additional information for your parcel:</p>
                <input
                  type="text"
                  placeholder="What's inside parcel ?"
                  value={parcelInput}
                  onChange={(e) => {
                    e.preventDefault()
                    setParcelInput(e.target.value)}}
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
            onChange={(e) => {
                e.preventDefault()
                setPieces(Math.max(0, parseInt(e.target.value)))}}
            className="border rounded px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Total Gross Weight"
            value={weight}
            onChange={(e) =>{
                e.preventDefault()
                setWeight(Math.max(0, parseInt(e.target.value)))}}
            className="border rounded px-2 py-1 mr-2"
          />
          <select
            value={unit}
            onChange={(e) => {
                e.preventDefault()
                setUnit(e.target.value)}}
            className="border rounded px-2 py-1"
          >
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </div>
        <div className="mb-4">
          <p>
            Total Chargeable Weight: {chargeableWeight} {unit}
          </p>
        </div>
        <p>
          Upload:{" "}
          <input
            type="file"
            onChange={(e) =>{
                // e.preventDefault()
                dispatch(setParcelImg(e.target.files[0]))}}
          />
        </p>
        </form>
      </div>
    );
  };

export default ShipmentInfo