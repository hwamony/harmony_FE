import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api, { formdataApi } from '../../api/AxiosManager';
import useAuth from '../../hooks/useAuth';
import imageCompression from 'browser-image-compression';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import { TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Snackbar } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import { Button } from '../../styles/Button';
import { MdAddPhotoAlternate } from 'react-icons/md';
import ReactGA from 'react-ga';

const PostAlbum = () => {
  const navigate = useNavigate();
  const galleryId = useParams().galleryId;
  const { actions } = useAuth();
  const queryClient = useQueryClient();
  const [date, setDate] = useState(dayjs());
  const [schedule, setSchedule] = useState('');
  const [scheduleNum, setScheduleNum] = useState(-1);
  const [selectedDate, setSelectedDate] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumContent, setAlbumContent] = useState('');
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const getEnableSchedules = async (year, month) => {
    const res = await api.get(`/schedules/dates?year=${year}&month=${month}`);
    return res.data.data;
  };

  const { data } = useQuery(
    ['enableSchedule', date.format('YYYY'), date.format('MM')],
    () => getEnableSchedules(date.format('YYYY'), date.format('MM')),
    {
      enabled: !!date,
      refetchOnWindowFocus: false,
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
      setFiles([...files, ...newFiles].slice(0, 30));
      setPreviewUrls(urlList);
      resolve();
    });
  };

  const createGAEvent = (event) => {
    ReactGA.event({
      category: 'Gallery',
      action: `갤러리에서 ${event}`,
      label: 'gallery',
    });
  };

  const createAlbum = async (e) => {
    e.preventDefault();

    if (!files.length || !previewUrls.length) {
      alert('사진을 추가해주세요');
      return;
    }

    let formData = new FormData();
    formData.append('date', selectedDate);
    formData.append('title', albumTitle);
    formData.append('content', albumContent);

    // 리사이징 시작
    const start = Date.now();
    const options = {
      maxSizeMB: 1,
    };
    await Promise.all(
      files.map(async (item) => {
        await imageCompression(item, options).then((res) =>
          formData.append(`imageFiles`, res),
        );
      }),
    );
    const end = Date.now();
    console.log(`${start - end}ms`);
    // 리사이징 끝

    try {
      if (galleryId) {
        await formdataApi.post(
          `/galleries/${galleryId}/images`,
          formData,
        );
        createGAEvent('사진 추가');
        alert('사진이 추가되었습니다!');
        navigate(-1);
      } else {
        await formdataApi.post(
          `/schedules/${data.schedules[scheduleNum].id}/galleries`,
          formData,
        );
        createGAEvent('앨범 생성');
        alert('앨범이 생성되었습니다!');
        actions.onScoreChanged(20);
        navigate('/galleries');
        return queryClient.invalidateQueries(['familyInfo']);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <PageTitle
        title={galleryId ? '사진추가 - 갤러리' : '앨범생성 - 갤러리'}
      />
      <HeaderMid text={galleryId ? '사진추가' : '앨범생성'} />

      <AlbumForm onSubmit={(e) => createAlbum(e)} encType="multipart/form-data">
        {!galleryId && (
          <>
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
                      {data?.schedules[scheduleNum].dates.map((v) => (
                        <MenuItem
                          key={v.date}
                          value={v.date}
                          disabled={!v.enable}
                        >
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

              <Textarea
                placeholder="내용을 3000자 이내로 입력해주세요."
                wrap="hard"
                spellCheck="false"
                maxLength="3000"
                minRows="3"
                maxRows="5"
                value={albumContent}
                onChange={(e) => setAlbumContent(e.target.value)}
                required
              />
            </InputWrapper>
            <hr />
          </>
        )}

        <UploadTitle>
          <strong>사진 업로드 (추후 변경 가능)</strong>
          <IconButton color="primary" aria-label="사진 선택" component="label">
            <input
              hidden
              name="upload-image"
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

        <Button>{galleryId ? <>추가하기</> : <>생성하기</>}</Button>

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
  position: relative;
  overflow-y: auto;
  min-height: calc(100vh - 55px - 90px);
  padding: 0 20px 90px;
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
    bottom: 35px;
    width: calc(100% - 40px);

    @media only screen and (min-width: 1025px) {
      width: 460px;
    }
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
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
  }
`;

const Textarea = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #b5b5b5;
  border-radius: 4px;
  resize: none;
  font-size: 1em;
  line-height: 1.4em;
  transition: border 0.2s ease;
  outline: none;
  &::placeholder {
    font-weight: 300;
    font-size: 0.9em;
  }
`;
