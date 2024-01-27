import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  borderRadius: 0,
  width: 30,
  height:30,
  backgroundColor: 'red'
}
export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    changeBorderRadius: (state, action) => {
      if(state.borderRadius === '50%'){
        state.borderRadius =0
      } else{
        state.borderRadius = '50%'
      }
    },
    changeBackgroundColor: (state, action) => {
      state.backgroundColor  = action.payload
    }
}});

export const { changeBorderRadius, changeBackgroundColor } = boxSlice.actions;
export default boxSlice.reducer;