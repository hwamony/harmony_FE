import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MoreVert from '../calendar/MoreVert';
import { IconLikeCount, IconCommentCount } from '../../assets/icons';

const ShortCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <>
      <CardContainer>
        <CardTitle>
          <Profile>
            {/* TODO: {post.poster.flower}꽃여부 */}
            <Photo>{post.poster.level}</Photo>
            <Info>
              <strong>{post.poster.nickname}</strong>
              <p>{dayjs(post.createdAt).format('YYYY년 M월 D일')}</p>
            </Info>
          </Profile>
          {/* FIXME: MoreVert 수정, margin-right -7px */}
          <MoreVert />
        </CardTitle>

        <CardContent>
          <Content>
            <div>
              <h2>{post.title}</h2>
              <p onClick={() => navigate(`/community/posts/${post.postId}`)}>
                {post.content} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Tenetur neque explicabo cumque quae, tempora
                ullam iusto vero? Incidunt, distinctio dolor!
              </p>
            </div>
            <img src={post.imageUrl} alt="" />
          </Content>

          <Tags>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </Tags>

          <CardGood>
            {/* TODO: 좋아요 여부(isLiked) 받아와야 함 */}
            <small>
              <IconLikeCount />
              좋아요 {post.likeCount}
            </small>
            <small onClick={() => navigate(`/community/posts/${post.postId}`)}>
              <IconCommentCount />
              댓글 {post.commentCount}
            </small>
          </CardGood>
        </CardContent>
      </CardContainer>
    </>
  );
};

ShortCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ShortCard;

export const CardContainer = styled.article`
  margin-bottom: 9px;
  padding: 15px 14px 14px 19px;
  background: #fff;
`;

export const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    color: gray;
    font-size: 13px;
    font-weight: bolder;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

export const Photo = styled.div`
  background-color: #eee;
  width: 25px;
  height: 25px;
  margin-right: 8px;
  border-radius: 50%;
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

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0 7.5px;
  h2 {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 600;
  }
  p {
    overflow: hidden;
    display: -webkit-box;
    width: 100%;
    margin-bottom: 14px;
    color: #898989;
    font-size: 13px;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  img {
    width: 100%;
    height: 100%;
    max-width: 55px;
    max-height: 55px;
    margin-left: 12px;
    border-radius: 5px;
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

export const CardGood = styled.div`
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
