import React, { useRef, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import CommentMoreVert from './CommentMoreVert';
import api from '../../api/AxiosManager';

const CommentItem = ({ scheduleId, comment }) => {
  const [onEdit, setOnEdit] = useState(false);
  const commentInput = useRef();
  const queryClient = useQueryClient();

  const editComment = async (commentId) => {
    const data = {
      content: commentInput.current.value,
    };
    try {
      const res = await api.put(`gallery-comments/${commentId}`, data);
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
      setOnEdit(false);
    }
  };

  const { mutate: editCommentM } = useMutation(
    (commentId) => editComment(commentId),
    {
      onSuccess: (res) => {
        alert(res.data.msg);
        commentInput.current.value = '';
        queryClient.invalidateQueries(['albums', scheduleId]);
        setOnEdit(false);
      },
    },
  );

  return (
    <Item>
      {onEdit ? (
        <form>
          <input
            type="text"
            placeholder="댓글을 입력하세요."
            defaultValue={comment.content}
            ref={commentInput}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              editCommentM(comment.id);
            }}
          >
            수정
          </button>
        </form>
      ) : (
        <>
          <div>
            <p>{comment.commenter}</p>
          </div>
          <p>{comment.content}</p>
          <small>{dayjs(comment.createdAt).format('YYYY년 M월 D일')}</small>
          {comment.iamCommenter && (
            <CommentMoreVert commentId={comment.id} setOnEdit={setOnEdit} />
          )}
        </>
      )}
    </Item>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  scheduleId: PropTypes.string.isRequired,
};

export default CommentItem;

const Item = styled.li`
  position: relative;
  padding: 0 5px;
  font-size: 14px;
  word-break: break-all;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    p {
      font-weight: 600;
    }
  }
  small {
    display: block;
    margin-top: 8px;
    color: #797979;
    font-size: 10px;
  }
  .MuiIconButton-sizeMedium {
    top: 0;
    right: -10px !important;
  }
`;
