import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onSelect: false,
  onSelectAll: false,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setOnSelect: (state, action) => {
      state.onSelect = action.payload;
      console.log('setOnSelect 작동', action.payload);
    },
    setOnSelectAll: (state, action) => {
      state.onSelectAll = action.payload;
      console.log('setOnSelectAll 작동', action.payload);
    },
  },
});

export const { setOnSelect, setOnSelectAll } = gallerySlice.actions;

export default gallerySlice.reducer;
