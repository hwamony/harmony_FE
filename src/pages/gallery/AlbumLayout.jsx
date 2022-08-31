import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useAlbumsData } from '../../hooks/useData';
import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';

const AlbumLayout = () => {
  const scheduleId = useParams().scheduleId;
  const { data } = useAlbumsData(scheduleId);

  return (
    <>
      <PageTitle title={`${data.scheduleTitle} - 갤러리`} />
      <HeaderMid text={data.scheduleTitle} />
      <Outlet />
    </>
  );
};

export default AlbumLayout;
