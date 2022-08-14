import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  monthIdx: dayjs().month(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonthIdx: (state, action) => {
      state.monthIdx = action.payload;
    },
  },
});

export const { setMonthIdx } = calendarSlice.actions;
export default calendarSlice.reducer;
