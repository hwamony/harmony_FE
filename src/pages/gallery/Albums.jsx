import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/AxiosManager';

import styled from 'styled-components';
import HeaderMid from '../../components/common/HeaderMid';
import PageTitle from '../../components/common/PageTitle';
import BtnAdd from '../../components/common/BtnAdd';
import AlbumItem from '../../components/gallery/AlbumItem';

const Albums = () => {
  const scheduleId = useParams().scheduleId;

  const getAlbums = async () => {
    const res = await api.get(`/schedules/${scheduleId}/galleries`);
    return res.data.data;
  };

  const { data, isLoading } = useQuery(['albums', scheduleId], getAlbums, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <>
      <PageTitle title={`${data.scheduleTitle} - 갤러리`} />
      <HeaderMid text={data.scheduleTitle} />
      <BtnAdd link="/galleries/posts" text="앨범 추가" />
      {/* TODO: outlet 고려해보기 */}
      <AlbumsSection>
        {data.galleries.map((album) => (
          <AlbumItem
            key={album.id}
            album={album}
            isLoading={isLoading}
            title={data.scheduleTitle}
          />
        ))}
      </AlbumsSection>
    </>
  );
};

export default Albums;

const AlbumsSection = styled.section`
  position: relative;
  overflow-y: auto;
  min-height: calc(100vh - 55px - 65px);
  margin: 55px 0 65px;
  padding: 23px 20px 20px;
`;
