/* eslint-disable react/display-name */
import React, {useState, useCallback} from "react";
import styled from "styled-components";

const TagItem = React.memo(({ tag, onRemove }) => (
<Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </TagListBlock>
));

const TagBox = () => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(
        tag => {
            if (!tag) return;
            if (localTags.includes(tag)) return;
            setLocalTags([...localTags, tag]);

        },
        [localTags],
    );

    const onRemove = useCallback(
        tag => {
            setLocalTags(localTags.filter(t => t !== tag));
        },
        [localTags],
    );

    const onChange = useCallback(e => {
        setInput(e.target.value);
    }, []);

    const addTag = useCallback(
        e => {
            e.preventDefault();
            insertTag(input.trim());
            setInput('');
        },
        [input, insertTag],
    );

    return (
    <TagBoxBlock>
        <TagForm >
            <input
            placeholder="태그를 입력하세요"
            value={input}
            onChange={onChange}
            />
            <button type="button" onClick={addTag}>추가</button>
        </TagForm>
        <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;

const TagBoxBlock = styled.div`
  width: calc(90% + 13px);
  height: 70px;
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
`

const TagForm = styled.form`
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid gray;
  border-radius: 5px;

  input, button {
    outline: none;
    border: none;
    font-size: 1rem;
  };

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  };

  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: gray;
    color: white;
  };
`

const Tag = styled.div`
  margin: 1px 0.5rem;
  color: gray;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  };
`

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
  color: gray;
`