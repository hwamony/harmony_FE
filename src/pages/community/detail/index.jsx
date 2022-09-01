import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../../api/AxiosManager';
import styled from 'styled-components';

import PageTitle from '../../../components/common/PageTitle';
import HeaderMid from '../../../components/common/HeaderMid';
import LongCard from '../../../components/community/LongCard';
import CommentEditor from '../../../components/community/comment/CommentEditor';

const PostDetail = () => {
  const postId = useParams().postId;

  // const getPost = async (postId) => {
  //   const res = await api.get(`/posts/${postId}`);
  //   return res.data.data;
  // };

  // const { data: postData } = useQuery(
  //   ['communityPost', postId],
  //   () => getPost(postId),
  //   {
  //     refetchOnWindowFocus: false,
  //   },
  // );

  return (
    <>
      <PageTitle title="게시물 상세" />
      <HeaderMid text="커뮤니티" />

      <CommunityDetail>
        {/* <LongCard post={postData} /> */}
        <LongCard />
        <Repl>
          <h3>
            {/* 댓글 <span>{postData.comments.length}</span> */}
            댓글 <span>3</span>
          </h3>
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
  margin-top: 55px;
  padding-bottom: 84px;
  background-color: #efefef;
`;

const Repl = styled.section`
  background: #fff;
  h3 {
    padding: 20px 20px 15px 20px;
    border-bottom: 1px solid #dfdfdf;
    font-weight: 700;
    span {
      color: #a9a9a9;
    }
  }
`;
