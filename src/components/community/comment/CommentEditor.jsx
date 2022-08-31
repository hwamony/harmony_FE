import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const CommentEditor = ({onCreate}) => {
  const [comment, setComment] = useState('');

  const commentInput = useRef();

  const handleChangeState = (e) => {
    setComment(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('error');
    if(comment.length < 5) {
      commentInput.current.focus();
    }
    onCreate(comment);
    alert('댓글이 등록되었습니다!');
    setComment(e.target.value);
  };

  return (
    <>
    <CommentBar onSubmit={(e) => handleSubmit(e)}>
      <CommentP className='CommentEditor'>
        <input
          ref={commentInput}
          name='comment'
          value={comment}
          placeholder='댓글을 입력하세요.'
          onChange={(e) => handleChangeState(e)}
        />
        <button type='submit'>입력</button>
      </CommentP>
    </CommentBar>
    </>
  );
};

export default CommentEditor;

const CommentBar = styled.form`
  border-top: 2px solid white;
  padding-bottom: 5px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  color: #868686;
  font-size: 12px;
  z-index: 100;
`

const CommentP = styled.div`
  padding: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  input{
    width: 85vw;
    max-width: 600px;
    height: 43px;
    font-size: 17px;
    background-color: white;
    border: 1px solid #3EC192;
    border-radius: 5px;
    padding-left: 15px;
    ::placeholder{
        color: #3EC192;
        font-size: 15px;
    };
  };
  button{
    padding: 10px;
    width: 130px;
    height: 43px;
    border: 1px solid #3EC192;
    background-color: white;
    color: #3EC192;
    font-size: 15px;
    border-radius: 5px;
    :hover{
        background-color: #3EC192;
        color: white;
    }
  }
`