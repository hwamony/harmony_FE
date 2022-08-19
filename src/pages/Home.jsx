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

  useEffect(() => {
    refetch();
  }, [monthIdx]);

  const filteredSchedules = monthSchedule.schedules.filter(
    (s) =>
      dayjs(s.startDate).format('DD') <= selectedDate.format('DD') &&
      dayjs(s.endDate).format('DD') >= selectedDate.format('DD'),
  );

  const activityCounts = [
    monthSchedule.eatCount,
    monthSchedule.tripCount,
    monthSchedule.cookCount,
    monthSchedule.cleanCount,
    monthSchedule.etcCount,
  ];

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
        {IconPlus && (
          <BtnAdd to="/schedules">
            <p className="hidden">일정 추가</p>
            <IconPlus />
          </BtnAdd>
        )}
        <Summary counts={activityCounts} />
        <Calendar schedules={monthSchedule.schedules} />
        <ListWrapper>
          {selectedDay ? (
            monthSchedule?.schedules.length > 0 ? (
              filteredSchedules.length > 0 ? (
                filteredSchedules.map((schedule, i) => (
                  <ScheduleList key={i} schedule={schedule} />
                ))
              ) : (
                <ScheduleList selectedDate={selectedDate.format('M월 D일')} />
              )
            ) : (
              <ScheduleList selectedDate={selectedDate.format('M월 D일')} />
            )
          ) : monthSchedule?.schedules.length > 0 ? (
            monthSchedule.schedules.map((schedule, i) => (
              <ScheduleList key={i} schedule={schedule} />
            ))
          ) : (
            <NoSchedule>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo_light.png`}
                alt=""
              />
              <p>아직 등록된 일정이 없습니다.</p>
              <p>{(monthIdx % 12) + 1}월의 첫 번째 일정을 기록해보세요!</p>
            </NoSchedule>
          )}
        </ListWrapper>
      </Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 127px - 347px - 65px);
  margin-top: 474px;
  padding: 5px 10px 65px 25px;
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
`;

const NoSchedule = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  color: #adadad;
  user-select: none;
  img {
    padding-bottom: 10px;
  }
`;
