import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TagList from './TagList';

const TagBox = ({ localTags, setLocalTags }) => {
  const [input, setInput] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const tagInput = useRef();

  useEffect(() => {
    if (isShowing) tagInput.current.focus();
  }, [isShowing]);

  const insertTag = useCallback(
    (tag) => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      setLocalTags([...localTags, tag]);
    },
    [localTags],
  );

  const onRemove = useCallback(
    (tag) => {
      setLocalTags(localTags.filter((t) => t !== tag));
    },
    [localTags],
  );

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const addTag = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
      setIsShowing(false);
    },
    [input, insertTag],
  );

  return (
    <TagBoxBlock>
      <TagList tags={localTags} onRemove={onRemove} />
      {localTags.length < 3 && (
        <button
          type="button"
          className="tag-item tag-button"
          onClick={() => setIsShowing(!isShowing)}
        >
          {isShowing ? '취소' : '+'}
        </button>
      )}

      {isShowing && (
        <TagWrapper>
          <input
            placeholder="태그를 입력하세요 (최대 3개)"
            value={input}
            onChange={onChange}
            className="input-tag"
            ref={tagInput}
          />
          <button type="button" onClick={(e) => addTag(e)}>
            추가
          </button>
        </TagWrapper>
      )}
    </TagBoxBlock>
  );
};

TagBox.propTypes = {
  localTags: PropTypes.array,
  setLocalTags: PropTypes.func,
};

export default TagBox;

const TagBoxBlock = styled.div`
  display: flex;
  .tag-item {
    display: flex;
    align-items: center;
    margin-right: 7px;
    padding: 3px 10px;
    border-radius: 45px;
    background: #ededed;
    color: #707070;
    font-size: 14px;
    word-break: keep-all;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &.tag-button {
      min-height: 28px;
      background: ${({ theme }) => theme.palette.primary.main};
      color: #fff;
    }
  }
`;

const TagWrapper = styled.div`
  display: flex;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  input.input-tag {
    width: 180px;
    padding: 4px 8px 5px;
    font-size: 14px;
    font-weight: 500;
  }

  button {
    width: 45px;
    background: gray;
    color: white;
    font-weight: 600;
    word-break: keep-all;
  }
`;
