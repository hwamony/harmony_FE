import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import cn from 'classnames';

const Album = () => {
  const params = useParams();
  // FIXME: API 요청할 때는 캐싱된 데이터 사용하기
  const location = useLocation();
  const albumsData = location.state;
  console.log(albumsData);
  return (
    <>
      {albumsData && (
        <>
          <Header title="갤러리" subtitle={albumsData.name} select={true} />
          <AlbumList>
            {albumsData.albums.map((album) => (
              <li
                key={album.albumId}
                className={cn(
                  parseInt(params.albumId) === album.albumId && 'selected',
                )}
              >
                <Link
                  // to={`/galleries/${albumsData.scheduleId}/${album.albumId}`}
                  to={`/galleries/${albumsData.scheduleId}`}
                >
                  {album.name}
                </Link>
              </li>
            ))}
          </AlbumList>
        </>
      )}
    </>
  );
};

export default Album;

const AlbumList = styled.ul`
  display: flex;
  gap: 9px;
  margin-bottom: 24px;
  li {
    font-size: 14px;
    border: 1px solid #aaa;
    border-radius: 57px;
    &.selected {
      font-weight: 700;
      border-color: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.main};
    }
    a {
      display: block;
      padding: 8px 18px;
    }
  }
`;
