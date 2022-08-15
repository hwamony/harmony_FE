import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import Calendar from '../components/calendar/Calendar';
import { IconPlus } from '../assets/icons';
import LoremText from '../components/common/LoremText';

const Home = () => {
  return (
    <>
      <PageTitle title="캘린더 홈" />
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
        <Calendar />
        <LoremText />
      </Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 356px - 65px);
  margin-top: 356px;
  padding: 20px 20px 20px 20px;
`;

const BtnAdd = styled(Link)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.0784314);
`;
