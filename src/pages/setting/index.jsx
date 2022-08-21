import React from 'react';
import PageTitle from '../../components/common/PageTitle';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import { Button } from '@mui/material';

const Setting = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actions } = useAuth();

  return (
    <>
      <PageTitle title="설정" />
      <div>
        <BtnAuth
          variant="contained"
          onClick={() => {
            localStorage.removeItem('TOKEN');
            actions.onLoggedOut();
            queryClient.invalidateQueries(['familyInfo']);
            navigate('/login');
          }}
        >
          로그아웃 (토큰 삭제)
        </BtnAuth>

        <BtnAuth variant="outlined" onClick={() => navigate('/login')}>
          <p>로그인 링크 (로그인 시 진입 X)</p>
        </BtnAuth>

        <BtnAuth variant="outlined" onClick={() => navigate('/signup')}>
          <p>회원가입 링크 (로그인 시 진입 X)</p>
        </BtnAuth>
      </div>
    </>
  );
};

export default Setting;

const BtnAuth = styled(Button)`
  display: block;
  margin: 20px auto;
  border-radius: 30px;
`;
