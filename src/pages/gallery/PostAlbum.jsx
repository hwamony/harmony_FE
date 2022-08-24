import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import { Button } from '../../components/Button';
import { MdAddPhotoAlternate } from 'react-icons/md';

const PostAlbum = () => {
  const [date, setDate] = useState(dayjs());
  const [schedule, setSchedule] = useState('');

  return (
    <>
      <PageTitle title="앨범생성 - 갤러리" />
      <HeaderMid text="앨범생성" />
      <AlbumForm>
        <InputWrapper>
          <TextField id="input-albumtitle" label="앨범명" variant="outlined" />
        </InputWrapper>
        <hr />

        <InputWrapper>
          <MobileDatePicker
            views={['year', 'month']}
            value={date}
            onChange={(state) => {
              setDate(state);
              setSchedule('');
            }}
            label="연도/월 선택"
            onError={console.log}
            inputFormat="YYYY년 M월"
            renderInput={(params) => <TextField {...params} />}
          />

          <FormControl variant="outlined">
            <InputLabel id="test-select-label">일정 선택</InputLabel>
            <Select
              style={{ width: '100%' }}
              variant="outlined"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              labelId="test-select-label"
              label={'일정 선택'}
            >
              <MenuItem key={1} value="test">
                엄마랑 꽃구경
              </MenuItem>
              <MenuItem key={2} value="test2">
                빵지순례
              </MenuItem>
              <MenuItem key={3} value="test3">
                강릉여행
              </MenuItem>
            </Select>
            {/* TODO: 연도/월, 일정 선택 후 세부 일정 선택 select로 전환 */}
            {/* {schedule && <p>세부 일정 선택</p>} */}
          </FormControl>
        </InputWrapper>
        <hr />

        <UploadTitle>
          <strong>사진 업로드 (추후 변경 가능)</strong>
          <IconButton color="primary" aria-label="사진 선택" component="label">
            <input hidden accept="image/*" type="file" multiple />
            <MdAddPhotoAlternate />
          </IconButton>
        </UploadTitle>

        <Button>생성하기</Button>
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
    padding: 12px;
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
