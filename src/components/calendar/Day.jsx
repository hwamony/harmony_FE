import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Day = ({ day, weekIdx }) => {
  const { monthIdx } = useSelector((state) => state.calendar);

  return (
    <>
      <DayBox>
        <h3 className={cn(`${monthIdx !== day.month() ? 'other' : 'this'}`)}>
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
  h3.other {
    color: #b4b4b4;
  }
`;
