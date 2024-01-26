import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from './reducerSlice/userSlice';
import  logger  from 'redux-logger';
export default configureStore({
  reducer: {
    user: userReducer
  },
  middleware: ()=>[logger]
});
