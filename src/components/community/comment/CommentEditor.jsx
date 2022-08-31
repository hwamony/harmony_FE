import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const CommentEditor = ({onCreate}) => {
  const [state, setState] = useState({
    comment: '',
  })

  const commentInput = useRef();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = () => {
    if(state.comment.length < 5) {
      commentInput.current.focus();
    }
    onCreate(state.comment);
    alert('댓글이 등록되었습니다!');
    setState({
      comment: '',
    });
  };

  return (
    <>
    <CommentBar>
      <CommentP className='CommentEditor'>
        <input
          ref={commentInput}
          name='comment'
          value={state.comment}
          placeholder='댓글을 입력하세요.'
          onChange={handleChangeState}
        />
        <button type='submit' onClick={handleSubmit}>입력</button>
      </CommentP>
    </CommentBar>
    </>
  );
};

export default CommentEditor;

const CommentBar = styled.div`
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
    width: 60px;
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