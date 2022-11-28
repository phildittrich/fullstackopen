import { createSlice } from '@reduxjs/toolkit'

let timeout

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      const notification = action.payload
      return notification
    },
    clearNotification(state) {
      return ''
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, sec) => {
  return async dispatch => {
    dispatch(addNotification(notification))
    clearTimeout(timeout)
    timeout = setTimeout(() => { dispatch(clearNotification())}, sec * 1000)
  }

}
export default notificationSlice.reducer