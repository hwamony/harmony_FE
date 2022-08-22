import React from 'react';
import styled from 'styled-components';

import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import { Button } from '../../components/Button';

const PostAlbum = () => {
  return (
    <>
      <PageTitle title="앨범생성 - 갤러리" />
      <HeaderMid text="앨범생성" />
      PostAlbum
      <AlbumForm>
        <Button>생성하기</Button>
      </AlbumForm>
    </>
  );
};

export default PostAlbum;

const AlbumForm = styled.form`
  button {
    position: fixed;
    left: 20px;
    bottom: 35px;
    width: calc(100% - 40px);
  }
`;
