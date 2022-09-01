import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grade } from './LongCard';

const CommentItem = ({ comment }) => {
  useEffect(() => {
    console.log(comment);
  }, []);

  return (
    <Item>
      <Grade>{comment.commenter.level}</Grade>
      <CommentContent>
        <strong>{comment.commenter.nickname}</strong>
        <p>
          {comment.content} Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Itaque, quidem.
        </p>
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
  font-size: 14px;
  strong {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
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
