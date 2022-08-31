import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import PageTitle from '../../../components/common/PageTitle';
import TagBox from '../../../components/community/TagBox';
import HeaderMid from '../../../components/common/HeaderMid';
import { Button } from '../../../components/Button';
import { IconCamera } from '../../../assets/icons';
import { communityRoles } from '../../../utils/data';

const Post = () => {
  const navigate = useNavigate();

  const titleInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    category: '',
    title: '',
    content: '',
    tags: [],
    photo: '',
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // if(state.category.)

    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
    }
    alert('포스팅성공!');
  };

  return (
    <>
      <PageTitle title="포스팅" />
      <HeaderMid text="게시물 작성" />

      <PageColor>
        <BoxP>
          <PostCategory>
            {communityRoles.map((role) => (
              <React.Fragment key={role}>
                <input
                  id={role}
                  value={state.category[role]}
                  type="radio"
                  name="category"
                  onChange={handleChangeState}
                  className="hidden"
                />
                <label htmlFor={role}>{role}</label>
              </React.Fragment>
            ))}
          </PostCategory>

          <PostTitle>
            <input
              name="title"
              value={state.title}
              onChange={handleChangeState}
              type="text"
              placeholder="제목을 입력해주세요"
              maxLength="20"
              required
            />
          </PostTitle>
          {/* TODO: 0/20 추가 */}

          <PostContent>
            <Textarea
              name="content"
              value={state.content}
              onChange={handleChangeState}
              type="text"
              wrap="hard"
              spellCheck="false"
              minRows="9"
              maxRows="9"
              placeholder="내용을 입력해주세요"
              maxLength="3000"
              required
            />
          </PostContent>

          <TagWrapper>
            {/* <input type='text' placeholder='#해시태그, #최대5개, #쉼표필수' /> */}
            <TagBox name="tags" value={state.tags} />
          </TagWrapper>

          <AddPhoto>
            <label htmlFor="input-photo">
              <IconCamera />
              사진 올리기
            </label>
            <input
              id="input-photo"
              name="photo"
              // value={state.photo}
              onChange={handleChangeState}
              type="file"
              className="hidden"
            />
          </AddPhoto>
        </BoxP>

        {/* TODO: 추후 교체 */}
        {/* <Button>{postId ? '수정하기' : '등록하기'}</Button> */}
        <SubmitBtnWrapper>
          <Button>등록하기</Button>
        </SubmitBtnWrapper>
      </PageColor>
    </>
  );
};

export default Post;

const PageColor = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 55px;
  text-align: center;
  background-color: #f2f2f2;
  h1 {
    margin: 0.7em 0;
    font-size: 1.2em;
    font-weight: 700;
  }
`;

const BoxP = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: white;
  color: #ababab;
`;

const PostCategory = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  align-items: center;
  label {
    padding: 2px 10px;
    margin-right: 3px;
    border-radius: 30px;
    word-break: keep-all;
    font-size: 14px;
    color: #000;
    cursor: pointer;
  }
  input:checked + label {
    background: #000;
    color: #fff;
    font-weight: 600;
  }
  &::-webkit-scrollbar {
    display: fixed;
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border: 7px solid transparent;
    border-radius: 10px;
    background: #e3e5e9;
    background-clip: border-box;
  }
  &::-webkit-scrollbar-trac {
    background: none;
  }
`;

const PostTitle = styled.div`
  display: flex;
  border-bottom: 1px solid #dfdfdf;
  input {
    width: 100%;
    padding: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #000;
    &::placeholder {
      font-size: 15px;
      color: #ababab;
    }
  }
`;

const TagWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  width: 100%;
  padding: 5px 0 15px 20px;
  border-bottom: 1px solid #dfdfdf;
`;

const PostContent = styled.div`
  height: 250px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  height: 320px;
  border: none;
  resize: none;
  outline: none;
  padding: 15px 20px;
  font-size: 15px;
  color: #000;
  line-height: 1.5em;
  &::placeholder {
    font-size: 15px;
    color: #ababab;
  }
`;

const AddPhoto = styled.div`
  display: flex;
  padding: 15px 20px;
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 85px;
    border: 1px solid #bcbcbc;
    border-radius: 5px;
    background: #eee;
    cursor: pointer;
    svg {
      margin-bottom: 5px;
    }
  }
`;

const SubmitBtnWrapper = styled.div`
  button {
    position: fixed;
    left: 20px;
    bottom: 35px;
    width: calc(100% - 40px);
  }
`;
