import { createSlice } from '@reduxjs/toolkit';

export const countSlice = createSlice({
  name: 'count',
  initialState: {count: 0},
  reducers: {
    increment: (state, action) => {
      
    }
}});

export const { increment } = countSlice.actions;
export default countSlice.reducer;