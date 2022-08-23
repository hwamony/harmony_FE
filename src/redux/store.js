import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './modules/calendarSlice';
import galleryReducer from './modules/gallerySlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    gallery: galleryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
