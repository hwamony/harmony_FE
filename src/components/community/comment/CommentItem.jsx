import React, { useState, useRef } from 'react';
import './CommentItem.css';

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

    if(window.confirm(`${id}번째 일기를 수정할까요?`)){
      onEdit(id, localComment);
      toggleIsEdit();
    }
  }

  return (
    <div className='CommentItem'>
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
    </div>
  );
};

export default CommentItem;