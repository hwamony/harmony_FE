import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BtnAdd from '../../components/common/BtnAdd';
import AlbumItem from '../../components/gallery/AlbumItem';
import { useAlbumsData } from '../../hooks/useData';

const Albums = () => {
  const scheduleId = useParams().scheduleId;
  const { data, isLoading } = useAlbumsData(scheduleId);

  return (
    <AlbumsSection>
      <BtnAdd link="/galleries/posts" text="앨범 추가" plus={true} />
      {data.galleries.map((album) => (
        <AlbumItem
          key={album.id}
          album={album}
          isLoading={isLoading}
          title={data.scheduleTitle}
        />
      ))}
    </AlbumsSection>
  );
};

export default Albums;

const AlbumsSection = styled.section`
  position: relative;
  overflow-y: auto;
  min-height: calc(100vh - 55px - 65px);
  padding: 23px 20px 20px;
`;
