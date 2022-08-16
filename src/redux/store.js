import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './modules/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
