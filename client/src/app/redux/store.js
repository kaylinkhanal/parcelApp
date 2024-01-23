import { configureStore } from '@reduxjs/toolkit';
import { countSlice } from './reducerSlice/countSlice';
export default configureStore({
  reducer: {
    count: countSlice
  },
});
