import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favUser: [],
}
export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favUser.push(action.payload)
    },
    removeFromFavorite: (state, action) => {

    },
}});

export const { addToFavorite, removeFromFavorite} = contactSlice.actions;
export default contactSlice.reducer;