import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  selectedDate: dayjs(),
  monthIdx: dayjs().month(),
  selectedDay: null,
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
      if (action.payload) {
        state.selectedDay =
          state.selectedDay === action.payload ? null : action.payload;
        state.selectedDate = dayjs(
          new Date(dayjs().year(), state.monthIdx, action.payload),
        );
      } else {
        state.selectedDay = null;
      }
    },
  },
});

export const { setMonthIdx, setDay } = calendarSlice.actions;

export default calendarSlice.reducer;
