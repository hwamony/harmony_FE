import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setDay } from '../../redux/modules/calendarSlice';

const Day = ({ day, dailySchedule }) => {
  const dispatch = useDispatch();
  const { monthIdx, selectedDay } = useSelector((state) => state.calendar);

  useEffect(() => {
    console.log(`${day.format('DD')}일의 일정은`, dailySchedule);
  }, []);

  /* TODO:
  dailySchedule에서 3개까지 달력에 표시해야 하니까 .slice(0, 3)로 자르고,
  .map 돌면서 div에 val attribute로 category를 전달해서 div 배경색 적용하기
  */

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
