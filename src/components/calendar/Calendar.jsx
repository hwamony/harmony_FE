import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMonth } from '../../util';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthIdx } from '../../redux/modules/calendarSlice';
import Month from './Month';
import { IconBack } from '../../assets/icons';

const Calendar = () => {
  const dispatch = useDispatch();
  const { selectedDate, monthIdx } = useSelector((state) => state.calendar);
  const [curMonthMatrix, setCurMonthMatrix] = useState(getMonth());

  useEffect(() => {
    setCurMonthMatrix(getMonth(monthIdx));
  }, [monthIdx]);

  return (
    <CalendarContainer>
      <header>
        {/* FIXME: 버튼 아이콘 수정 */}
        <button
          onClick={() => {
            dispatch(setMonthIdx(monthIdx - 1));
          }}
        >
          <IconBack />
        </button>
        <h2>{selectedDate.format('YYYY년 M월')}</h2>
        <button
          onClick={() => {
            dispatch(setMonthIdx(monthIdx + 1));
          }}
          className="next"
        >
          <IconBack />
        </button>
      </header>
      <Month monthMatrix={curMonthMatrix} />
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.article`
  position: fixed;
  top: 127px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 356px;
  padding: 15px 10px 30px 10px;
  background: #fafafa;
  text-align: center;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 11px 0 27px;
    h2 {
      font-size: 1em;
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
