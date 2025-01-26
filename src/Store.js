import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './Slices/userSlice'
import  chatSlice  from './Slices/chatSlice'
import  postSlice  from './Slices/postSlice'

export const store = configureStore({
  reducer: {
    userDetails : userSlice,
    chatDetails : chatSlice,
    postDetails : postSlice
  },
})