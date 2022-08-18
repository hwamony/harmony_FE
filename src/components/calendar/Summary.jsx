import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { categories } from '../../utils/data';

const Summary = ({ counts }) => {
  return (
    <CalendarSummary>
      {categories &&
        categories.slice(0, 5).map((cat, i) => (
          <React.Fragment key={cat.value}>
            <Category val={cat.value}>
              <div />
              {`${cat.name} +${counts[i]}`}
            </Category>
          </React.Fragment>
        ))}
    </CalendarSummary>
  );
};

export default Summary;

Summary.propTypes = {
  counts: PropTypes.array.isRequired,
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
    background: ${({ theme, val }) => theme.palette[val].main};
  }
`;
