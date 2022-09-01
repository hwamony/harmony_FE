import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../../api/AxiosManager';
import styled from 'styled-components';

import PageTitle from '../../../components/common/PageTitle';
import HeaderMid from '../../../components/common/HeaderMid';
import LongCard from '../../../components/community/LongCard';
import CommentEditor from '../../../components/community/CommentEditor';
import CommentItem from '../../../components/community/CommentItem';

const PostDetail = () => {
  const postId = useParams().postId;

  const getPost = async (postId) => {
    const res = await api.get(`/posts/${postId}`);
    return res.data.data;
  };

  const { data: postData } = useQuery(
    ['communityPost', postId],
    () => getPost(postId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => console.log(data),
    },
  );

  return (
    <>
      <PageTitle title="게시물 상세" />
      <HeaderMid text="커뮤니티" />

      <CommunityDetail>
        <LongCard post={postData} postId={postId} />

        <Repl>
          <h3>
            댓글 <span>{postData.comments.length}</span>
          </h3>
          {postData.comments.length > 0 ? (
            postData.comments.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))
          ) : (
            <NoComments>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/images/nodata.png`}
                  alt=""
                />
                <p>아직 등록된 댓글이 없습니다.</p>
                <p>첫 댓글을 작성해보세요!</p>
              </div>
            </NoComments>
          )}
        </Repl>

        <CommentEditor />
      </CommunityDetail>
    </>
  );
};

export default PostDetail;

const CommunityDetail = styled.main`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 55px - 84px);
  padding-bottom: 84px;
  background-color: #f2f2f2;
`;

const Repl = styled.section`
  background: #fff;
  h3 {
    padding: 20px 20px 15px 20px;
    margin-bottom: 27px;
    border-bottom: 1px solid #dfdfdf;
    font-weight: 700;
    span {
      color: #a9a9a9;
    }
  }
`;

const NoComments = styled.div`
  position: relative;
  height: 240px;
  div {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    bottom: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #adadad;
    line-height: 19px;
    font-size: 14px;
    img {
      margin-bottom: 20px;
    }
  }
`;
