import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: 30,
  height:30,
  backgroundColor: 'red'
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
}});

export const { changeWidth,changeBackgroundColor} = boxSlice.actions;
export default boxSlice.reducer;