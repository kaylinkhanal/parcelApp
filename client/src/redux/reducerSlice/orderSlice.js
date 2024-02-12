import { createSlice } from "@reduxjs/toolkit";

// const defaultNationCords = {
//   lat: 27.700769,
//   lng: 85.30014,
// };
const initialState = {
  shipmentDetails: {},
  senderAddr: "",
  receiverAddr: "",
  receiverCoords: defaultNationCords,
  senderCoords: {
    // lat: 27.800769,
    // lng: 85.20014,
  },
  deliveryTiming: {},
  step: 1,
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addShipmentDetails: (state, action) => {
      return {
        ...state,
        shipmentDetails: action.payload,
      };
    },
    setStep: (state, action) => {
      return {
        ...state,
        step: action.payload,
      };
    },
    setSenderCoords: (state, action) => {
      return {
        ...state,
        senderCoords: action.payload,
      };
    },
    setReceiverCoords: (state, action) => {
      return {
        ...state,
        receiverCoords: action.payload,
      };
    },
    setSenderAddr: (state, action) => {
      return {
        ...state,
        senderAddr: action.payload,
      };
    },
    setReceiverAddr: (state, action) => {
      return {
        ...state,
        receiverAddr: action.payload,
      };
    },
    addDeliveryTiming: (state, action) => {
      return {
        ...state,
        deliveryTiming: {
          pickupDate: action.payload[0],
          deliveryDate: action.payload[1],
        },
      };
    },
  },
});

export const {
  addShipmentDetails,
  addDeliveryTiming,
  setStep,
  setSenderCoords,
  setReceiverCoords,
  setSenderAddr,
  setReceiverAddr,
} = orderSlice.actions;
export default orderSlice.reducer;
