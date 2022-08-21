import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import PageTitle from '../../components/common/PageTitle';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import {
  Container,
  LogoWrap,
  InputWrap,
  BtnWrap,
  ForgotLink,
  SignupLink,
  ErrorMsg,
} from './style';
import api from '../../api/AxiosManager';

const Login = () => {
  const navigate = useNavigate();
  const [ errMsg, setErrMsg ] = useState('');
  const { actions, isLoggedIn } = useAuth();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn]);

  const onSubmit = async (data) => {
    // 로그인 API 통신
    try {
      const response = await api.post('/login', data);
      localStorage.setItem('TOKEN', response.headers.authorization);
      actions.onLoggedIn();
      navigate('/');
    } catch (err) {
      console.log(err.response.data);
      setErrMsg(err.response.data.message);
    }
  };

  return (
    <>
      {!isLoggedIn && (
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
                { errors.email && errors.password ? '아이디와 비밀번호를 입력해주세요.' : errMsg }
              </ErrorMsg>
            </InputWrap>
            <BtnWrap>
              <Button style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }}>로그인</Button>
              <ForgotLink>
                계정을 잊으셨나요?{' '}
                <strong onClick={() => navigate()}>ID찾기</strong> 또는{' '}
                <strong onClick={() => navigate()}>비밀번호 찾기</strong>
              </ForgotLink>
              <SignupLink onClick={() => navigate('/signup')}>
                아직 회원이 아니신가요? 회원가입
              </SignupLink>
            </BtnWrap>
          </Container>
        </>
      )}
    </>
  );
};

export default Login;
