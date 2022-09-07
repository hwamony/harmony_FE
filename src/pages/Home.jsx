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
  const isValidUser =
    getValidInfo?.isFamily && getValidInfo?.hasRole && getValidInfo?.hasAllInfo;

  useEffect(() => {
    if (getValidInfo && !isValidUser) {
      if (!getValidInfo?.hasAllInfo) {
        navigate('/signup/kakao');
      } else if (!getValidInfo?.isFamily) {
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
      onSuccess: () => {
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

  return (
    <>
      {hasToken && monthSchedule && (
        <>
          <PageTitle title="홈 - 캘린더" />
          <Widget />
          <Main>
            <h1 className="hidden">캘린더 홈</h1>
            <BtnAdd link="/schedules" text="일정 추가" plus={true} />
            <Summary counts={monthSchedule.counts} />
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
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  padding: 0 20px 65px;
`;

const ListWrapper = styled.ul`
  padding: 0 5px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

const NoSchedule = styled.div`
  margin-top: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  line-height: 1.4;
  color: #adadad;
  user-select: none;
  img {
    padding-bottom: 10px;
  }
`;
