import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import MoreVert from './MoreVert';

const ScheduleList = ({ schedule }) => {
  return (
    <ScheduleItem>
      <div>
        <CategoryAndDate>
          <Circle val={schedule.category} />
          {schedule.startDate === schedule.endDate ? (
            <span className="date">
              {dayjs(schedule.startDate).format('M월 D일, dd')}
            </span>
          ) : (
            <span className="date">
              {dayjs(schedule.startDate).format('M월 D일, dd')} ~{' '}
              {dayjs(schedule.endDate).format('M월 D일, dd')}
            </span>
          )}
        </CategoryAndDate>
        <CategoryTitle>
          <strong>{schedule.title}</strong>
          {schedule.done && <DoneBadge>완료</DoneBadge>}
        </CategoryTitle>
      </div>
      <MoreVert schedule={schedule} />
    </ScheduleItem>
  );
};

export default ScheduleList;

const ScheduleItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryAndDate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  span.date {
    color: #adadad;
    font-size: 12px;
    font-weight: 500;
  }
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 7px;
  border-radius: 50%;
  background: ${({ theme, val }) => theme.palette[val].main};
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  strong {
    font-size: 17px;
    color: #232323;
  }
`;

const DoneBadge = styled.span`
  display: inline-block;
  margin-left: 5px;
  padding: 2px 8px;
  border: 1px solid #8f8f8f;
  border-radius: 20px;
  font-size: 12px;
`;
