import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './modules/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export default store;
