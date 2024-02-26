"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Autocomplete,
  useJsApiLoader,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import styles from "./styles.module.css";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  setSenderCoords,
  setReceiverCoords,
  setSenderAddr,
  setReceiverAddr,
} from "@/redux/reducerSlice/orderSlice";
import axios from "axios";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { io } from 'socket.io-client';


const socket = io('http://localhost:5000');
import priceMap from "../../../config/priceMap.json";
import { getDistance } from "geolib";
const libraries = ["places"];
export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

const LocationInput = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { pricePerUnitKm, basePrice, pricePerUnitKg } = priceMap;
  const dispatch = useDispatch();
  const [senderSearchResult, setsenderSearchResult] = useState([]);
  const [receiverSearchResult, setreceiverSearchResult] = useState([]);
  const {userDetails} = useSelector(state=>state.user)
  const {
    step,
    receiverId,
    orderImage,
    shipmentDetails,
    deliveryTiming,
    senderCoords,
    receiverCoords,
    senderAddr,
    receiverAddr,
  } = useSelector((state) => state.order);

  //   const handlePlaceChange = () => {
  //     if (searchResult && typeof searchResult.getPlace === 'function') {
  //       debugger
  //         const placeInfo = searchResult?.getPlace();
  //         const { lat, lng } = placeInfo.geometry.location;
  //         dispatch(setSenderAddr(placeInfo.formatted_address));
  //         dispatch(setSenderCoords({lat: lat(),lng: lng() }));
  //     }else {console.log("error")}
  // };

  // to get the users current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const senderCoords = { lat: latitude, lng: longitude };
          // setting reeiver coordinates near to sender coordinates
          const receiverCoords = {
            lat: latitude + 0.005,
            lng: longitude + 0.005,
          };
          dispatch(setSenderCoords(senderCoords));
          dispatch(setReceiverCoords(receiverCoords));
        },
        (error) => {
          alert("Error getting user's location:", error);
          // set to default coordinates
          handleErrorCoordinates();
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      handleErrorCoordinates();
    }
  };

  const handleErrorCoordinates = () => {
    const defaultSenderCoords = { lat: 27.7, lng: 85.3 };
    const defaultReceiverCoords = { lat: 27.705, lng: 85.305 };
    dispatch(setSenderCoords(defaultSenderCoords));
    dispatch(setReceiverCoords(defaultReceiverCoords));
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSenderChange = () => {
    const placeInfo = senderSearchResult.getPlace();
    const { lat, lng } = placeInfo.geometry.location;
    console.log(placeInfo);
    dispatch(setSenderAddr(placeInfo.name || placeInfo.formatted_address));
    dispatch(setSenderCoords({ lat: lat(), lng: lng() }));
  };

  const handleReceiverChange = () => {
    const placeInfo = receiverSearchResult.getPlace();
    const { lat, lng } = placeInfo.geometry.location;
    dispatch(setReceiverAddr(placeInfo.name || placeInfo.formatted_address));
    dispatch(setReceiverCoords({ lat: lat(), lng: lng() }));
  };

  function senderOnLoad(autocomplete) {
    setsenderSearchResult(autocomplete);
  }
  function receiverOnLoad(autocomplete) {
    setreceiverSearchResult(autocomplete);
  }

  const receiverLat = receiverCoords?.lat;
  const receiverLng = receiverCoords?.lng;

  const distance = receiverLat
    ? (
        getDistance(
          { latitude: senderCoords.lat, longitude: senderCoords.lng },
          { latitude: receiverLat, longitude: receiverLng }
        ) / 1000
      ).toFixed(2)
    : 0;
  const price = receiverLng
    ? Math.round(
        basePrice +
          pricePerUnitKm * distance +
          pricePerUnitKg * (shipmentDetails.weight * shipmentDetails.pieces)
      )
    : 0;

  const confirmOrder = () => {
    onOpenChange();
  };

  const finalConfirmation = async () => {
    const formData = new FormData();
    const orderDetails = {
      step,
      receiverId,
      orderImage,
      shipmentDetails: JSON.stringify(shipmentDetails),
      deliveryTiming: JSON.stringify(deliveryTiming),
      senderCoords: JSON.stringify(senderCoords),
      receiverCoords: JSON.stringify(receiverCoords),
      senderAddr,
      receiverAddr,
      senderId: userDetails._id,
      orderPrice: price
    };

    for (let item in orderDetails) {
      formData.append(item, orderDetails[item]);
    }

    const res = await fetch(
      `http://localhost:${process.env.NEXT_PUBLIC_API_URL}/orders/`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data =await res.json()
    socket.emit('orders', data)
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Order Details
              </ModalHeader>
              <ModalBody>
                <div className="container mx-auto ">
                  <div className="section mb-2">
                    <h2 className="section-title text-lg font-semibold mb-2">
                      Shipment Details
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-base font-semibold">Item type:</p>
                        <p className="text-base">
                          {shipmentDetails.selectedOption}
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-semibold">Pieces:</p>
                        <p className="text-base">{shipmentDetails.pieces}</p>
                      </div>
                      <div>
                        <p className="text-base font-semibold">Weight:</p>
                        <p className="text-base">
                          {shipmentDetails.weight} {shipmentDetails.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="section mb-2">
                    <h2 className="section-title text-lg font-semibold mb-2">
                      Addresses & Dates
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-base font-semibold">
                          Sender address:
                        </p>
                        <p className="text-base">{senderAddr}</p>
                      </div>
                      <div>
                        <p className="text-base font-semibold">
                          Receiver address:
                        </p>
                        <p className="text-base">{receiverAddr}</p>
                      </div>
                      <div>
                        <p className="text-base font-semibold">Pickup date:</p>
                        <p className="text-base">{deliveryTiming.pickupDate}</p>
                      </div>
                      <div>
                        <p className="text-base font-semibold">
                          Delivery date:
                        </p>
                        <p className="text-base">
                          {deliveryTiming.deliveryDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="section">
                    <h2 className="section-title text-lg font-semibold mb-2">
                      Charges & Distance
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-base font-semibold">Total charge:</p>
                        <p className="text-base">NPR. {price}</p>
                      </div>
                      <div>
                        <p className="text-base font-semibold">
                          Total distance:
                        </p>
                        <p className="text-base">{distance} KM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={finalConfirmation}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="bg-white rounded-xl ">
        <Autocomplete
          onLoad={senderOnLoad}
          onPlaceChanged={() => handleSenderChange()}
        >
          <Input
            className="mt-2"
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-8 ",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-white",
            }}
            value={senderAddr}
            placeholder="Sender Address..."
            onChange={(e) => dispatch(setSenderAddr(e.target.value))}
            size="smS"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </Autocomplete>
        <Autocomplete
          onLoad={receiverOnLoad}
          onPlaceChanged={() => handleReceiverChange()}
        >
          <Input
            className="mt-4 "
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-8",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-white",
            }}
            value={receiverAddr}
            placeholder="Receiver Address..."
            onChange={(e) => dispatch(setReceiverAddr(e.target.value))}
            size="smS"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </Autocomplete>

        <div className="m-2 bg-white p-2">Price is: NRs. {price}</div>

        <div className="m-2 bg-white p-2">Distance is: {distance} km</div>
        <div className="flex justify-center">
          <Button
            className={
              step < 3 ? "bg-white mt-2" : "bg-orange-300 my-2 mx-auto "
            }
            onClick={confirmOrder}
          >
            {step < 3 ? "Proceed" : "Confirm"}
          </Button>
          <br />
        </div>
      </div>
    </div>
  );
};

const Map = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();
  const {
    step,
    shipmentDetails,
    senderCoords,
    receiverCoords,
    senderAddrDetails,
    receiverAddrDetails,
  } = useSelector((state) => state.order);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });
  const [open, setopen] = useState(false);
  const handleDiv = () => {
    setopen(!open);
    console.log(open);
  };

  const dragSender = async (e) => {
    setopen(true);
    const senderCoords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&format=json&apiKey=${
        process.env.NEXT_PUBLIC_GEO_APIFY_KEY
      }`
    );
    const { formatted } = data.results[0];
    dispatch(setSenderAddr(formatted));
    dispatch(setSenderCoords(senderCoords));
  };

  const dragReceiver = async (e) => {
    setopen(true);
    const receiverCoords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&format=json&apiKey=${
        process.env.NEXT_PUBLIC_GEO_APIFY_KEY
      }`
    );
    const { formatted } = data.results[0];
    dispatch(setReceiverAddr(formatted));
    dispatch(setReceiverCoords(receiverCoords));
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  } else if (isLoaded) {
    return (
      <GoogleMap
        mapContainerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        zoom={13}
        center={{
          lat: 27.700769,
          lng: 85.30014,
        }}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        <div className={styles.map}>
          <Button
            onClick={() => dispatch(setStep(step - 1))}
            className="bg-white"
          >
            <IoMdArrowRoundBack />
          </Button>
          <br />
          <div className="h-2">
            <Marker
              draggable={true}
              onDragEnd={dragSender}
              icon={{
                url: "/sender.png",
                scaledSize: { width: 70, height: 100 },
              }}
              position={senderCoords}
            />
          </div>

          <Marker
            draggable={true}
            icon={{
              url: "/Receiver.png",
              scaledSize: { width: 70, height: 100 },
            }}
            onDragEnd={dragReceiver}
            position={receiverCoords}
          />
          {open ? (
            <LocationInput />
          ) : (
            <Button className="mt-2" onClick={() => handleDiv()}>
              Search pickup/destinaton
            </Button>
          )}
        </div>
      </GoogleMap>
    );
  }
};
export default Map;
