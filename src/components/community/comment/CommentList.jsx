import React from 'react';
import CommentItem from './CommentItem';
import './CommentList';

const CommentList = ({onEdit, onRemove, commentList}) => {
  console.log(commentList);
  return (
    <div className='CommentList'>
      <h5>댓글 {commentList.length}개</h5>
      <div>
        {commentList.map((it) => (
          <div key={it.id}>
            <CommentItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;