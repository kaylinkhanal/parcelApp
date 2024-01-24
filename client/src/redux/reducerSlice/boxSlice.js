import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: 30,
  height: 30,
  backgroundColor: 'red'

}
export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    chageWidth: (state, action) => {
      state.width++
    },
    chageColor: (state, action) => {
       state.backgroundColor = action.payload
    },
}});

export const { chageWidth,chageColor } = boxSlice.actions;
export default boxSlice.reducer;