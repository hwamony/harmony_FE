import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../components/common/PageTitle';
import Header from '../../components/common/Header';
import api from '../../api/AxiosManager';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import { Switch, TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {
  IconHistory,
  IconMembers,
  IconSelect,
  IconChevronBot,
} from '../../assets/icons';
import { Button } from '../../components/Button';

const Schedule = () => {
  const navigate = useNavigate();
  const [switchChecked, setSwitchChecked] = useState(true);
  const [startDate, setStartDate] = useState(dayjs().locale('ko'));
  const [endDate, setEndDate] = useState(dayjs().locale('ko'));
  const [category, setCategory] = useState(null);
  const titleInput = useRef();
  const contentInput = useRef();
  const memberInput = useRef();

  useEffect(() => {
    if (switchChecked) {
      setStartDate(dayjs());
      setEndDate(dayjs());
    }
  }, [switchChecked]);

  // TODO: 가족 정보 조회 /api/family

  const onSubmitSchedule = async (e) => {
    e.preventDefault();
    // TODO: 카테고리 선택 안했을 때 처리 추가

    const data = {
      category,
      title: titleInput.current.value,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      memberIds: memberInput.current.value.split(','),
      content: contentInput.current.value,
    };
    // FIXME: 추후 일정 등록에 시간 추가하면 바꾸기
    // console.log(startDate.locale('en').format('YYYY-MM-DD-A-hh-mm'));
    // console.log(endDate.locale('en').format('YYYY-MM-DD-A-hh-mm'));
    console.log(data);

    try {
      const res = await api.post('/schedules', data);
      console.log(res);
      alert(res.data.msg);
      navigate('/');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <PageTitle title="일정기록 - 캘린더" />
      <Header text="일정기록" />
      <ScheduleSection>
        <ScheduleForm onSubmit={(e) => onSubmitSchedule(e)}>
          <input
            type="text"
            id="input-title"
            placeholder="제목"
            autoComplete="off"
            maxLength="30"
            ref={titleInput}
            required
          />

          <DateWrapper>
            <div className="switch-wrapper">
              <label htmlFor="switch-allday">
                <IconHistory />
                종일
              </label>
              <Switch
                id="switch-allday"
                color="default"
                checked={switchChecked}
                onChange={(e) => {
                  setSwitchChecked((state) => !state);
                }}
              />
            </div>

            {!switchChecked && (
              <>
                <MobileDatePicker
                  value={startDate}
                  onChange={(state) => {
                    setStartDate(state);
                  }}
                  label="시작일"
                  onError={console.log}
                  inputFormat="YYYY년 M월 D일 ddd요일"
                  renderInput={(params) => <TextField {...params} />}
                />
                <MobileDatePicker
                  value={endDate}
                  onChange={(state) => setEndDate(state)}
                  minDate={startDate}
                  label="종료일"
                  onError={console.log}
                  inputFormat="YYYY년 M월 D일 ddd요일"
                  renderInput={(params) => <TextField {...params} />}
                />
              </>
            )}
          </DateWrapper>

          {/* TODO: 추후 가족 선택하도록 수정 */}
          <MemberWrapper>
            <div>
              <IconMembers />
              참석자
            </div>
            <IconChevronBot />
          </MemberWrapper>

          <CategoryWrapper>
            <div className="category-top">
              <strong>
                <IconSelect />
                카테고리 선택
              </strong>
              <small>* 개인 일정은 점수에서 제외됩니다.</small>
            </div>
            <div className="category-inputs">
              <CategoryInput
                type="radio"
                name="category"
                id="cat-1"
                value="EAT_OUT"
                onChange={(e) => setCategory(e.target.value)}
                hidden
              />
              <label htmlFor="cat-1">
                <div />
                외식
              </label>
              <CategoryInput
                type="radio"
                name="category"
                id="cat-2"
                value="TRIP"
                onChange={(e) => setCategory(e.target.value)}
                hidden
              />
              <label htmlFor="cat-2">
                <div />
                여행
              </label>
              <CategoryInput
                type="radio"
                name="category"
                id="cat-3"
                value="COOK"
                onChange={(e) => setCategory(e.target.value)}
                hidden
              />
              <label htmlFor="cat-3">
                <div />
                요리
              </label>
              <CategoryInput
                type="radio"
                name="category"
                id="cat-4"
                value="CLEAN"
                onChange={(e) => setCategory(e.target.value)}
                hidden
              />
              <label htmlFor="cat-4">
                <div />
                청소
              </label>
              <CategoryInput
                type="radio"
                name="category"
                id="cat-5"
                value="ETC"
                onChange={(e) => setCategory(e.target.value)}
                hidden
              />
              <label htmlFor="cat-5">
                <div />
                기타
              </label>
              <CategoryInput
                type="radio"
                name="category"
                id="cat-6"
                value="PERSONAL"
                onChange={(e) => setCategory(e.target.value)}
                hidden
              />
              <label htmlFor="cat-6">
                <div />
                개인
              </label>
            </div>
          </CategoryWrapper>

          <ContentWrapper>
            <strong>내용</strong>
            <Textarea
              placeholder="내용을 3000자 이내로 입력해주세요."
              wrap="hard"
              spellCheck="false"
              maxLength="3000"
              minRows="3"
              maxRows="17"
              ref={contentInput}
              required
            />
          </ContentWrapper>

          <Button>등록하기</Button>
        </ScheduleForm>
      </ScheduleSection>
    </>
  );
};

export default Schedule;

const ScheduleSection = styled.section`
  position: relative;
  margin-top: 55px;
`;

const ScheduleForm = styled.form`
  overflow-y: auto;
  height: calc(100vh - 55px - 90px);
  input {
    width: 100%;
    padding: 23px 20px 17px;
    &::placeholder {
      color: #979797;
    }
  }
  strong {
    font-weight: 500;
    color: #000;
  }
  #input-title {
    font-size: 20px;
    font-weight: 700;
    border-bottom: 1px solid #ebebeb;
  }
  button {
    position: fixed;
    left: 20px;
    bottom: 35px;
    width: calc(100% - 40px);
  }
`;

const DateWrapper = styled.div`
  border-bottom: 1px solid #ebebeb;
  .switch-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 12px 15px 20px;
    color: #8d8d8d;
  }
  label {
    color: #000;
    font-weight: 500;
    svg {
      margin: -2px 9px 0 -1px;
    }
  }
  .MuiSwitch-root {
    width: 61px;
  }
  .MuiSwitch-thumb {
    margin-top: 5px;
    margin-left: 5px;
    width: 13px;
    height: 13px;
  }
  .MuiSwitch-track {
    width: 37px;
    height: 17px;
    border-radius: 37px;
    opacity: 0.2;
  }
  .MuiFormControl-root {
    width: 100%;
    padding: 15px;
    label {
      margin: 15px 0 0 15px;
      font-size: 16px;
    }
  }
`;

const MemberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ebebeb;
  font-weight: 500;
  svg {
    margin: -2px 9px 0 0;
    padding: 5.5px 0;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 8px 20px;
  border-bottom: 1px solid #ebebeb;
  div.category-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
    svg {
      margin-right: 11px;
    }
    small {
      display: block;
      font-size: 0.8em;
      color: #979797;
    }
  }
  div.category-inputs {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0 4px;
    padding: 10px 0;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 52px;
      height: 25px;
      border: 1px solid #ebebeb;
      border-radius: 30px;
      color: #000;
      font-size: 14px;
      transition: all 0.2s ease;
      cursor: pointer;
      div {
        width: 7px;
        height: 7px;
        padding: 0;
        margin-right: 4px;
        border-radius: 50%;
      }
    }
  }
`;

const CategoryInput = styled.input`
  width: inherit;
  & + label {
    div {
      background: ${({ theme, value }) => theme.palette[value].main};
    }
  }
  &:checked + label {
    background: ${({ theme, value }) => theme.palette[value].sub};
  }
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const Textarea = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 4px;
  resize: none;
  font-size: 1em;
  line-height: 1.4em;
  transition: border 0.2s ease;
  &::placeholder {
    font-weight: 300;
    font-size: 0.9em;
  }
  &:focus-visible {
    outline: none;
    border: 1px solid #b5b5b5;
  }
`;
