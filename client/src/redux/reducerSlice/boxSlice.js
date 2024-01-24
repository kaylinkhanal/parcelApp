import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: 50,
  height: 50,
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
    changeShape: (state, action) => {
      state.borderRadius = 50
     }
}});

export const { changeWidth, changeBackgroundColor,changeShape} = boxSlice.actions;
export default boxSlice.reducer;