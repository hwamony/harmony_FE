import React from 'react';
import styled from 'styled-components';

const Summary = () => {
  return (
    <CalendarSummary>
      <Category val="eatout">
        <div />
        외식 +1
      </Category>
      <Category val="trip">
        <div />
        여행 +1
      </Category>
      <Category val="cook">
        <div />
        요리 +0
      </Category>
      <Category val="clean">
        <div />
        청소 +5
      </Category>
      <Category val="etc">
        <div />
        기타 +3
      </Category>
    </CalendarSummary>
  );
};

export default Summary;

const CalendarSummary = styled.section`
  position: fixed;
  top: 75px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  height: 52px;
  gap: 5px 10px;
  padding: 0 18px;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #7d7d7d;
  font-size: 14px;
  letter-spacing: -0.9px;;
  div {
    width: 7px;
    height: 7px;
    margin-right: 4px;
    border-radius: 50%;
    background: ${({ theme, val }) => theme.palette[val]};
  }
`;
