import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/AxiosManager';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import { hwamokGrades } from '../../utils/data';
import MorePost from './MorePost';
import {
  IconIsLiked,
  IconLikeCount,
  IconCommentCount,
} from '../../assets/icons';

const LongCard = ({ post, postId }) => {
  const queryClient = useQueryClient();
  const { mutate: addLike } = useMutation(
    () => api.put(`/posts/${postId}/likes`, { like: true }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['communityPost', postId]);
      },
      onError: (err) => console.log(err),
    },
  );

  const { mutate: deleteLike } = useMutation(
    () => api.delete(`/posts/${postId}/likes`),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['communityPost', postId]);
      },
      onError: (err) => console.log(err),
    },
  );

  return (
    <>
      <CardContainer>
        <CardTitle>
          <div>
            <em>카테고리 | {post.category}</em>
            <h2>{post.title}</h2>
          </div>
          {post.iamPoster && <MorePost post={post} />}
        </CardTitle>

        <Profile>
          {/* TODO: {post.poster.flower}꽃여부 */}
          <Grade>
            <img
              src={hwamokGrades[`${post.poster.level}`].icon}
              alt={hwamokGrades[`${post.poster.level}`].name}
            />
          </Grade>
          <Info>
            <strong>{post.poster.nickname}</strong>
            <p>{dayjs(post.createdAt).format('YYYY년 M월 D일')}</p>
          </Info>
        </Profile>

        <CardContent>
          <Content>
            <Textarea
                defaultValue={post.content}
                wrap="hard"
                spellCheck="false"
                required
                className="album-content"
                readOnly
              />
            {post.imageUrl && <img src={post.imageUrl} alt="" />}
          </Content>

          <Tags>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </Tags>

          <Counts>
            {post.like ? (
              <small onClick={deleteLike} className="btn-like">
                <IconIsLiked />
                좋아요 {post.likeCount}
              </small>
            ) : (
              <small onClick={addLike} className="btn-like">
                <IconLikeCount />
                좋아요 {post.likeCount}
              </small>
            )}

            <small>
              <IconCommentCount />
              댓글 {post.comments.length}
            </small>
          </Counts>
        </CardContent>
      </CardContainer>
    </>
  );
};

LongCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default LongCard;

const CardContainer = styled.article`
  padding: 30px 20px 14px;
  margin-bottom: 8px;
  background: #fff;
`;

const CardTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  em {
    display: block;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.palette.primary.main};
    font-style: normal;
    font-size: 14px;
  }
  h2 {
    font-size: 20px;
    font-weight: 600;
  }

  svg circle {
    fill: #bababa;
  }
  .MuiIconButton-root {
    height: 34px;
    margin-top: -17px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
`;

export const Grade = styled.div`
  width: 25px;
  height: 25px;
  min-width: 25px;
  min-height: 25px;
  margin-right: 8px;
  border-radius: 50%;
  background: #eee;
`;

export const Info = styled.div`
  strong {
    color: #18191f;
    font-size: 14px;
    font-weight: 700;
  }
  p {
    color: #9e9e9e;
    font-size: 11px;
    font-weight: 400;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin: 18px 0 7.5px;
  img {
    display: block;
    max-width: 600px;
    width: 100%;
    margin: 0 auto 22px;
    object-fit: cover;
  }
`;

export const Tags = styled.div`
  margin-bottom: 21px;
  span {
    padding: 3px 8px;
    margin-right: 6px;
    border-radius: 45px;
    background: #ededed;
    color: #707070;
    font-size: 14px;
  }
`;

export const Counts = styled.div`
  display: flex;
  padding-top: 12px;
  border-top: 1px solid #dfdfdf;
  small {
    display: flex;
    align-items: center;
    margin-right: 9px;
    font-size: 12px;
    &.btn-like {
      cursor: pointer;
    }
    svg {
      margin-right: 5px;
    }
  }
`;

const Textarea = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  margin-bottom: 14px;
  border: none;
  outline: none;
  line-height: 1.5;
  font-size: 15px;
  color: #000;
  resize: none;
`;
