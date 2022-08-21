import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import Header from '../../components/common/Header';
import BtnAdd from '../../components/common/BtnAdd';

const Gallery = () => {
  return (
    <>
      <PageTitle title="갤러리" />
      <Header title="갤러리" />
      <BtnAdd link="/galleries/posts" text="앨범 추가" />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Gallery;

const Main = styled.main`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 70px - 65px);
  margin-top: 60px;
  padding: 20px;
`;
