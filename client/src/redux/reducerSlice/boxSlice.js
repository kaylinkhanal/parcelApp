import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  borderRadius:0,
  height:50,
  width:50,
  backgroundColor:'black'
}
export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    changeBg:(state,action)=>{
      state.backgroundColor = action.payload
    },
    makeCircle:(state,action)=>{
      state.borderRadius = 100
    }
}});

export const { increment,decrement,makeCircle,changeBg} = boxSlice.actions;
export default boxSlice.reducer;