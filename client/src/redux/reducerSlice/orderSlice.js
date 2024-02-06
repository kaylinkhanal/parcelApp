import { createSlice } from '@reduxjs/toolkit';

const defaultNationCords = {
  lat: 27.700769,
  lng: 85.300140
}
const initialState = {
  shipmentDetails : {},
  senderAddrDetails: {},
  receiverAddrDetails: {},
  receiverCoords:defaultNationCords,
  senderCoords: defaultNationCords,
  deliveryTiming: {},
  step: 1
}
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addShipmentDetails: (state, action) => {
      return {
        ...state,
        shipmentDetails: action.payload
      }
    },
    setStep: (state, action) => {
      return {
        ...state,
        step: action.payload
      }
    },
    setReceiverCoords: (state, action) => {
      return {
        ...state,
        receiverCoords: action.payload
      }
    },
    addDeliveryTiming: (state, action) => {
        return {
          ...state,
          deliveryTiming:{
            pickupDate: action.payload[0],
            deliveryDate: action.payload[1]
          }
        }
    },
}});

export const { addShipmentDetails,addDeliveryTiming,setStep,setReceiverCoords } = orderSlice.actions;
export default orderSlice.reducer;