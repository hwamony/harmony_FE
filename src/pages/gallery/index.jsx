import React, { useState } from 'react';
import api from '../../api/AxiosManager';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import styled from 'styled-components';

import PageTitle from '../../components/common/PageTitle';
import Header from '../../components/common/Header';
import ScheduleItem from '../../components/gallery/ScheduleItem';
import BtnAdd from '../../components/common/BtnAdd';
import { IconDate } from '../../assets/icons';

const Gallery = () => {
  const [date, setDate] = useState(dayjs());

  const getGallerySchedules = async (year, month) => {
    const res = await api.get(`/galleries?year=${year}&month=${month}`);
    return res.data.data;
  };

  const { data, isLoading } = useQuery(
    ['gallerySchedules', date.format('YYYY'), date.format('MM')],
    () => getGallerySchedules(date.format('YYYY'), date.format('MM')),
    {
      enabled: !!date,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  return (
    <>
      <PageTitle title="갤러리" />
      <Header title="갤러리" />
      <BtnAdd link="/galleries/posts" text="앨범 추가" />
      <Main>
        <DateWrapper>
          <strong>2022년 8월</strong>
          <button type="button">
            <IconDate />
            날짜선택
          </button>
        </DateWrapper>
        {/* TODO: data.galleries.length 0일때 화면 추가하기 */}
        <ScheduleItem lists={data.galleries} isLoading={isLoading} />
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
