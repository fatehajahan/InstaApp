import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: (() => {
    const chatInfo = localStorage.getItem('chatInfo');
    return chatInfo && chatInfo !== "undefined" ? JSON.parse(chatInfo) : 0;
  })(),
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    chatInfo: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { chatInfo } = chatSlice.actions

export default chatSlice.reducer