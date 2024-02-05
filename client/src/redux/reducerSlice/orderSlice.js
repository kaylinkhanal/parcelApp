import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shipmentDetails : {},
  locationDetails: {},
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

export const { addShipmentDetails,addDeliveryTiming,setStep } = orderSlice.actions;
export default orderSlice.reducer;