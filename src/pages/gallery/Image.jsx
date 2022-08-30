import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMid from '../../components/common/HeaderMid';

const Image = () => {
  const location = useLocation();
  const url = location.state.url;
  return (
    <ImageSection>
      <HeaderMid text="8월 2일" subtext="오후 10:53" />
      {/* TODO: MoreHoriz - 내려받기, 삭제 메뉴 추가 */}
      <img src={url} alt="" />
    </ImageSection>
  );
};

export default Image;

const ImageSection = styled.section`
  overflow: auto;
  position: relative;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 55px - 65px);
  margin: 55px 0 65px;
  img {
    /* width: 100%; */
    /* max-width: 820px; */
    min-height: calc(100vh - 55px - 65px);
    object-fit: cover;
  }
`;
