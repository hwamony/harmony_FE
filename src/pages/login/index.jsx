import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useForm } from "react-hook-form";

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, InputWrap, BtnWrap, ForgotLink, SignupLink, ErrorMsg } from './style';
import api from '../../api/AxiosManager';

const Login = () => {
  const navigate = useNavigate();
  const { actions, isLoggedIn } = useAuth();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn]);

  const onSubmit = async (data) => {
    // 로그인 API 통신
    try {
      const response = await api.post('/login', data)
      localStorage.setItem('TOKEN', response.headers.authorization)
      actions.onLoggedIn();
      navigate('/');
    }
    catch(err) {
      console.log(err.response.data)
      document.getElementById('errMsg').innerText = '아이디와 비밀번호가 맞지 않습니다.'
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div
          style={{
            width: '160px',
            height: '74px',
            margin: 'auto',
            marginTop: '160px',
            background: '#D9D9D9',
          }}
        >
          LOGO
        </div>
      </div>
      <InputWrap>
        <Input
          placeholder="아이디를 입력해주세요." name="email"
          ref={register({ required: true })}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요." name="password"
          ref={register({ required: true })}
        />
        <ErrorMsg id='errMsg'></ErrorMsg>
      </InputWrap>
      <BtnWrap>
        <Button>LOGIN</Button>
        <ForgotLink>
          계정을 잊으셨나요? <strong onClick={() => navigate()}>ID찾기</strong>{' '}
          또는 <strong onClick={() => navigate()}>비밀번호 찾기</strong>
        </ForgotLink>
        <SignupLink onClick={() => navigate('/signup')}>
          아직 회원이 아니신가요? 회원가입
        </SignupLink>
      </BtnWrap>
    </Container>
  );
};

export default Login;
