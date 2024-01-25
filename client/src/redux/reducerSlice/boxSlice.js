import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: 30,
  height:30,
  backgroundColor: 'red',
  borderRadius: 0
}
export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    changeWidth: (state, action) => {
      state.width++
    },
    changeBackgroundColor: (state, action) => {
     state.backgroundColor  = action.payload
    },
    changeToCircler: (state, action) => {
     state.borderRadius = '50%'
    },
}});

export const { changeWidth,changeBackgroundColor, borderRadius} = boxSlice.actions;
export default boxSlice.reducer;