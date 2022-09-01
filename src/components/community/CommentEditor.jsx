import React, { useRef } from 'react';
import styled from 'styled-components';

const CommentEditor = () => {
  const commentInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 댓글 유효성 검사 후 댓글 등록
    // alert('댓글이 등록되었습니다!');
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
