"use client";
import {
  addShipmentDetails,
  addDeliveryTiming,
  setStep,
  setSelectedReceiverId
} from "@/redux/reducerSlice/orderSlice";
import Layout from "@/components/layout/page";
import React, { useState, useEffect } from "react";
import Map from '@/components/map/page'
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';
import ShipmentInfo from '@/components/shipmentForm/page'
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

import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import {Contact} from "@/app/contact/page";
import axios from 'axios';


const TimeContactPicker = (props) => {
  const dispatch= useDispatch()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {contactList,fetchContacts } = props
    const {deliveryTiming} = useSelector((state) => state.order)
   
    console.log('rrr',deliveryTiming)
  return(
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
            defaultValue={dispatch[dayjs(deliveryTiming?.pickupDate, 'YYYY-MM-DD'),dayjs(deliveryTiming?.deliveryDate, 'YYYY-MM-DD')]} 
            onChange={(_, dates) => dispatch(addDeliveryTiming(dates))}
          />
        </div>
        <label className="font-medium text-gray-600 mb-2">Receiver</label>
        <div className="flex grid-cols-2 gap-3 items-center">
          <Select variant="bordered" label="Pick receiver contact" className="max-w-xs">
            {contactList?.map((item) => (
              <SelectItem onClick={()=>dispatch(setSelectedReceiverId(item._id))} key={item._id} value={item.fullName}>
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
)}

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

    // setSelectedOption(option === selectedOption ? null : option);
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


  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      {step == 3 ? (
        <Map/>
      ): (
        <Layout>
        <div>
          {step == 1 && <ShipmentInfo 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          parcelInput={parcelInput}
          setParcelInput={setParcelInput}
          pieces={pieces}
          setPieces={setPieces}
          weight={weight}
          setWeight={setWeight}
          unit={unit}
          chargeableWeight={chargeableWeight}
          setUnit={setUnit}
          setParcelImg={setParcelImg}
          />}
          {step == 2 && <TimeContactPicker  contactList={contactList} onOpen={onOpen} onOpenChange={onOpenChange} fetchContacts={fetchContacts}/>}
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
