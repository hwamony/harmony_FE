import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setDay } from '../redux/modules/calendarSlice';
import api from '../api/AxiosManager';
import dayjs from 'dayjs';

import PageTitle from '../components/common/PageTitle';
import Widget from '../components/family/Widget';
import Summary from '../components/calendar/Summary';
import Calendar from '../components/calendar/Calendar';
import ScheduleList from '../components/calendar/ScheduleList';
import { IconPlus } from '../assets/icons';

const Home = () => {
  const dispatch = useDispatch();
  const { selectedDate, monthIdx, selectedDay } = useSelector(
    (state) => state.calendar,
  );

  const getMonthSchedule = async () => {
    try {
      const res = await api.get(
        `/schedules?year=${selectedDate.format(
          'YYYY',
        )}&month=${selectedDate.format('M')}`,
      );
      return res.data.data;
    } catch (err) {
      console.log(err.response);
    }
  };

  const { data: monthSchedule, refetch } = useQuery(
    ['schedule'],
    getMonthSchedule,
    {
      onSuccess: () => dispatch(setDay(null)),
      refetchOnWindowFocus: false,
    },
  );

  const activityCounts = {
    eatCount: monthSchedule.eatCount,
    tripCount: monthSchedule.tripCount,
    cookCount: monthSchedule.cookCount,
    cleanCount: monthSchedule.cleanCount,
    etcCount: monthSchedule.etcCount,
  };

  useEffect(() => {
    refetch();
  }, [monthIdx]);

  // FIXME: 개발 끝나면 지우기
  useEffect(() => {
    console.log(
      `/schedules?year=${selectedDate.format(
        'YYYY',
      )}&month=${selectedDate.format('M')}`,
    );
    console.log(monthSchedule);
  }, [monthSchedule]);

  return (
    <>
      <PageTitle title="홈 - 캘린더" />
      <Widget />
      <Main>
        <h1 className="hidden">캘린더 홈</h1>
        {/* TODO: 선택된 날짜 state로 관리하기 (기본값: 오늘) */}
        {/* TODO: 일정 추가 시 날짜 넘겨주기 */}
        {IconPlus && (
          <BtnAdd to="/schedules">
            <p className="hidden">일정 추가</p>
            <IconPlus />
          </BtnAdd>
        )}
        <Summary counts={activityCounts} />
        <Calendar />
        {monthSchedule?.schedules.length > 0 ? (
          <ListWrapper>
            {!selectedDay
              ? monthSchedule.schedules.map((schedule, i) => (
                  <ScheduleList key={i} schedule={schedule} />
                ))
              : monthSchedule.schedules
                  .filter(
                    (s) =>
                      dayjs(s.startDate).format('DD') <=
                        selectedDate.format('DD') &&
                      dayjs(s.endDate).format('DD') >=
                        selectedDate.format('DD'),
                  )
                  .map((schedule, i) => (
                    <ScheduleList key={i} schedule={schedule} />
                  ))}
          </ListWrapper>
        ) : (
          <p>{selectedDate.format('YYYY년 M월')} 일정이 없습니다.</p>
        )}
      </Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 110px - 356px - 65px);
  margin-top: 465px;
  padding: 25px 10px 65px 25px;
`;

const BtnAdd = styled(Link)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.0784314);
  z-index: 50;
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
`