import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import PageTitle from '../../components/common/PageTitle';

import { Button, OutlineButton } from '../../components/Button';
import { Input } from '../../components/Input';
import {
  Container,
  LogoWrap,
  InputWrap,
  BtnWrap,
  SocialLoginWrap,
  SocialLogin,
  LoginDesc,
  ForgotLink,
  SignupLink,
  ErrorMsg,
} from './style';
import api from '../../api/AxiosManager';

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    // 로그인 API 통신
    try {
      const response = await api.post('/login', data);
      localStorage.setItem('TOKEN', response.headers.authorization);
      queryClient.invalidateQueries(['familyInfo']);
      queryClient.invalidateQueries(['validUserInfo']);
      window.location.href = '/';
    } catch (err) {
      console.log(err.response.data);
      setErrMsg(err.response.data.message);
    }
  };

  const socialKakao = async () => {
    alert('소셜로그인 - 카카오');

    // 추후 엔드포인트 연결
    const res = api.get('');
    console.log(res);
  };

  const socialGoogle = async () => {
    alert('소셜로그인 - 구글');

    // 추후 엔드포인트 연결
    const res = api.get('');
    console.log(res);
  };

  return (
    <>
      <PageTitle title="로그인" />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <LogoWrap>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
        </LogoWrap>
        <InputWrap>
          <Input
            placeholder="아이디를 입력해주세요."
            name="email"
            style={{ background: '#F2F2F2' }}
            ref={register({ required: true })}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            style={{ background: '#F2F2F2' }}
            ref={register({ required: true })}
          />
          <ErrorMsg>
            {errors.email && errors.password
              ? '아이디와 비밀번호를 입력해주세요.'
              : errMsg}
          </ErrorMsg>
        </InputWrap>
        <BtnWrap>
          <Button style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}>
            로그인
          </Button>
          <SocialLoginWrap>
            <SocialLogin style={{ paddingLeft: '0' }}>
              <OutlineButton onClick={socialKakao}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/kakao.png`}
                  alt="카카오"
                />
                <LoginDesc>카카오 로그인</LoginDesc>
              </OutlineButton>
            </SocialLogin>
            <SocialLogin style={{ paddingRight: '0' }}>
              <OutlineButton onClick={socialGoogle}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/google.png`}
                  alt="구글"
                />
                <LoginDesc>구글 로그인</LoginDesc>
              </OutlineButton>
            </SocialLogin>
          </SocialLoginWrap>
          <SignupLink onClick={() => navigate('/signup')}>
            <>
              아직 회원이 아니신가요? <strong>회원가입</strong>
            </>
          </SignupLink>
        </BtnWrap>
      </Container>
    </>
  );
};

export default Login;
