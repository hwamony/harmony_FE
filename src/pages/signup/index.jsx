import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/AxiosManager';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import useAuth from '../../hooks/useAuth';

import { Input, Checkinput, RadioInput } from '../../styles/Input';
import { Button, InlineButton, BackButton } from '../../styles/Button';
import { Label, RadioLabel } from '../../styles/Label';
import { Container, Top, Title, InputWrap, Asterisk, PolicyWrap, PolicyCheck, PolicyIcon, ButtonWrap, ErrorMsg } from './style';

const Signup = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const { register, handleSubmit, watch, getValues, errors } = useForm();
  const password = useRef();
  password.current = watch('password');

  const [isOverlap, setIsOverlap] = useState({
    email: false,
    nickname: false,
  });

  const onSubmit = async (data) => {
    try {
      await api.post('/signup', data);
      navigate('/signup/complete');
    } catch (err) {
      console.log('Error >>', err.response.data);
    }
  };

  const idOverlapCheck = async (e) => {
    const email = getValues('email');
    try {
      const response = await api.post('/email-check', {
        email: email,
      });
      setIsOverlap((prev) => {
        return { ...prev, email: true };
      });
      {
        response.data.data.enable
          ? alert('사용 가능한 이메일입니다.')
          : alert('이미 존재하는 이메일입니다.');
      }
    } catch (err) {
      console.log('Error >>', err.response.data);
      alert(err.response.data.message);
    }
    e.preventDefault();
  };

  const nicknameOverlapCheck = async (e) => {
    const nickname = getValues('nickname');
    try {
      const response = await api.post('/nickname-check', {
        nickname: nickname,
      });
      setIsOverlap((prev) => {
        return { ...prev, nickname: true };
      });
      {
        response.data.data.enable
          ? alert('사용 가능한 닉네임입니다.')
          : alert('이미 존재하는 닉네임입니다.');
      }
    } catch (err) {
      console.log('Error >>', err.response.data);
      alert(err.response.data.message);
    }
    e.preventDefault();
  };

  return (
    <>
      {!isLoggedIn && (
        <>
          <PageTitle title="회원가입" />
          <Container onSubmit={handleSubmit(onSubmit)}>
            <Top>
              <BackButton
                src={`${process.env.PUBLIC_URL}/images/back.png`}
                alt="뒤로가기"
                onClick={() => navigate(-1)}
              />
              <Title>회원가입</Title>
            </Top>
            <InputWrap style={{ marginTop: '63px' }}>
              <Label>
                이메일<Asterisk>*</Asterisk>
              </Label>
              <Input
                style={{ width: 'calc(100% - 88px)' }}
                placeholder="이메일을 입력해주세요."
                name="email"
                ref={register({
                  required: true,
                  pattern: /^\S+@\S+$/i,
                  validate: () => isOverlap.email === true,
                })}
              />
              <InlineButton type="button" onClick={(e) => idOverlapCheck(e)}>
                중복확인
              </InlineButton>
              <ErrorMsg>
                {errors.email &&
                  errors.email.type === 'required' &&
                  '이메일을 입력해주세요.'}
                {errors.email &&
                  errors.email.type === 'pattern' &&
                  '올바른 형식이 아닙니다.'}
                {errors.email &&
                  errors.email.type === 'validate' &&
                  '중복 확인해주세요.'}
              </ErrorMsg>
            </InputWrap>

            <InputWrap>
              <Label>
                비밀번호<Asterisk>*</Asterisk>
              </Label>
              <Input
                placeholder="비밀번호를 입력해주세요."
                name="password"
                type="password"
                ref={register({
                  required: true,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/,
                })}
              />
              <ErrorMsg>
                {errors.password &&
                  errors.password.type === 'required' &&
                  '비밀번호를 입력해주세요.'}
                {errors.password &&
                  errors.password.type === 'pattern' &&
                  '비밀번호는 8~20자 사이의 영문, 숫자, 특수문자를 사용하여 입력해주세요.'}
              </ErrorMsg>
            </InputWrap>

            <InputWrap>
              <Label>
                비밀번호 확인<Asterisk>*</Asterisk>
              </Label>
              <Input
                placeholder="비밀번호를 한 번 더 입력해주세요."
                name="passwordConfirm"
                type="password"
                ref={register({
                  required: true,
                  validate: (value) => value === password.current,
                })}
              />
              <ErrorMsg>
                {errors.passwordConfirm &&
                  errors.passwordConfirm.type === 'required' &&
                  '비밀번호를 다시 한번 입력해주세요.'}
                {errors.passwordConfirm &&
                  errors.passwordConfirm.type === 'validate' &&
                  '비밀번호가 동일하지 않습니다.'}
              </ErrorMsg>
            </InputWrap>

            <InputWrap>
              <Label>
                이름<Asterisk>*</Asterisk>
              </Label>
              <Input
                placeholder="이름을 입력해주세요."
                name="name"
                ref={register({ required: true })}
                autoComplete="off"
              />
              <ErrorMsg>
                {errors.name &&
                  errors.name.type === 'required' &&
                  '이름을 입력해주세요.'}
              </ErrorMsg>
            </InputWrap>

            <InputWrap>
              <Label>
                닉네임<Asterisk>*</Asterisk>
              </Label>
              <Input
                style={{ width: 'calc(100% - 88px)' }}
                placeholder="닉네임을 입력해주세요."
                name="nickname"
                ref={register({
                  required: true,
                  validate: () => isOverlap.nickname === true,
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

            <PolicyWrap>
              {/* <PolicyDesc>
                화목 이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
              </PolicyDesc>
              <PolicyLink onClick={() => navigate()}>더 알아보기</PolicyLink> */}
              <PolicyCheck>
                <Checkinput
                  type="checkbox"
                  id="policy"
                  name="policy"
                  value="agree"
                  ref={register({ required: true })}
                />
                <Label htmlFor="policy">
                  <PolicyIcon
                    src={`${process.env.PUBLIC_URL}/images/check_8px.png`}
                    alt="아이콘"
                  />
                  <span style={{ marginLeft: '4px', fontWeight: '400' }}>
                    화목 회원가입에 동의합니다.
                  </span>
                </Label>
              </PolicyCheck>
              <ErrorMsg>
                {errors.policy &&
                  errors.policy.type === 'required' &&
                  '약관에 동의해주세요.'}
              </ErrorMsg>
            </PolicyWrap>

            <ButtonWrap>
              <Button>가입하기</Button>
            </ButtonWrap>
          </Container>
        </>
      )}
    </>
  );
};

export default Signup;
