import { configureStore } from '@reduxjs/toolkit';
import  countReducer  from './reducerSlice/countSlice';
import  boxReducer  from './reducerSlice/boxSlice';
import  userReducer  from './reducerSlice/userSlice';
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    count: countReducer,
    box: boxReducer,
    user: userReducer
  },
  middleware: ()=>[logger]
});
