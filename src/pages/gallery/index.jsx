import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageTitle from '../../components/common/PageTitle';
import Header from '../../components/common/Header';
import ScheduleItem from '../../components/gallery/ScheduleItem';

// FIXME: API 연결 후 삭제
const dummySchedule = [
  {
    scheduleId: 1,
    name: '강릉여행',
    image: 'https://source.unsplash.com/random',
  },
  {
    scheduleId: 2,
    name: '야경',
    image: 'https://source.unsplash.com/random',
  },
  {
    scheduleId: 3,
    name: '엄마랑 꽃구경',
    image: 'https://source.unsplash.com/random',
  },
];

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);

  // FIXME: 스켈레톤 UI 구성을 위한 딜레이 발생 -> 추후 지울 것
  useEffect(() => {
    const getTimeDelay = (ms) => {
      return new Promise((res) => setTimeout(res, ms));
    };

    const setLoadingTrue = async () => {
      await getTimeDelay(3000);
      setIsLoading(false);
    };

    setLoadingTrue();
  }, []);

  return (
    <>
      <PageTitle title="갤러리" />
      <Header text="갤러리" />
      <Main>
        <ScheduleItem isLoading={isLoading} lists={dummySchedule} />
        {isLoading ? <p>로딩중</p> : <p>로딩완료</p>}
      </Main>
    </>
  );
};

export default Gallery;

const Main = styled.main`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 55px - 65px);
  margin-top: 55px;
  padding: 20px 20px 65px 20px;
`;
