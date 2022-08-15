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
    handlePrevMonth: (state) => {
      state.monthIdx -= 1;
    },
    handleNextMonth: (state) => {
      state.monthIdx += 1;
    },
  },
});

export const { setMonthIdx, handlePrevMonth, handleNextMonth } =
  calendarSlice.actions;

export default calendarSlice.reducer;
