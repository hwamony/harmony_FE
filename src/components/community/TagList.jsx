import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TagList = ({ tags, onRemove }) => {
  return (
    <TagListBlock>
      {tags.map((tag) => (
        <div key={tag} onClick={() => onRemove(tag)} className="tag-item">
          <span>{tag}</span>
        </div>
      ))}
    </TagListBlock>
  );
};

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default React.memo(TagList);

const TagListBlock = styled.div`
  display: flex;
  span {
    min-width: 100%;
    word-break: keep-all;
    &::before {
      content: '# ';
    }
  }
`;
