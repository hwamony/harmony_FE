import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { IconCheck } from '../../assets/icons';

const Album = () => {
  const params = useParams();
  const { onSelect, onSelectAll } = useSelector((state) => state.gallery);
  // FIXME: API 요청할 때는 캐싱된 데이터 사용하기
  const location = useLocation();
  const albumsData = location.state;

  // TODO: 이미지id를 checkList 배열에 담기
  // TODO: 전체 선택 기능 구현하기

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
          <ImageList>
            {albumsData.albums
              .filter((v) => v.albumId === parseInt(params.albumId))[0]
              .images.map((url, i) => (
                <div key={i}>
                  {onSelect && (
                    <>
                      <input
                        type="checkbox"
                        name="check-img"
                        id={url}
                        value={url}
                        hidden
                      />
                      <label htmlFor={url} className="label-check">
                        <IconCheck />
                        <span className="hidden">사진 선택</span>
                      </label>
                    </>
                  )}
                  {onSelect ? (
                    <label htmlFor={url}>
                      <img src={url} alt="" />
                    </label>
                  ) : (
                    <img src={url} alt="" />
                  )}
                </div>
              ))}
          </ImageList>
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

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 2px;
  div {
    position: relative;
  }
  img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
  label {
    cursor: pointer;
  }
  label.label-check {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border: 1px solid #fff;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    svg {
      margin: 2px 0 0 5px;
    }
  }
  input:checked + label.label-check {
    background: ${({ theme }) => theme.palette.primary.main};
  }
`;
