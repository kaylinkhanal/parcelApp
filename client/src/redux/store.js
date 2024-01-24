import { configureStore } from '@reduxjs/toolkit';
import  boxReducer  from './reducerSlice/boxSlice';
export default configureStore({
  reducer: {
    box: boxReducer
  },
});
