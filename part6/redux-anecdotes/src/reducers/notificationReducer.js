import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return state = notification
    },
    clearNotification(state) {
      return state = ''
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer