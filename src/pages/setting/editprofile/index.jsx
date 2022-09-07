import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, RadioInput } from '../../../styles/Input';
import { Button, InlineButton } from '../../../styles/Button';
import { Label, RadioLabel } from '../../../styles/Label';
import api from '../../../api/AxiosManager';
import PageTitle from '../../../components/common/PageTitle';
import HeaderMid from '../../../components/common/HeaderMid';
import { useUserProfile } from '../../../hooks/useData';

const EditProfile = () => {
  const { register, handleSubmit, getValues, errors } = useForm();
  const navigate = useNavigate();
  const { data: profile } = useUserProfile();
  const [nickname, setNickname] = useState('');

  const [isOverlap, setIsOverlap] = useState(false);

  const nicknameOverlapCheck = async (e) => {
    const nickname = getValues('nickname');
    try {
      const response = await api.post('/nickname-check', {
        nickname: nickname,
      });
      console.log('response >>', response);
      if (response.data.data.enable) {
        alert('사용가능한 닉네임입니다.');
        setIsOverlap(true);
      } else {
        alert('이미 존재하는 닉네임입니다.');
      }
    } catch (err) {
      console.log('Error >>', err.response.data);
      alert(err.response.data.message);
    }
    e.preventDefault();
  };

  const onSubmit = async (data) => {
    console.log({ nickname: nickname, updateFor: 'mypage' })
    // try {
    //   const response = await api.put('/mypage/profile', { nickname: nickname, updateFor: 'mypage' });
    //   console.log('response >>', response.data);
    //   alert('프로필 수정이 완료되었습니다.');
    //   navigate(-1);
    // } catch (err) {
    //   console.log('Error >>', err.response.data);
    // }
  };

  return (
    <>
      <PageTitle title="프로필 수정" />
      <HeaderMid text="프로필 수정" />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <InputWrap>
            <Label>
              이메일<Asterisk>*</Asterisk>
            </Label>
            <Input
              style={{ background: '#f2f2f2' }}
              placeholder="이메일를 입력해주세요."
              value={profile.email}
              disabled="disabled"
            />
          </InputWrap>

          <InputWrap>
            <Label>
              이름<Asterisk>*</Asterisk>
            </Label>
            <Input
              style={{ background: '#f2f2f2' }}
              placeholder="이름를 입력해주세요."
              value={profile.name}
              disabled="disabled"
            />
          </InputWrap>

          <InputWrap>
            <Label>
              닉네임<Asterisk>*</Asterisk>
            </Label>
            <Input
              style={{ width: 'calc(100% - 88px)' }}
              placeholder="닉네임를 입력해주세요."
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              ref={register({
                required: true,
                validate: () => isOverlap === true,
              })}
              autoComplete="off"
            />
            <InlineButton
              type="button"
              onClick={(e) => nicknameOverlapCheck(e)}
            >
              중복확인
            </InlineButton>
            <ErrorMsg>
              {errors.nickname &&
                errors.nickname.type === 'required' &&
                '닉네임을 입력해주세요.'}
              {errors.nickname &&
                errors.nickname.type === 'validate' &&
                '중복확인해주세요.'}
            </ErrorMsg>
          </InputWrap>

          <InputWrap>
            <Label>
              성별<Asterisk>*</Asterisk>
            </Label>
            <div>
              <RadioInput
                type="radio"
                id="male"
                value="male"
                disabled="disabled"
                checked={profile.gender === 'male' ? true : false}
              />
              <RadioLabel htmlFor="male" style={{ cursor: 'auto' }}>
                남성
              </RadioLabel>
              <RadioInput
                type="radio"
                id="female"
                value="female"
                disabled="disabled"
                checked={profile.gender === 'female' ? true : false}
              />
              <RadioLabel htmlFor="female" style={{ cursor: 'auto' }}>
                여성
              </RadioLabel>
            </div>
          </InputWrap>
          <ButtonWrap>
            <Button>수정 완료</Button>
          </ButtonWrap>
        </Body>
      </Container>
    </>
  );
};

export default EditProfile;

const Container = styled.form`
  height: 100vh;
  padding: 20px;
  position: relative;
  background: #ffffff;
`;

const Body = styled.div``;

const InputWrap = styled.div`
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Asterisk = styled.span`
  color: #c53737;
`;

const ButtonWrap = styled.div`
  margin-top: 40px;
`;

const ErrorMsg = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #c53737;
  margin-top: 8px;
`;
