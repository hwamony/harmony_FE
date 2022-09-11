import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/AxiosManager';
import styled from 'styled-components';

const CommentEditor = ({ postId }) => {
  const queryClient = useQueryClient();
  const commentInput = useRef();

  const { mutate: addComment } = useMutation(
    (data) => api.post(`/posts/${postId}/comments`, data),
    {
      onSuccess: () => {
        alert('댓글이 등록되었습니다!');
        commentInput.current.value = '';
        return queryClient.invalidateQueries(['communityPost', postId]);
      },
      onError: (err) => console.log(err),
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      content: commentInput.current.value,
    };
    addComment(data);
  };

  return (
    <>
      <CommentBar>
        <CommentForm onSubmit={(e) => handleSubmit(e)}>
          <input
            name="comment"
            placeholder="댓글을 입력하세요."
            autoComplete="off"
            ref={commentInput}
            minLength="2"
            required
          />
          <button>등록</button>
        </CommentForm>
      </CommentBar>
    </>
  );
};

export default CommentEditor;

const CommentBar = styled.section`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #f2f2f2;
  color: #868686;
  z-index: 100;

  @media only screen and (min-width: 1025px) {
    width: 500px;
  }
`;

const CommentForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  padding: 13px 20px 28px;
  input {
    width: 100%;
    height: 43px;
    padding: 14px 12px 15px;
    border-radius: 5px;
    background: #fff;
    ::placeholder {
      color: #9e9e9e;
      font-size: 12px;
    }
  }
  button {
    position: absolute;
    right: 35px;
    bottom: 40px;
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 15px;
    font-weight: 500;
  }
`;
