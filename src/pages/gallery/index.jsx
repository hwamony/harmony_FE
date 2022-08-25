import React, { useState } from 'react';
import styled from 'styled-components';
import PageTitle from '../../components/common/PageTitle';
import Header from '../../components/common/Header';
import ScheduleItem from '../../components/gallery/ScheduleItem';
import BtnAdd from '../../components/common/BtnAdd';
import { IconDate } from '../../assets/icons';

// FIXME: API 연결 후 삭제
const dummySchedule = [
  {
    scheduleId: 1,
    name: '강릉여행',
    image: 'https://source.unsplash.com/random/?spring',
    size: 250,
  },
  {
    scheduleId: 2,
    name: '빵지순례',
    image: 'https://source.unsplash.com/random/?summer',
    size: 4,
  },
  {
    scheduleId: 3,
    name: '엄마랑 꽃구경',
    image: 'https://source.unsplash.com/random/?fall',
    size: 14,
  },
];

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <PageTitle title="갤러리" />
      <Header title="갤러리" />
      <BtnAdd link="/galleries/posts" text="앨범 추가" />
      <Main>
        <DateWrapper>
          <strong>2022년 8월</strong>
          <button type="button"><IconDate />날짜선택</button>
        </DateWrapper>
        <ScheduleItem isLoading={isLoading} lists={dummySchedule} />
      </Main>
    </>
  );
};

export default Gallery;

const Main = styled.main`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 70px - 65px);
  margin-top: 70px;
  padding: 20px;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  strong {
    color: #18191f;
    font-size: 18px;
  }
  button {
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    svg {
      margin-right: 6px;
    }
  }
`;
