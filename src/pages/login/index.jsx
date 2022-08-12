import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, InputWrap, BtnWrap, ForgotLink, SignupLink } from './style';
import api from '../../api/AxiosManager';

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, actions } = useAuth();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn]);

  const LoginApi = async () => {
    // 로그인 API 통신
    // try {
    //     const response = await api.post('/api/login', {
    //         email: email,
    //         password: pw
    //     })
    //     localStorage.setItem('user', response)
    // }
  };

  return (
    <Container>
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
          placeholder="아이디를 입력해주세요."
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={(e) => setPw(e.target.value)}
        />
      </InputWrap>
      <BtnWrap>
        <Button
          // onClick={() => LoginApi}
          onClick={() => {
            localStorage.setItem('TOKEN', 'fake_value');
            actions.onLoggedIn();
            navigate('/');
          }}
        >
          LOGIN
        </Button>
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
