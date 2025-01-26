import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postInfo: localStorage.getItem('postInfo') ? JSON.parse(localStorage.getItem('postInfo')) : null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postInfo: (state, action) => {
      console.log(state);
      state.postInfo = action.payload
    }
  },
})

export const { postInfo } = postSlice.actions

export default postSlice.reducer