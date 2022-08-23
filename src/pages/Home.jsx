import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setDay } from '../redux/modules/calendarSlice';
import api from '../api/AxiosManager';
import { useValidUserData } from '../hooks/useData';
import dayjs from 'dayjs';

import PageTitle from '../components/common/PageTitle';
import Widget from '../components/family/Widget';
import BtnAdd from '../components/common/BtnAdd';
import Summary from '../components/calendar/Summary';
import Calendar from '../components/calendar/Calendar';
import ScheduleList from '../components/calendar/ScheduleList';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hasToken } = useAuth();
  const { selectedDate, monthIdx, selectedDay } = useSelector(
    (state) => state.calendar,
  );

  const { data: getValidInfo } = useValidUserData();
  const isValidUser = getValidInfo?.isFamily && getValidInfo?.hasRole;

  useEffect(() => {
    if (getValidInfo && !isValidUser) {
      if (!getValidInfo?.isFamily) {
        navigate('/familycode');
      } else if (!getValidInfo?.hasRole) {
        navigate('/role');
      }
    }
  }, []);

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
      enabled: !!getValidInfo && isValidUser,
      onSuccess: (data) => {
        console.log(data);
        dispatch(setDay(null));
      },
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (isValidUser) {
      refetch();
    }
  }, [isValidUser, monthIdx]);

  const filteredSchedules = monthSchedule?.schedules.filter(
    (s) =>
      dayjs(s.startDate).format('DD') <= selectedDate.format('DD') &&
      dayjs(s.endDate).format('DD') >= selectedDate.format('DD'),
  );

  const activityCounts = [
    monthSchedule?.eatCount,
    monthSchedule?.tripCount,
    monthSchedule?.cookCount,
    monthSchedule?.cleanCount,
    monthSchedule?.etcCount,
  ];

  return (
    <>
      {hasToken && monthSchedule && (
        <>
          <PageTitle title="홈 - 캘린더" />
          <Widget />
          <Main>
            <h1 className="hidden">캘린더 홈</h1>
            <BtnAdd link="/schedules" text="일정 추가" />
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
                    <ScheduleList
                      selectedDate={selectedDate.format('M월 D일')}
                    />
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
                  <p>
                    {selectedDate.format('M월')}의 첫 번째 일정을 기록해보세요!
                  </p>
                </NoSchedule>
              )}
            </ListWrapper>
          </Main>
        </>
      )}
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
