import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width:30,
  height:30,
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
      if (state.borderRadius==='50%'){
        state.borderRadius=0
      }else state.borderRadius='50%'
    }
}});

export const { increaseWidth, increaseHeight, color,radius} = countSlice.actions;
export default countSlice.reducer;