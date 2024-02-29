import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails:{},
  token:'',
  isLoggedIn: false,
  readNotificationCount: false,
  lastReadDate: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetails:(state,action)=>{
      const {userDetails,token}=action.payload
      return {
        ...state,
        userDetails,
        token,
        isLoggedIn: true,
        readNotification: userDetails.hasReadNotifications
      }
    },
    logout:(state,action)=>{
     return {
      ...initialState
     }
    },
    setLastReadDate: (state,action)=>{
      state.lastReadDate = action.payload
     },
    setReadNotificationsCount: (state,action)=>{
      state.readNotificationCount = action.payload
    }
}});

export const { addUserDetails,logout,setReadNotificationsCount,setLastReadDate } = userSlice.actions;
export default userSlice.reducer;