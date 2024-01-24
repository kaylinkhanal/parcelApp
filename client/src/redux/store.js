import { configureStore } from '@reduxjs/toolkit';
import  countReducer  from './reducerSlice/countSlice';
import  boxReducer  from './reducerSlice/boxSlice';
export default configureStore({
  reducer: {
    count: countReducer,
    count: countReducer,
    box: boxReducer
  },
});