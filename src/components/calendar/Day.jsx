import React from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setDay } from '../../redux/modules/calendarSlice';

const Day = ({ day, weekIdx }) => {
  const dispatch = useDispatch();
  const { monthIdx, selectedDay } = useSelector((state) => state.calendar);

  return (
    <>
      <DayBox>
        <h3
          onClick={() =>
            monthIdx % 12 === day.month() && dispatch(setDay(day.format('DD')))
          }
          className={cn(
            monthIdx % 12 !== day.month() ? 'other' : 'this',
            day.format('YY-MM-DD') === dayjs().format('YY-MM-DD') && 'today',
            selectedDay === day.format('DD') && 'selected',
          )}
        >
          {day.format('D')}
        </h3>
      </DayBox>
    </>
  );
};

export default Day;

const DayBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    user-select: none;
    &.other {
      color: #b4b4b4;
    }
    &.this {
      cursor: pointer;
    }
    &.today {
      background: #000;
      color: #fff;
      font-weight: 700;
    }
    &.selected:not(.other) {
      background: #dfdfdf;
    }
  }
`;
