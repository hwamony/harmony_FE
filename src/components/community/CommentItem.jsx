import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grade } from './LongCard';
import { hwamokGrades } from '../../utils/data';
import MoreComment from './MoreComment';

const CommentItem = ({ comment, postId }) => {
  return (
    <Item>
      <Grade>
        <img
          src={hwamokGrades[comment.commenter.level].icon}
          alt={hwamokGrades[comment.commenter.level].name}
        />
      </Grade>
      <CommentContent>
        <div className="comment-header">
          <strong>{comment.commenter.nickname}</strong>
          {comment.iamCommenter && (
            <MoreComment postId={postId} commentId={comment.commentId} />
          )}
        </div>
        <p>{comment.content}</p>
        <small>{dayjs(comment.createdAt).format('YYYY년 M월 D일')}</small>
      </CommentContent>
    </Item>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;

const Item = styled.div`
  display: flex;
  padding: 0 27px 30px 20px;
`;

const CommentContent = styled.div`
  width: 100%;
  font-size: 14px;
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    strong {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
    }
    svg circle {
      fill: #bababa;
    }
    .MuiIconButton-root {
      padding: 16px 8px;
      margin-top: -15px;
    }
  }
  p {
    color: #18191f;
    word-break: break-all;
  }
  small {
    display: block;
    margin-top: 10px;
    color: #797979;
    font-size: 10px;
  }
`;
