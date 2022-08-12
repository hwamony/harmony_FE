import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import { Button } from '@mui/material';

const Setting = () => {
  const navigate = useNavigate();
  const { actions } = useAuth();

  return (
    <div>
      <BtnAuth
        variant="contained"
        onClick={() => {
          localStorage.setItem('TOKEN', 'fake_value');
          actions.onLoggedIn();
          navigate('/');
        }}
      >
        토큰추가하기(로그인)
      </BtnAuth>

      <BtnAuth
        variant="contained"
        onClick={() => {
          localStorage.removeItem('TOKEN');
          actions.onLoggedOut();
          navigate('/login');
        }}
      >
        토큰없애기(로그아웃)
      </BtnAuth>

      <BtnAuth variant="outlined" onClick={() => navigate('/login')}>
        <p>로그인페이지로 가기</p>
      </BtnAuth>

      <BtnAuth variant="outlined" onClick={() => navigate('/signup')}>
        <p>회원가입페이지로 가기</p>
      </BtnAuth>
    </div>
  );
};

export default Setting;

const BtnAuth = styled(Button)`
  display: block;
  margin: 20px auto;
  border-radius: 30px;
`;
