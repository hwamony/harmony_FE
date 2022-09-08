import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { socialApi } from '../../../api/AxiosManager';
import PuffLoader from 'react-spinners/PuffLoader';
import styled from 'styled-components';

const Kakao = () => {
  // 카카오로부터 받은 인가코드를 변수에 저장
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const getKakaoToken = async () => {
    // 받은 인가코드를 우리 서버로 전달하는 코드
    try {
      const res = await socialApi.get(`/login/oauth2/kakao?code=${code}`);
      console.log('성공>>', res);

      // 서버와 api 통신을 통해 카카오에서 발급한 토큰을 로컬스토리지에 저장
      localStorage.setItem('TOKEN', res.headers.authorization);

      // 쿼리키 리프레시
      queryClient.invalidateQueries(['familyInfo']);
      queryClient.invalidateQueries(['validUserInfo']);

      // 리다이렉트
      window.location.href = '/';
    } catch (err) {
      console.log('실패>>', err);
    }
  };

  useEffect(() => {
    getKakaoToken();
  }, []);

  return (
    <Container>
      <PuffLoader />
    </Container>
  );
};

export default Kakao;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
