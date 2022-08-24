import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setOnSelect, setOnSelectAll } from '../../redux/modules/gallerySlice';
import HeaderMid from '../../components/common/HeaderMid';
import { IconSave } from '../../assets/icons';
import { FiTrash2 } from 'react-icons/fi';
import ImageItem from '../../components/gallery/ImageItem';

const Album = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { onSelect, onSelectAll } = useSelector((state) => state.gallery);
  const [checkedImgs, setCheckedImgs] = useState(new Set());
  const [size, setSize] = useState(0);
  // FIXME: API 요청할 때는 캐싱된 데이터 사용하기
  const location = useLocation();
  const albumsData = location.state;

  useEffect(() => {
    return () => {
      dispatch(setOnSelect(false));
      dispatch(setOnSelectAll(false));
    };
  }, []);

  useEffect(() => {
    // console.log([...checkedImgs]);
    setCheckedImgs(new Set());
    setSize(0);
  }, [onSelect]);

  const handleCheck = (id, isChecked) => {
    if (isChecked) {
      checkedImgs.add(id);
      setCheckedImgs(checkedImgs);
      setSize(checkedImgs.size);
    } else if (!isChecked && checkedImgs.has(id)) {
      checkedImgs.delete(id);
      setCheckedImgs(checkedImgs);
      setSize(checkedImgs.size);
    }
  };

  // TODO: 전체 선택 기능 구현하기

  return (
    <AlbumSection>
      {albumsData && (
        <>
          <HeaderMid text={albumsData.name} select={true} />
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
              .images.map((img) => (
                // FIXME: key와 url을 img.imageId로 수정하기
                <ImageItem key={img} url={img} handleCheck={handleCheck} />
              ))}
          </ImageList>
        </>
      )}

      <SelectFooter className={cn(onSelect && 'on')}>
        <IconSave />
        <strong>선택 {size}</strong>
        <FiTrash2 />
      </SelectFooter>
    </AlbumSection>
  );
};

export default Album;

const AlbumSection = styled.section`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 55px - 65px);
  margin-top: 55px;
  padding: 20px;
`;

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
  margin: 0 -20px;
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

const SelectFooter = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: -64px;
  display: flex;
  justify-content: space-between;
  height: 64px;
  padding: 0 17px;
  background: #fff;
  color: #868686;
  font-size: 12px;
  transition: all 0.2s ease-in-out;
  z-index: 150;
  &.on {
    bottom: 0;
  }
  strong {
    margin-top: 1em;
    color: #18191f;
    font-size: 14px;
    font-weight: 700;
  }
  svg {
    width: 24px;
    height: 24px;
    margin-top: 10px;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
