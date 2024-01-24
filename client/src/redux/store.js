import { configureStore } from '@reduxjs/toolkit';
import  countReducer  from './reducerSlice/countSlice';
export default configureStore({
  reducer: {
    count: countReducer
  },
});
