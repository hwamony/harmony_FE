import React, { useState } from 'react';
import styled from 'styled-components';
import PageTitle from '../../components/common/PageTitle';
import Header from '../../components/common/Header';
import ScheduleItem from '../../components/gallery/ScheduleItem';
import BtnAdd from '../../components/common/BtnAdd';

// FIXME: API 연결 후 삭제
const dummySchedule = [
  {
    scheduleId: 1,
    name: '강릉여행',
    image: 'https://source.unsplash.com/random',
  },
  {
    scheduleId: 2,
    name: '빵지순례',
    image: 'https://source.unsplash.com/random',
  },
  {
    scheduleId: 3,
    name: '엄마랑 꽃구경',
    image: 'https://source.unsplash.com/random',
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
