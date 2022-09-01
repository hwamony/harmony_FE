import React, { useState } from 'react';
import api from '../../api/AxiosManager';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
import styled from 'styled-components';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from '@mui/material';
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
    },
  );

  return (
    <>
      <PageTitle title="갤러리" />
      <Header title="갤러리" link="/galleries" />
      <BtnAdd link="/galleries/posts" text="앨범 추가" plus={true} />
      <Main>
        <DateWrapper>
          <MobileDatePicker
            id="date-picker"
            views={['year', 'month']}
            value={date}
            onChange={(state) => {
              setDate(state);
            }}
            onError={console.log}
            inputFormat="YYYY년 M월"
            renderInput={(params) => <TextField {...params} />}
          />
          <button type="button" htmlFor="date-picker">
            <IconDate />
            날짜선택
          </button>
        </DateWrapper>
        {data.galleries.length === 0 && (
          <NoData>
            <img src={`${process.env.PUBLIC_URL}/images/nodata.png`} alt="" />
            <p>아직 생성된 앨범이 없습니다.</p>
            <p>첫 앨범을 생성해보세요!</p>
          </NoData>
        )}
        <ScheduleItem lists={data.galleries} isLoading={isLoading} />
      </Main>
    </>
  );
};

export default Gallery;

const Main = styled.main`
  overflow-y: auto;
  min-height: calc(100vh - 60px - 65px);
  margin-top: 60px;
  border-top: 2px solid #f2f2f2;
  padding: 20px;
  button {
    position: absolute;
    right: 20px;
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    z-index: -1;
    svg {
      margin-right: 6px;
    }
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  input {
    cursor: pointer;
  }
  .MuiTextField-root {
    width: 100%;
  }
  .MuiOutlinedInput-input {
    padding: 0;
    color: #18191f;
    font-size: 18px;
    font-weight: 700;
  }
  fieldset {
    border: none;
  }
`;

const NoData = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #adadad;
  line-height: 19px;
  font-size: 14px;
  img {
    margin-bottom: 20px;
  }
`;
