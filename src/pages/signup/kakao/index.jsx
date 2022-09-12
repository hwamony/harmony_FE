import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import PageTitle from '../../../components/common/PageTitle';
import { Input, RadioInput } from '../../../styles/Input';
import { Button, InlineButton } from '../../../styles/Button';
import { Label, RadioLabel } from '../../../styles/Label';
import api from '../../../api/AxiosManager';

const SignupKakao = () => {
  const { register, handleSubmit, getValues, errors } = useForm();
  const queryClient = useQueryClient();

  const [isOverlap, setIsOverlap] = useState(false);

  const onSubmit = async (data) => {
    try {
      await api.put('/mypage/profile', {
        ...data,
        updateFor: 'kakao',
      });
      alert('환영합니다! 이어서 가족 정보를 입력해주세요.');
      window.location.href = '/';
      return queryClient.invalidateQueries(['familyInfo']);
    } catch (err) {
      console.log('Error >>', err.response.data);
      alert('문제가 발생했습니다.');
    }
  };

  const nicknameOverlapCheck = async (e) => {
    const nickname = getValues('nickname');
    try {
      const response = await api.post('/nickname-check', {
        nickname: nickname,
      });

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

  return (
    <>
      <PageTitle title="카카오 - 추가 정보 입력" />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Top>
          <Title>추가 정보 입력</Title>
        </Top>
        <Body>
          <IconWrap>
            <CongraturaionIcon>
              <img
                src={`${process.env.PUBLIC_URL}/images/congratulations.png`}
                alt="로고"
              />
            </CongraturaionIcon>
            <IconTitle>회원가입이 완료되었습니다.</IconTitle>
            <IconDesc>
              원활한 서비스 사용을 위해
              <br />
              추가 정보를 입력해주세요.
            </IconDesc>
          </IconWrap>
          <InputWrap style={{ marginTop: '60px' }}>
            <Label>
              닉네임<Asterisk>*</Asterisk>
            </Label>
            <Input
              style={{ width: 'calc(100% - 88px)' }}
              placeholder="닉네임을 입력해주세요."
              name="nickname"
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
                '중복 확인해주세요.'}
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
                name="gender"
                value="male"
                ref={register({ required: true })}
              />
              <RadioLabel htmlFor="male">남성</RadioLabel>
              <RadioInput
                type="radio"
                id="female"
                name="gender"
                value="female"
                ref={register({ required: true })}
              />
              <RadioLabel htmlFor="female">여성</RadioLabel>
              <ErrorMsg>
                {errors.gender &&
                  errors.gender.type === 'required' &&
                  '성별을 선택해주세요.'}
              </ErrorMsg>
            </div>
          </InputWrap>
          <ButtonWrap>
            <Button>입력완료</Button>
          </ButtonWrap>
        </Body>
      </Container>
    </>
  );
};

export default SignupKakao;

const Container = styled.form`
  height: 100vh;
  padding: 20px;
  position: relative;
  background: #ffffff;
`;

const Top = styled.div`
  width: 100%;
  height: 50px;
  padding: 15px 0;
  background: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
`;

const Body = styled.div``;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

const IconWrap = styled.div`
  margin-top: 210px;
`;

const CongraturaionIcon = styled.div`
  text-align: center;
`;

const IconTitle = styled.div`
  margin-top: 50px;
  font-size: 18px;
  font-weight: 600;
  line-height: 21px;
  text-align: center;
  color: #191919;
`;

const IconDesc = styled.div`
  margin-top: 18px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
  color: #191919;
`;

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
