import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Summary = ({ counts }) => {
  return (
    <CalendarSummary>
      <Category val="eatout">
        <div />
        외식 +{counts.eatCount}
      </Category>
      <Category val="trip">
        <div />
        여행 +{counts.tripCount}
      </Category>
      <Category val="cook">
        <div />
        요리 +{counts.cookCount}
      </Category>
      <Category val="clean">
        <div />
        청소 +{counts.cleanCount}
      </Category>
      <Category val="etc">
        <div />
        기타 +{counts.etcCount}
      </Category>
    </CalendarSummary>
  );
};

export default Summary;

Summary.propTypes = {
  counts: PropTypes.object.isRequired,
};

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
  letter-spacing: -0.9px;
  div {
    width: 7px;
    height: 7px;
    margin-right: 4px;
    border-radius: 50%;
    background: ${({ theme, val }) => theme.palette[val]};
  }
`;
