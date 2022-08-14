import React, { useState } from 'react';
import styled from 'styled-components';
import { getMonth } from '../../util';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthIdx } from '../../redux/modules/calendarSlice';
import Month from './Month';

const Calendar = () => {
  const dispatch = useDispatch();
  const { monthIdx } = useSelector((state) => state.calendar);
  const [curMonth, setCurMonth] = useState(getMonth());

  return (
    <CalendarContainer>
      <h2>{monthIdx + 1}월</h2>
      <Month monthMatrix={curMonth} monthIdx={monthIdx} />
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 356px;
  padding: 15px 10px 30px 10px;
  background: #f3f3f3;
  text-align: center;
  h2 {
    margin: 1em 0;
    font-size: 1.2em;
    font-weight: 700;
  }
`;
