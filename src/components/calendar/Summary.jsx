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
              {`${cat.name} +${counts[cat.value] ?? 0}`}
            </Category>
          </React.Fragment>
        ))}
    </CalendarSummary>
  );
};

Summary.propTypes = {
  counts: PropTypes.object.isRequired,
};

export default Summary;

const CalendarSummary = styled.section`
  display: flex;
  justify-content: center;
  height: 52px;
  padding: 0 18px;
  margin: -20px;
  margin-bottom: 0;
  gap: 5px 10px;

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
