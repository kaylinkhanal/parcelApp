import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  userDetails:{},
  token:'',
  isLoggedIn: false,
  readNotificationCount: false,
  lastReadDate: null,
  isLoading: false,
  error: null,
}


// export const loginUser = createAsyncThunk(
//   'user/addUserDetails',
//   async () => {
//     const res = await axios('http://localhost:5000/login')
//     const data = await res.data
//     return data
//   }
// )

export const loginUser = (values) => {
  return async function(dispatch, getState) {
    const {data, statusText} = await axios.post('http://localhost:5000/login',values)
    if(statusText=== 'OK')  dispatch({type: 'user/addUserDetails', payload: data })
    return data?.userDetails?.role
  }
};
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
},
// extraReducers: (builder) => {
//   builder.addCase(loginUser.pending, (state) => {
//     state.isLoading = true
//   })
//   builder.addCase(loginUser.fulfilled, (state, action) => {
//     state.isLoading = false
//     state.contents = action.payload
//   })
//   builder.addCase(loginUser.rejected, (state, action) => {
//     state.isLoading = false
//     state.error = action.error.message
//   })
// },
});

export const { addUserDetails,logout,login,setReadNotificationsCount,setLastReadDate } = userSlice.actions;
export default userSlice.reducer;