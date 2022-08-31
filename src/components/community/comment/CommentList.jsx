import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import './CommentList';

const CommentList = ({onEdit, onRemove, commentList}) => {
  console.log(commentList);
  return (
    <CoLiDiv className='CommentList'>
      <div>
        <h5>댓글 {commentList.length}개</h5>
      </div>
      <Comments>
        {commentList.map((it) => (
          <div key={it.id}>
            <CommentItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
          </div>
        ))}
      </Comments>
    </CoLiDiv>
  );
};

export default CommentList;

const CoLiDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Comments = styled.div`
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  
  div{
    width: 100%;
    padding: 10px;
  }
`