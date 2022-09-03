import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/AxiosManager';

import MoreComment from './MoreComment';
import { hwamokGrades } from '../../utils/data';
import { Grade } from './LongCard';

const CommentItem = ({ comment, postId }) => {
  const queryClient = useQueryClient();
  const [onEdit, setOnEdit] = useState(false);
  const commentRef = useRef();

  useEffect(() => {
    if (onEdit) commentRef.current.focus();
  }, [onEdit]);

  const { mutate: editComComment } = useMutation(
    (data) => api.put(`/posts/${postId}/comments/${comment.commentId}`, data),
    {
      onSuccess: () => {
        alert('댓글을 성공적으로 수정했습니다.');
        setOnEdit(false);
        return queryClient.invalidateQueries(['communityPost']);
      },
      onError: (err) => console.log(err),
    },
  );

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
          {comment.iamCommenter &&
            (onEdit ? (
              <div>
                <button
                  onClick={() =>
                    editComComment({
                      content: commentRef.current.value,
                    })
                  }
                  className="btn-comment-edit"
                >
                  수정
                </button>
                <button onClick={() => setOnEdit(false)}>취소</button>
              </div>
            ) : (
              <MoreComment
                postId={postId}
                commentId={comment.commentId}
                setOnEdit={setOnEdit}
              />
            ))}
        </div>
        {onEdit ? (
          <input
            type="text"
            defaultValue={comment.content}
            ref={commentRef}
            style={{
              width: '100%',
              padding: '7px',
              borderRadius: '5px',
              fontSize: '14px',
              background: '#f2f2f2',
            }}
          />
        ) : (
          <p>{comment.content}</p>
        )}

        <small>{dayjs(comment.createdAt).format('YYYY년 M월 D일')}</small>
      </CommentContent>
    </Item>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;

const Item = styled.li`
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
    button.btn-comment-edit {
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: 600;
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
