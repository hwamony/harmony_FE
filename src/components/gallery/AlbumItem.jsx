import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import api from '../../api/AxiosManager';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import MoreHoriz from './MoreHoriz';
import CommentItem from './CommentItem';
import { IconComment } from '../../assets/icons';
import { MdExpandMore } from 'react-icons/md';
import {
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

const AlbumItem = ({ album, isLoading, title }) => {
  const navigate = useNavigate();
  const scheduleId = useParams().scheduleId;
  const commentInput = useRef();
  const queryClient = useQueryClient();

  const addComment = async (galleryId) => {
    const data = {
      content: commentInput.current.value,
    };
    console.log(data);
    try {
      const res = await api.post(`/galleries/${galleryId}/comments`, data);
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate: addCommentM } = useMutation(
    (galleryId) => addComment(galleryId),
    {
      onSuccess: (res) => {
        alert(res.data.msg);
        commentInput.current.value = '';
        queryClient.invalidateQueries(['albums', scheduleId]);
      },
    },
  );

  return (
    <Item>
      <ImgContainer onClick={() => navigate(`${album.id}`, { state: title })}>
        {isLoading
          ? Array.from(new Array(5)).map((_, i) => (
              <ImgSkeleton key={i} variant="rectangular" />
            ))
          : album.imageUrls.map((url, i) => <img key={i} src={url} alt="" />)}
      </ImgContainer>

      <MoreHoriz album={album} />

      <AlbumInfo>
        {isLoading ? (
          <div className="skeleton-wrapper">
            <strong>
              <Skeleton width="40px" height="20px" />
            </strong>
            <p>
              <Skeleton width="75px" height="15px" />
            </p>
          </div>
        ) : (
          <Accordion>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <InfoWrapper>
                <strong>{album.title}</strong>
                <span>
                  <IconComment />
                  {album.comments.length}
                </span>
              </InfoWrapper>
              <InfoWrapper>
                {dayjs(album.date).format('YYYY. MM. DD')}
              </InfoWrapper>
            </AccordionSummary>
            <AccordionDetails>
              <strong>
                댓글<span>{album.comments.length}</span>
              </strong>
              <ul>
                {album.comments.map((c) => (
                  <CommentItem key={c.id} comment={c} />
                ))}
              </ul>
              <form>
                <input
                  type="text"
                  placeholder="댓글을 입력하세요."
                  ref={commentInput}
                />
                <button type="button" onClick={() => addCommentM(album.id)}>
                  등록
                </button>
              </form>
            </AccordionDetails>
          </Accordion>
        )}
      </AlbumInfo>
    </Item>
  );
};

AlbumItem.propTypes = {
  album: PropTypes.object.isRequired,
  data: PropTypes.object,
};

export default AlbumItem;

const Item = styled.article`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);

  .MuiIconButton-sizeMedium {
    position: absolute;
    top: 0;
    right: 5px;
    width: 40px;
    height: 40px;
  }
`;

const ImgContainer = styled.div`
  /* FIXME: 반응형 수정해야 함 */
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 2px;
  /* max-height: 177px; */
  cursor: pointer;
  img {
    display: block;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(105%);
    }
    &:first-child {
      aspect-ratio: 4 / 3.55;
      grid-area: 1 / 1 / 3 / 4;
    }
  }
`;

const ImgSkeleton = styled(Skeleton)`
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  &:first-child {
    aspect-ratio: 4 / 3.55;
    grid-area: 1 / 1 / 3 / 4;
  }
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px 12px 18px;
  font-size: 12px;
  .skeleton-wrapper {
    height: 64px;
    padding-top: 15px;
  }
  .MuiAccordion-root,
  .MuiAccordionSummary-root,
  .MuiAccordionDetails-root {
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    height: auto;
  }
  .MuiAccordionSummary-content {
    flex-direction: column;
  }
  .MuiAccordionSummary-expandIconWrapper {
    position: absolute;
    right: -5px;
    bottom: 10px;
    svg {
      width: 20px;
    }
  }
  .MuiAccordionDetails-root {
    margin-top: -5px;
    strong {
      display: block;
      padding: 13px 0;
      color: #18191f;
      font-size: 15px;
      margin-bottom: 19px;
      border-bottom: 1px solid #dfdfdf;
      span {
        margin-left: 4px;
        color: #a9a9a9;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 30px 0;
      margin-bottom: 22px;
    }
    form {
      position: relative;
      input {
        display: block;
        width: 100%;
        padding: 14px 50px 14px 14px;
        margin-bottom: 8px;
        border-radius: 5px;
        background: #f2f2f2;
        &::placeholder {
          color: #9e9e9e;
          font-weight: 400;
        }
      }
      button {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 50px;
        color: ${({ theme }) => theme.palette.primary.main};
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  strong {
    font-size: 16px;
    margin-bottom: 5px;
  }
  span {
    margin-top: 2px;
    svg {
      margin-right: 5px;
    }
  }
`;
