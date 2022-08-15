import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { getMonth } from '../../util';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMonthIdx,
  handlePrevMonth,
  handleNextMonth,
} from '../../redux/modules/calendarSlice';
import Month from './Month';
import { IconBack } from '../../assets/icons';

const Calendar = () => {
  const dispatch = useDispatch();
  const { monthIdx } = useSelector((state) => state.calendar);
  const [curMonth, setCurMonth] = useState(getMonth());

  useEffect(() => {
    setCurMonth(getMonth(monthIdx));
  }, [monthIdx]);

  return (
    <CalendarContainer>
      <header>
        <button onClick={() => dispatch(handlePrevMonth())}>
          <IconBack />
        </button>
        <h2>
          {dayjs(new Date(dayjs().year(), monthIdx)).format('YYYY년 M월')}
        </h2>
        <button onClick={() => dispatch(handleNextMonth())} className="next">
          <IconBack />
        </button>
      </header>
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
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      margin: 1em 0;
      font-size: 1.2em;
      font-weight: 700;
    }
    button {
      height: 30px;
      padding: 5px 10px;
      border-radius: 10px;
      &.next svg {
        transform: rotate(180deg);
      }
    }
  }
`;
