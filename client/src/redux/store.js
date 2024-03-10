import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import  userReducer  from './reducerSlice/userSlice';
import  orderReducer  from './reducerSlice/orderSlice';
import  logger  from 'redux-logger';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user']
};
const reducer = combineReducers({
  user: userReducer,
  order:orderReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware: ()=>[thunk]
});

export const persistor = persistStore(store);
