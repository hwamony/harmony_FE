import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import api from '../../api/AxiosManager';
import { useFamilyData } from '../../hooks/useData';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

import { Switch, TextField, Select, MenuItem } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { IconHistory, IconMembers, IconSelect } from '../../assets/icons';
import { Button } from '../../components/Button';
import { categories } from '../../utils/data';

const Schedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scheduleData = location.state;
  const [switchChecked, setSwitchChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMember, setSelectedMember] = useState([]);
  const [category, setCategory] = useState(null);
  const titleInput = useRef();
  const contentInput = useRef();
  const { data: familyInfo } = useFamilyData();
  const { selectedDate, selectedDay } = useSelector((state) => state.calendar);

  useEffect(() => {
    if (selectedDay) {
      setStartDate(selectedDate);
      setEndDate(selectedDate);
      setSwitchChecked(true);
    }
  }, [selectedDay]);

  useEffect(() => {
    if (scheduleData && familyInfo) {
      let memberIds = [];
      for (let role of scheduleData.members) {
        familyInfo.members.forEach((member) => {
          member.role === role && memberIds.push(member.userId);
        });
      }

      console.log(scheduleData);
      titleInput.current.value = scheduleData.title;
      contentInput.current.value = scheduleData.content;
      setStartDate(dayjs(scheduleData.startDate));
      setEndDate(dayjs(scheduleData.endDate));
      setCategory(scheduleData.category);
      if (scheduleData.startDate === scheduleData.endDate) {
        setSwitchChecked(true);
      }
      setSelectedMember(memberIds);
    }
  }, [scheduleData, familyInfo]);

  const handleMemberChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMember(typeof value === 'string' ? value.split(',') : value);
  };

  const onSubmitSchedule = async (e) => {
    e.preventDefault();
    if (!category) {
      alert('카테고리를 선택해주세요');
      return;
    }

    const data = {
      category,
      title: titleInput.current.value,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      memberIds: selectedMember,
      content: contentInput.current.value,
    };
    console.log(data);
    // FIXME: 추후 일정 등록에 시간 추가하면 바꾸기
    // console.log(startDate.locale('en').format('YYYY-MM-DD-A-hh-mm'));
    // console.log(endDate.locale('en').format('YYYY-MM-DD-A-hh-mm'));

    try {
      if (!scheduleData) {
        const res = await api.post('/schedules', data);
        console.log(res);
        alert(res.data.msg);
      } else {
        const res = await api.put(
          `/schedules/${scheduleData.scheduleId}`,
          data,
        );
        console.log(res);
        alert(res.data.msg);
      }
      navigate('/');
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  return (
    <>
      {scheduleData ? (
        <>
          <PageTitle title={`일정수정(${scheduleData.title}) - 캘린더`} />
          <HeaderMid text="일정수정" />
        </>
      ) : (
        <>
          <PageTitle title="일정기록 - 캘린더" />
          <HeaderMid text="일정기록" />
        </>
      )}

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

          {!scheduleData?.done && (
            <>
              <DateWrapper>
                <div className="switch-wrapper">
                  <label htmlFor="switch-allday">
                    <IconHistory />
                    종일
                    {!startDate && <small>* 시작일을 입력해주세요.</small>}
                    {startDate && switchChecked && (
                      <span>({startDate.format('M/D dd')})</span>
                    )}
                  </label>
                  <Switch
                    id="switch-allday"
                    color="default"
                    checked={switchChecked}
                    onChange={() => {
                      if (startDate) {
                        setEndDate(startDate);
                        setSwitchChecked((state) => !state);
                      } else {
                        alert('시작일을 입력해주세요.');
                      }
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
                    {startDate && (
                      <MobileDatePicker
                        value={endDate}
                        onChange={(state) => setEndDate(state)}
                        minDate={startDate}
                        label="종료일"
                        onError={console.log}
                        inputFormat="YYYY년 M월 D일 ddd요일"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    )}
                  </>
                )}
              </DateWrapper>

              <MemberWrapper>
                <div className="member-title">
                  <IconMembers />
                  참석자
                </div>
                <Select
                  id="member-select"
                  value={selectedMember}
                  onChange={handleMemberChange}
                  multiple
                  required
                >
                  {familyInfo?.members.map((member) => (
                    <MenuItem key={member.userId} value={member.userId}>
                      {member.role}({member.name})
                    </MenuItem>
                  ))}
                </Select>
              </MemberWrapper>
            </>
          )}

          <CategoryWrapper>
            <div className="category-top">
              <strong>
                <IconSelect />
                카테고리 선택
              </strong>
              <small>* 개인 일정은 점수에서 제외됩니다.</small>
            </div>
            <div className="category-inputs">
              {categories &&
                categories.map((cat, i) => (
                  <React.Fragment key={cat.value}>
                    <CategoryInput
                      type="radio"
                      name="category"
                      id={`cat-${i}`}
                      value={cat.value}
                      checked={category === cat.value}
                      onChange={() => setCategory(cat.value)}
                      hidden
                    />
                    <label htmlFor={`cat-${i}`}>
                      <div />
                      {cat.name}
                    </label>
                  </React.Fragment>
                ))}
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

          <Button>{scheduleData ? '수정하기' : '등록하기'}</Button>
        </ScheduleForm>
      </ScheduleSection>
    </>
  );
};

export default Schedule;

const ScheduleSection = styled.section`
  position: relative;
  margin: 55px 0 65px;
`;

const ScheduleForm = styled.form`
  overflow-y: auto;
  min-height: calc(100vh - 55px - 90px);
  #input-title {
    font-size: 20px;
    font-weight: 700;
    border-bottom: 1px solid #ebebeb;
  }
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
  button {
    position: fixed;
    left: 20px;
    bottom: 35px;
    width: calc(100% - 40px);
  }
  small {
    display: inline-block;
    margin-left: 10px;
    font-size: 0.8em;
    color: #979797;
  }
`;

const DateWrapper = styled.div`
  padding: 5px 0 10px;
  label {
    color: #000;
    font-weight: 500;
    svg {
      margin: -2px 9px 0 -1px;
    }
  }
  .switch-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 12px 5px 20px;
    color: #8d8d8d;
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
    padding: 10px 20px 0;
    label {
      margin: 11px 0 0 20px;
      font-size: 16px;
    }
  }
`;

const MemberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-weight: 500;
  div.member-title {
    min-width: 85px;
    svg {
      margin: -2px 9px 0 0;
    }
  }
  .MuiInputBase-root {
    max-width: 70%;
    fieldset {
      border: transparent;
    }
  }
  svg.MuiSelect-icon {
    padding: 12px 13px 16px;
    background: #fff url(/images/chevron_down.png) center no-repeat;
    transition: all 0.2s ease;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 20px 10px 20px;
  border-bottom: 1px solid #ebebeb;
  div.category-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
    strong {
      word-break: keep-all;
    }
    svg {
      margin-right: 11px;
    }
  }
  div.category-inputs {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 2px 4px;
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
