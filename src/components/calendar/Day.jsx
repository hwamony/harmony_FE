import React from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Day = ({ day, weekIdx }) => {
  const { monthIdx } = useSelector((state) => state.calendar);

  return (
    <>
      <DayBox>
        <h3
          className={cn(
            'day',
            monthIdx % 12 !== day.month() && 'other',
            day.format('YY-MM-DD') === dayjs().format('YY-MM-DD') && 'today',
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
  h3.other {
    color: #b4b4b4;
  }
  h3.today {
    margin-top: -3px;
    padding: 3px 4px;
    border-radius: 50%;
    background: #000;
    color: #fff;
    font-weight: 700;
  }
`;
