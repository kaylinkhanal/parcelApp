import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: [],
  cartItems: []
}
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToWishList:(state,action)=>{
    
    }
}});

export const { addToWishList } = productSlice.actions;
export default productSlice.reducer;