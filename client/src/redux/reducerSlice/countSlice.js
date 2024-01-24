import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width:10,
  height:10,
  backgroundColor:'red',
  borderRadius:0
}
export const countSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    increaseWidth: (state, action) => {
      state.width++
    },
    increaseHeight: (state, action) => {
      state.height++
    },
    color: (state, action) => {
      state.backgroundColor = action.payload
    },
    radius:(state,action) =>{
      state.borderRadius = action.payload
    }
}});

export const { increaseWidth, increaseHeight, color,radius} = countSlice.actions;
export default countSlice.reducer;