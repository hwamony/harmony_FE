import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import api, { formdataApi } from '../../api/AxiosManager';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import { Button } from '../../components/Button';
import { MdAddPhotoAlternate } from 'react-icons/md';

const PostAlbum = () => {
  const [date, setDate] = useState(dayjs());
  const [schedule, setSchedule] = useState('');
  const [scheduleNum, setScheduleNum] = useState(-1);
  const [selectedDate, setSelectedDate] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const getEnableSchedules = async (year, month) => {
    console.log(`/schedules/dates?year=${year}&month=${month}`);
    const res = await api.get(`/schedules/dates?year=${year}&month=${month}`);
    return res.data.data;
  };

  const { data } = useQuery(
    ['enableSchedule', date.format('YYYY'), date.format('MM')],
    () => getEnableSchedules(date.format('YYYY'), date.format('MM')),
    {
      enabled: !!date,
      refetchOnWindowFocus: false,
      onSuccess: (data) => console.log(data),
    },
  );

  const getPreviewImages = async (e) => {
    const newFiles = e.target.files;
    let urlList = [...previewUrls];

    for (let i = 0; i < newFiles.length; i++) {
      const curPreviewUrl = URL.createObjectURL(newFiles[i]);
      urlList.push(curPreviewUrl);
    }

    if (urlList.length > 30) {
      setIsOpened(true);
      urlList = urlList.slice(0, 30);
    }

    return new Promise((resolve) => {
      setFiles([...files, ...newFiles]);
      setPreviewUrls(urlList);
      resolve();
    });
  };

  const createAlbum = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('date', selectedDate);
    formData.append('title', albumTitle);
    formData.append('content', '');

    for (let i = 0; i < files.length; i++) {
      const imageForm = files[i];
      console.log(imageForm);
      formData.append(`imageFiles[${i}]`, imageForm)
    }

    // FIXME: formData 조회. 최종 배포 전 지울 것
    // for (let key of formData.keys()) {
    //   console.log(key, ':', formData.get(key));
    // }
    // console.log(formData);

    try {
      const res = await formdataApi.post(
        `/schedules/${data.schedules[scheduleNum].id}/galleries`,
        formData,
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <PageTitle title="앨범생성 - 갤러리" />
      <HeaderMid text="앨범생성" />
      <AlbumForm onSubmit={(e) => createAlbum(e)} encType="multipart/form-data">
        <InputWrapper>
          {!selectedDate && (
            <MobileDatePicker
              style={{ width: '50%' }}
              views={['year', 'month']}
              value={date}
              onChange={(state) => {
                setDate(state);
                setSchedule('');
                setScheduleNum(-1);
              }}
              label="연도/월 선택"
              onError={console.log}
              inputFormat="YYYY년 M월"
              renderInput={(params) => <TextField {...params} />}
            />
          )}

          <FormControl variant="outlined">
            <InputLabel id="schedule-label">일정 선택</InputLabel>
            <Select
              style={{ width: '100%' }}
              variant="outlined"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              labelId="schedule-label"
              label={'일정 선택'}
              required
            >
              {data?.schedules.length > 0 ? (
                data?.schedules.map((v, i) => (
                  <MenuItem
                    key={i}
                    value={v.title}
                    onClick={() => setScheduleNum(i)}
                  >
                    {v.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>선택할 일정이 없습니다.</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl variant="outlined">
            {scheduleNum > -1 && (
              <>
                <InputLabel id="selected-date-label">날짜 선택</InputLabel>
                <Select
                  style={{ width: '100%' }}
                  variant="outlined"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  labelId="selected-date-label"
                  label={'날짜 선택'}
                  required
                >
                  {data?.schedules[scheduleNum].dates.map((v, i) => (
                    <MenuItem key={v.date} value={v.date} disabled={!v.enable}>
                      {v.date}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </FormControl>
          <button
            type="button"
            onClick={() => {
              setScheduleNum(-1);
              setSelectedDate('');
            }}
          >
            다시 선택
          </button>
        </InputWrapper>
        <hr />

        <InputWrapper>
          <TextField
            id="input-albumtitle"
            label="앨범명"
            variant="outlined"
            autoComplete="off"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            required
          />
        </InputWrapper>
        <hr />

        <UploadTitle>
          <strong>사진 업로드 (추후 변경 가능)</strong>
          <IconButton color="primary" aria-label="사진 선택" component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              multiple
              onChange={(e) => getPreviewImages(e)}
            />
            <MdAddPhotoAlternate />
          </IconButton>
        </UploadTitle>

        <ImageList>
          {previewUrls.map((url, i) => (
            <div key={i}>
              <img src={url} alt="" />
            </div>
          ))}
        </ImageList>

        <Button>생성하기</Button>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isOpened}
          autoHideDuration={2000}
          onClose={() => {
            setIsOpened(false);
          }}
          message="한 앨범당 사진 업로드는 30장까지로 제한됩니다."
          key={'bottom' + 'center'}
        />
      </AlbumForm>
    </>
  );
};

export default PostAlbum;

const AlbumForm = styled.form`
  overflow-y: auto;
  height: calc(100vh - 55px - 90px);
  margin-top: 55px;
  padding: 0 20px;
  label {
    color: #000;
  }
  strong {
    display: block;
    margin: 22px 0;
    font-weight: 500;
  }
  hr {
    margin: 0 -20px;
    border: 1px solid #ebebeb;
  }
  button {
    position: fixed;
    left: 20px;
    bottom: 35px;
    width: calc(100% - 40px);
  }
  .MuiSnackbar-root {
    bottom: 75px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding: 24px 0;
  .MuiFormControl-root {
    width: 100%;
  }
  svg.MuiSelect-icon {
    padding: 12px 13px 16px;
    margin-right: 5px;
    background: #fff url(/images/chevron_down.png) center no-repeat;
    transition: all 0.2s ease;
  }
`;

const UploadTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  svg {
    fill: ${({ theme }) => theme.palette.primary.main};
  }
`;

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 2px;
  margin: 0 -20px;
  div {
    position: relative;
    img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
  }
`;
