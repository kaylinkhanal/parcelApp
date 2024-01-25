import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: 30,
  height: 30,
  backgroundColor: 'red',
  borderRadius: 0
}
export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    changeSize: (state, action) => {
      state.width++
      state.height++
    },
    dechangeSize: (state, action) => {
      state.width--
      state.height--
    },
    changeBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    changeToCircle: (state, action) => {
      if (state.borderRadius === '50%') {
        state.borderRadius = 0
      } else {
        state.borderRadius = '50%'
      }
    }

  }
});


export const { changeSize, dechangeSize, changeBackgroundColor, changeToCircle } = boxSlice.actions;
export default boxSlice.reducer;