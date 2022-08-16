import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  selectedDate: dayjs(),
  monthIdx: dayjs().month(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonthIdx: (state, action) => {
      state.monthIdx = action.payload;
      state.selectedDate = dayjs(new Date(dayjs().year(), action.payload));
    },
    setDay: (state, action) => {
      state.selectedDate = dayjs(new Date(dayjs().year(), state.monthIdx, action.payload));
    },
    handlePrevMonth: (state) => {
      state.monthIdx -= 1;
    },
    handleNextMonth: (state) => {
      state.monthIdx += 1;
    },
  },
});

export const { setMonthIdx, setDay, handlePrevMonth, handleNextMonth } =
  calendarSlice.actions;

export default calendarSlice.reducer;
