import React from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import api from '../../api/AxiosManager';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styled from 'styled-components';
import { IconCheck } from '../../assets/icons';

const ScheduleDetail = ({ schedule }) => {
  const queryClient = useQueryClient();
  const { mutate: toggleDone } = useMutation(
    () => api.put(`/schedules/${schedule.scheduleId}/done`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['schedule']);
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  return (
    <DetailContent>
      {dayjs(schedule.startDate).format('MMDD') ===
      dayjs(schedule.endDate).format('MMDD') ? (
        <p className="detail-date">
          {dayjs(schedule.startDate).format('YYYY.MM.DD')}
        </p>
      ) : (
        <p className="detail-date">
          {dayjs(schedule.startDate).format('YYYY.MM.DD')} ~{' '}
          {dayjs(schedule.endDate).format('YYYY.MM.DD')}
        </p>
      )}

      <strong>{schedule.title}</strong>
      <hr className="line-strong" />
      <textarea
        defaultValue={schedule.content}
        readOnly
        className="detail-content"
      />
      <div className="detail-members">
        {schedule.members.map((member, i) => (
          <span key={i}>{member}</span>
        ))}
      </div>
      <button
        type="button"
        onClick={toggleDone}
        className={cn(schedule.done && 'done')}
      >
        <IconCheck />
        일정완료
      </button>
    </DetailContent>
  );
};

ScheduleDetail.propTypes = {
  schedule: PropTypes.object.isRequired,
};

export default ScheduleDetail;

const DetailContent = styled.div`
  .detail-date {
    font-size: 14px;
    text-align: center;
  }
  .detail-content {
    width: 100%;
    height: 100px;
    margin-top: 1px;
    padding: 16px 10px 3px;
    border: none;
    outline: none;
    resize: none;
    font-size: 14px;
    &::-webkit-scrollbar {
      display: fixed;
      height: 2px;
    }
    &::-webkit-scrollbar-thumb {
      width: 5px;
      height: 80px;
      border: 7px solid transparent;
      border-radius: 10px;
      background: #e3e5e9;
      background-clip: padding-box;
    }
    &::-webkit-scrollbar-trac {
      background: none;
    }
  }
  .detail-members {
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    max-height: 42px;
    margin: 3px 0;
    padding-bottom: 10px;
    span {
      padding: 4px 14px;
      font-size: 14px;
      background: #ededed;
      margin-right: 5px;
      border-radius: 100px;
      word-break: keep-all;
      user-select: none;
    }
    &::-webkit-scrollbar {
      display: fixed;
      height: 3px;
    }
    &::-webkit-scrollbar-thumb {
      border: 7px solid transparent;
      border-radius: 10px;
      background: #e3e5e9;
      background-clip: border-box;
    }
    &::-webkit-scrollbar-trac {
      background: none;
    }
  }
  strong {
    display: block;
    margin: 5px 0 18px;
    font-size: 18px;
    text-align: center;
  }
  button {
    float: right;
    margin-top: 7px;
    padding: 13px 18px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    svg {
      width: 14px;
      margin-right: 7px;
      path {
        stroke: #000;
        stroke-width: 1.5;
      }
    }
    &.done {
      border-color: ${({ theme }) => theme.palette.primary.main};
      background: ${({ theme }) => theme.palette.primary.main};
      color: #fff;
      svg path {
        stroke: #fff;
      }
    }
  }
  hr {
    border: 1px solid #e3e5e9;
    &.line-strong {
      border: 1px solid #000;
    }
  }
`;
