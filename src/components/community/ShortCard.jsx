import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { IconLikeCount, IconCommentCount } from '../../assets/icons';
import { Grade, Profile, Info, CardContent, Tags, Counts } from './LongCard';
import { hwamokGrades } from '../../utils/data';

const ShortCard = ({ post }) => {
  return (
    <>
      <CardContainer>
        <Link to={`/community/posts/${post.postId}`}>
          <CardTitle>
            <Profile>
              {/* TODO: {post.poster.flower}꽃여부 */}
              <Grade>
                <img
                  src={hwamokGrades[post.poster.level].icon}
                  alt={hwamokGrades[post.poster.level].name}
                />
              </Grade>
              <Info>
                <strong>{post.poster.nickname}</strong>
                <p>{dayjs(post.createdAt).format('YYYY년 M월 D일')}</p>
              </Info>
            </Profile>
          </CardTitle>

          <CardContent>
            <Content>
              <div>
                <h2>{post.title}</h2>
                <p>
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

            <Counts>
              {/* TODO: 좋아요 여부(like) 받아와서 색깔 적용 */}
              <small>
                <IconLikeCount />
                {post.likeCount}
              </small>
              <small>
                <IconCommentCount />
                {post.commentCount}
              </small>
            </Counts>
          </CardContent>
        </Link>
      </CardContainer>
    </>
  );
};

ShortCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ShortCard;

const CardContainer = styled.article`
  margin-bottom: 9px;
  padding: 20px 14px 14px 19px;
  background: #fff;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
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
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;
