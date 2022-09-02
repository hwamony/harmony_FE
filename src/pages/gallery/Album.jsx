import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import api from '../../api/AxiosManager';
import styled from 'styled-components';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setOnSelect, setOnSelectAll } from '../../redux/modules/gallerySlice';

import BtnAdd from '../../components/common/BtnAdd';
import ImageItem from '../../components/gallery/ImageItem';
import ImageModal from '../../components/gallery/ImageModal';
import { IconSave } from '../../assets/icons';
import { FiTrash2 } from 'react-icons/fi';

const Album = () => {
  const params = useParams();
  const { scheduleId, galleryId } = params;
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { onSelect, onSelectAll } = useSelector((state) => state.gallery);
  const [checkedImgs, setCheckedImgs] = useState(new Set());
  const [size, setSize] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [curImage, setCurImage] = useState('');

  const getAlbumSchedules = async () => {
    const res = await api.get(`/schedules/${scheduleId}/galleryList`);
    return res.data.data;
  };

  const { data: scheduleList } = useQuery(
    ['albumSchedules', scheduleId],
    getAlbumSchedules,
    {
      refetchOnWindowFocus: false,
    },
  );

  const getAlbumImages = async () => {
    const res = await api.get(`/galleries/${galleryId}/images`);
    return res.data.data;
  };

  const { data: imageList } = useQuery(
    ['albumImages', galleryId],
    getAlbumImages,
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    return () => {
      dispatch(setOnSelect(false));
      dispatch(setOnSelectAll(false));
    };
  }, [pathname]);

  useEffect(() => {
    setCheckedImgs(new Set());
    setSize(0);
  }, [onSelect]);

  useEffect(() => {
    setCheckedImgs(new Set(imageList.images.map(({ id }) => id)));
    setSize(imageList.images.length);
  }, [onSelectAll]);

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

  const deleteImg = async (data) => {
    const res = await api.delete(`/galleries/${galleryId}/images`, {
      data: data,
    });
    return res;
  };

  const queryClient = useQueryClient();
  const { mutate: deleteImages } = useMutation(
    () => deleteImg({ imageIds: [...checkedImgs] }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['albumImages']);
        setCheckedImgs(new Set());
        setSize(0);
        dispatch(setOnSelect(false));
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  const downloadMultipleImages = async () => {
    const srcs = [...checkedImgs].map(
      (id) => imageList.images.filter((img) => img.id === id)[0].url,
    );

    for (let src of srcs) {
      window.open(src);
    }
  };

  return (
    <AlbumSection>
      <BtnAdd
        link={`/galleries/posts/${galleryId}`}
        text="사진 추가"
        photo={true}
      />

      <AlbumList>
        {scheduleList.galleries.map((album) => (
          <li
            key={album.id}
            className={cn(parseInt(galleryId) === album.id && 'selected')}
          >
            <a
              rel="noreferrer"
              href={`/galleries/${scheduleId}/${album.id}`}
              replace="true"
            >
              {album.title}
            </a>
          </li>
        ))}
      </AlbumList>

      <ImageList>
        {imageList.images.map((img) => (
          <ImageItem
            key={img.id}
            img={img}
            handleCheck={handleCheck}
            setIsVisible={setIsVisible}
            setCurImage={setCurImage}
          />
        ))}
      </ImageList>

      {isVisible === true && (
        <ImageModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          url={curImage}
          date={imageList.date}
        />
      )}

      <SelectFooter className={cn(onSelect && 'on')}>
        <button onClick={downloadMultipleImages}>
          <IconSave />
        </button>
        <strong>선택 {size}</strong>
        <button onClick={deleteImages}>
          <FiTrash2 />
        </button>
      </SelectFooter>
    </AlbumSection>
  );
};

export default Album;

const AlbumSection = styled.section`
  position: relative;
  overflow-y: auto;
  min-height: calc(100vh - 55px - 65px);
  padding: 20px 20px 65px;
`;

const AlbumList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 24px;
  li {
    font-size: 14px;
    border: 1px solid #aaa;
    border-radius: 57px;
    &.selected {
      font-weight: 700;
      border-color: ${({ theme }) => theme.palette.primary.main};
      a {
        color: ${({ theme }) => theme.palette.primary.main};
      }
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
    width: 100%;
    height: 100%;
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
  bottom: -64px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  margin-left: -20px;
  padding: 0 17px;
  background: #fff;
  color: #868686;
  font-size: 12px;
  transition: bottom 0.2s ease-in-out;
  z-index: 150;
  &.on {
    bottom: 0;
  }
  strong {
    display: flex;
    align-items: center;
    height: 100%;
    color: #18191f;
    font-size: 14px;
    font-weight: 700;
  }
  button {
    svg {
      margin: 0;
    }
  }
  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;
  }

  @media only screen and (min-width: 1025px) {
    width: 500px;
  }
`;
