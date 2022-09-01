import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconLikeCount, IconCommentCount } from '../../assets/icons';
import { hwamokGrades } from '../../utils/data';

const LongCard = ({ post }) => {
  return (
    <>
      <CardContainer>
        <CardTitle>
          {/* TODO: api에 카테고리 값 추가로 받아오기 */}
          {/* <em>{post.category}</em> */}
          <h2>{post.title}</h2>
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
            {/* FIXME: textarea로 수정 */}
            <p>{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="" />}
          </Content>

          <Tags>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </Tags>

          <Counts>
            {/* TODO: 좋아요 여부(like) 받아와서 색깔 적용 */}
            <small>
              <IconLikeCount />
              좋아요 {post.likeCount}
            </small>
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
  margin-bottom: 20px;
  em {
    display: block;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.palette.primary.main};
    font-style: normal;
    font-size: 13px;
  }
  h2 {
    font-size: 20px;
    font-weight: 600;
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
  h2 {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 600;
  }
  p {
    width: 100%;
    margin-bottom: 14px;
    color: #000;
    font-size: 14px;
    line-height: 1.5;
  }
  img {
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
    font-size: 13px;
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
    svg {
      margin-right: 5px;
    }
  }
`;
