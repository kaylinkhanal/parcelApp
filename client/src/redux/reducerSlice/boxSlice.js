import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  borderRadius: 0,
  height:30,
  backgroundColor: 'red'
}
export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    changeBorderRadius: (state, action) => {
      state.borderRadius++
    },
    changeBackgroundColor: (state, action) => {
      state.backgroundColor  = action.payload
    }
}});

export const { changeBorderRadius, changeBackgroundColor } = boxSlice.actions;
export default boxSlice.reducer;