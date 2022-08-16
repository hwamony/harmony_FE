import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const ScheduleList = ({ schedule }) => {
  return (
    <ScheduleItem>
      <CategoryAndDate>
        {/* TODO: category 영어로 받아서 theme 적용 */}
        <div val={schedule.category} className="circle" />
        {schedule.startDate === schedule.endDate ? (
          <span className="date">
            {dayjs(schedule.startDate).format('M월 DD일, dd')}
          </span>
        ) : (
          <span className="date">
            {dayjs(schedule.startDate).format('M월 DD일, dd')} ~{' '}
            {dayjs(schedule.endDate).format('M월 DD일, dd')}
          </span>
        )}
      </CategoryAndDate>
      <strong>{schedule.title}</strong>
    </ScheduleItem>
  );
};

export default ScheduleList;

const ScheduleItem = styled.li`
  margin-bottom: 20px;
`;

const CategoryAndDate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  div.circle {
    width: 10px;
    height: 10px;
    margin-right: 7px;
    border-radius: 50%;
    background: #45bfff;
  }
  span.date {
    color: #adadad;
    font-size: 12px;
    font-weight: 500;
  }
`;
