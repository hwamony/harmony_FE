import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import PageTitle from '../../components/common/PageTitle';

import { KAKAO_AUTH_URL } from '../../utils/OAuth';
import { Button } from '../../styles/Button';
import { Input } from '../../styles/Input';
import { Container, LogoWrap, InputWrap, BtnWrap, SocialLoginBtn, LoginDesc, SignupLink, ErrorMsg } from './style';
import api from '../../api/AxiosManager';

const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = useState('');
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (pathname !== '/') navigate('/');
  }, [pathname]);

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
          <SocialLoginBtn href={KAKAO_AUTH_URL}>
            <img
              src={`${process.env.PUBLIC_URL}/images/kakao.png`}
              alt="카카오"
            />
            <LoginDesc>카카오 로그인</LoginDesc>
          </SocialLoginBtn>
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
