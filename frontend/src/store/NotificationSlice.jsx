// store/NotificationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],    // all notifications (read + unread)
  unread: [],  // only unread notifications
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.list = action.payload;
      
    },
   
    addUnreadNotification: (state, action) => {
      state.unread.push(action.payload);
      // state.list.push(action.payload); // Add it to the full notifications list as well
    },
    removeReadNotification: (state, action) => {
      const id = action.payload;
      // remove from unread
      state.unread = state.unread.filter(notification => notification._id !== id);
      // mark as read in list
      state.list = state.list.map(notification =>
        notification._id === id ? { ...notification, isRead: true } : notification
      );
    },
    
  },
});

export const { setNotifications, addUnreadNotification, removeReadNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
