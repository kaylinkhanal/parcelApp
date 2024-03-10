import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await '`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/login/`'
    return response.data
  },
)


const initialState = {
  entities: [],
  loading: 'idle',
} 
// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = 'fulfilled'
    }),
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = 'rejected'
    })
  },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))