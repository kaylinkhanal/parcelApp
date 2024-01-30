import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shipmentDetails : {},
  locationDetails: {}
}
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addShipmentDetails: (state, action) => {
      state.shipmentDetails= action.payload
    },
}});

export const { addShipmentDetails } = orderSlice.actions;
export default orderSlice.reducer;