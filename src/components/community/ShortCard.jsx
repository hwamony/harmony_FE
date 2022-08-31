import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaRegComment, FaRegThumbsUp } from 'react-icons/fa';

const ShortCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <>
      <CardContainer>
        <Inventory>
          <CardTitle>
            <Profile>
              <div>{post.poster.flower}꽃여부</div>
              <Photo>{post.poster.level}화목등급</Photo>
              <Info>
                <h5>{post.poster.nickname}</h5>
                <p>{post.createdAt}</p>
              </Info>
            </Profile>
            <p>. . .
              {/* TODO: MoreVert 추가 (수정,삭제메뉴) */}
            </p>
          </CardTitle>

          <CardContent>
            <H1>
              <h1>{post.title}</h1>
              <H3>
                <p>
                  <FaRegThumbsUp /> {post.likeCount}
                </p>
                <p>
                  <FaRegComment /> {post.commentCount}
                </p>
              </H3>
            </H1>
            <H1>
              <Image>
                <img src={post.imageUrl} alt="" />
                <h3 onClick={() => navigate(`/community/posts/${post.postId}`)}>
                  {post.content}
                  <span>... 더 보기</span>
                </h3>
              </Image>
            </H1>
            <Tag>
              {post.tags.map((tag) => (
                <h3 key={tag}>#{tag}</h3>
              ))}
            </Tag>
          </CardContent>

          <CardGood>
            <h5>
              {/* TODO: 좋아요 api 추가 */}
              <FaRegThumbsUp /> 좋아요
            </h5>
            <h5 onClick={() => navigate(`/community/posts/${post.postId}`)}>
              <FaRegComment /> 댓글
            </h5>
          </CardGood>
        </Inventory>
      </CardContainer>
    </>
  );
};

ShortCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ShortCard;

export const CardContainer = styled.div`
  padding-top: 3vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Inventory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 270px;
  border-radius: 5px;
  text-align: center;
  background-color: white;
`;

export const CardTitle = styled.div`
  border-bottom: 0.01px solid #d9d9d9;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  width: 100%;
  p {
    color: gray;
    font-size: 13px;
    font-weight: bolder;
    :hover {
      cursor: pointer;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

export const Photo = styled.p`
  margin: 0 15px;
  padding: 15px 13px;
  background-color: #d9d9d9;
  border-radius: 100%;
`;

export const Info = styled.div`
  flex-direction: column;
  span {
    color: #3ec192;
  }
`;

export const CardContent = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: left;
  h3 {
    margin: 5px 10px;
    text-align: left;
  }
  span {
    color: gray;
    font-size: 13px;
    :hover {
      cursor: pointer;
    }
  }
`;
export const H1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0.7em 0;
    padding-left: 20px;
    font-size: 1.2em;
    font-weight: 700;
    text-align: left;
  }
  h3 {
    width: 100%;
  }
`;

export const H3 = styled.div`
  width: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  p {
    padding-right: 50px;
    // color: #3EC192;
  }
`;

export const Image = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 7.5px;
  img {
    width: 90px;
    height: 75px;
    margin-left: 25px;
  }
  h3 {
    :hover {
      cursor: pointer;
    }
  }
`;

export const Tag = styled.div`
  width: 100%;
  height: 20px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  h3 {
    margin: 0 5px;
    padding: 2px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #e7e7e7;
    color: gray;
    font-size: 13px;
    text-align: left;
  }
`;

export const GoodCount = styled.div`
  width: 100%;
  height: 3vh;
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  p {
    color: #9e9e9e;
    padding-right: 10px;
    font-size: 13px;
  }
`;

export const CardGood = styled.div`
  border-top: 0.01px solid #d9d9d9;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 45px;
  font-size: 15px;
  h5 {
    padding: 0 135px;
    :hover {
      cursor: pointer;
    }
  }
`;
