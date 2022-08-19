import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import cn from 'classnames';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setDay } from '../../redux/modules/calendarSlice';

const Day = ({ day, dailySchedule }) => {
  const dispatch = useDispatch();
  const { monthIdx, selectedDay, selectedDate } = useSelector(
    (state) => state.calendar,
  );

  return (
    <>
      <DayBox>
        <h3
          onClick={() =>
            monthIdx % 12 === day.month() && dispatch(setDay(day.format('DD')))
          }
          className={cn(
            selectedDate.format('M') - 1 !== day.month() ? 'other' : 'this',
            day.format('YY-MM-DD') === dayjs().format('YY-MM-DD') && 'today',
            selectedDay === day.format('DD') && 'selected',
          )}
        >
          {day.format('D')}
        </h3>
        <DailyWrapper>
          {dailySchedule &&
            dailySchedule.length > 0 &&
            dailySchedule
              .slice(0, 5)
              .map((daily) => (
                <MiniCircle key={daily.scheduleId} val={daily.category} />
              ))}
        </DailyWrapper>
      </DayBox>
    </>
  );
};

Day.propTypes = {
  day: PropTypes.object.isRequired,
  dailySchedule: PropTypes.array,
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

const DailyWrapper = styled.div`
  display: flex;
  gap: 2px;
  height: 4px;
`;

const MiniCircle = styled.div`
  width: 4px;
  height: 4px;
  margin-top: 3px;
  border-radius: 50%;
  background: ${({ theme, val }) => theme.palette[val].main};
`;
