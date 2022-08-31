import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const CommentItem = ({onEdit, onRemove, comment, id}) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localComment, setLocalComment] = useState(comment);
  const localCommentInput = useRef();

  const handleRemove = () => {
    if(window.confirm(`${id}번째 댓글을 삭제하시겠습니까?`)){
      onRemove(id);
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalComment(comment);
  }

  const handleEdit = () => {
    if(localComment.length < 5) {
      localCommentInput.current.focus();
      return;
    }

    if(window.confirm(`${id}번째 댓글을 수정할까요?`)){
      onEdit(id, localComment);
      toggleIsEdit();
    }
  }

  return (
    <CoItem className='CommentItem'>
      <div className='comment'>
      {isEdit ? (
          <>
            <textarea
              ref={localCommentInput}
              value={localComment}
              onChange={(e) => setLocalComment(e.target.value)}
            />
          </>
        ) : (<>{comment}</>)}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>취소</button>
          <button onClick={handleEdit}>완료</button>
        </>
        ) : (
        <>
          <button onClick={handleRemove}>삭제</button>
          <button onClick={toggleIsEdit}>수정</button>
        </>
      )}
    </CoItem>
  );
};

export default CommentItem;

const CoItem = styled.div`
  background-color: whitesmoke;
  width: 100%;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  textarea{
    width: 95%;
    border: 1px solid gray;
    resize: none;
    padding: 10px;
    margin: 10px;
  }

  button{
    width: 50px;
    background: cornflowerblue;
    color: white;
    border-radius: 5px;
    padding: 5px;
    margin: 10px;
    font-size: 13px;
  }

`
