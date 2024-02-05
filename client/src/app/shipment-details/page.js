"use client";
import {
  addShipmentDetails,
  addDeliveryTiming,
  setStep
} from "@/redux/reducerSlice/orderSlice";
import Layout from "@/components/layout/page";
import React, { useState, useEffect } from "react";
import Map from '@/components/map/page'
import {
  Select,
  SelectSection,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaFileAlt, FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import {Contact} from "@/app/contact/page";
import axios from 'axios';
const ShipmentDetails = () => {
  const { userDetails } = useSelector((state) => state.user);
  const { step } = useSelector((state) => state.order);
  const [contactList, setContactList] = useState([]);
  const fetchContacts = async () => {
    const {data} = await axios.get(
      `http://localhost:${process.env.NEXT_PUBLIC_API_URL}/contacts?userId=` +
        userDetails._id
    );
    setContactList(data.contactList);
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [pieces, setPieces] = useState("");
  const [parcelImg, setParcelImg] = useState(null);
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [parcelInput, setParcelInput] = useState("");
 
  const handleOptionSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const chargeableWeight = pieces > 0 && weight > 0 ? pieces * weight : 0;
  const handleSave = () => {
    const shipmentDetails = {
      selectedOption,
      pieces,
      weight,
      unit,
      parcelInput,
      parcelImg,
    };
    dispatch(addShipmentDetails(shipmentDetails));
    //dispatch and call dispatch(addShipmentDetails(shipmentDetails))
  };

  const handleBack = () => {
    dispatch(setStep(step - 1));
  };

  const handleProceed = () => {
    if (step === 1) {
      handleSave();
    }
    dispatch(setStep(step + 1));
  };
  const ShipmentInfo = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">What is your shipment content?</h1>
        <div className="mb-4 flex">
          <div className="mr-4">
            <button
              className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center ${
                selectedOption === "documents" ? "bg-green-500" : ""
              }`}
              onClick={() => handleOptionSelect("documents")}
            >
              <FaFileAlt className="w-6 h-6 mr-2" /> Document(s)
            </button>
          </div>
          <div>
            <button
              className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center ${
                selectedOption === "parcel" ? "bg-green-500" : ""
              }`}
              onClick={() => handleOptionSelect("parcel")}
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
          <p>
            Total Chargeable Weight: {chargeableWeight} {unit}
          </p>
        </div>
        <p>
          Upload:{" "}
          <input
            type="file"
            onChange={(e) => setParcelImg(e.target.files[0])}
          />
        </p>
      </div>
    );
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const TimeContactPicker = () => (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-xl mb-7">Receiver Details</h1>
      <div className="bg-gray-50 w-lg flex justify-center p-10 border rounded-lg">
        <Space direction="vertical" size={12}>
          <div className="grid m-2">
            <label className="font-medium text-gray-600 mb-2">
              Select Date
            </label>
            <RangePicker
              showTime
              onChange={(_, dates) => dispatch(addDeliveryTiming(dates))}
            />
          </div>
          <label className="font-medium text-gray-600 mb-2">Receiver</label>
          <div className="flex grid-cols-2 gap-3 items-center">
            <Select variant="bordered" label="Pick receiver contact" className="max-w-xs">
              {contactList?.map((item) => (
                <SelectItem key={item._id} value={item.fullName}>
                  {item.fullName}
                </SelectItem>
              ))}
            </Select>

            <div className="flex flex-col gap-2">
              <Button color="warning" onPress={onOpen} className="font-semibold text-gray-100 max-w-fit">
              Add
              </Button>

              <Modal
                backdrops="blur"
                isOpen={isOpen}
                placement="center"
                onOpenChange={onOpenChange}
              >
                <ModalContent value="center">
                  {(onClose) => (
                    <>
                      <Contact fetchContacts={fetchContacts} formOnly={true} onOpenChange={onOpenChange}/>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </Space>
      </div>
    </div>
  );
  return (
    <div>
      {step == 3 ? (
        <Map/>
      ): (
        <Layout>
        <div>
          {step == 1 && <ShipmentInfo />}
          {step == 2 && <TimeContactPicker />}
          <br />
          <div className="flex items-center justify-center ">
            <Button className="bg-orange-200 m-10" onClick={handleBack}>
              Back
            </Button>
            <Button className="bg-orange-200 m-10" onClick={handleProceed}>
              Proceed
            </Button>
          </div>
        </div>
      </Layout>
      )}
    
    </div>
  );
};

export default ShipmentDetails;
