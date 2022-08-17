import React from 'react';
import styled from 'styled-components';
import Day from './Day';

const Month = ({ monthMatrix }) => {
  return (
    <CalendarBox>
      {monthMatrix[0].map((day, id) => (
        <strong key={id}>{day.locale('ko').format('ddd')}</strong>
      ))}
      {monthMatrix.map((weekArr, i) => (
        <React.Fragment key={i}>
          {weekArr.map((day, idx) => (
            <Day key={idx} day={day} weekIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </CalendarBox>
  );
};

export default Month;

const CalendarBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: 0.7fr repeat(4, minmax(0, 1fr));
  flex: 1;
  user-select: none;
  strong {
    color: #b4b4b4;
    font-weight: 500;
    font-size: 0.9em;
  }
`;
