import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getMonth from '../../utils/getMonth';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthIdx } from '../../redux/modules/calendarSlice';
import Month from './Month';
import { IconBack } from '../../assets/icons';

const Calendar = ({ schedules }) => {
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
      <Month monthMatrix={curMonthMatrix} schedules={schedules} />
    </CalendarContainer>
  );
};

Calendar.propTypes = {
  schedules: PropTypes.array,
};

export default Calendar;

const CalendarContainer = styled.article`
  position: sticky;
  display: flex;
  flex-direction: column;
  height: 347px;
  padding: 10px 10px 20px;
  margin: 0 -20px;
  background: #fafafa;
  text-align: center;
  z-index: 20;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 11px 0 18px;
    h2 {
      font-size: 1em;
      font-weight: 700;
      user-select: none;
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
