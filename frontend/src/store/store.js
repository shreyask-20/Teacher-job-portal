import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './NotificationSlice';

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});
