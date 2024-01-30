import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  width: 150,
  height: 150,
  backgroundColor: 'red',
  borderRadius : 0,

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
    changeToCircle: (state, action) => {
      if(state.borderRadius === '50%'){
        state.borderRadius = 0
      }else{
        state.borderRadius = '50%'
      }
   },
}});

export const { chageWidth,chageColor ,changeToCircle} = boxSlice.actions;
export default boxSlice.reducer;