import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { formdataApi } from '../../../api/AxiosManager';
import { communityRoles } from '../../../utils/data';
import styled from 'styled-components';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import PageTitle from '../../../components/common/PageTitle';
import TagBox from '../../../components/community/TagBox';
import HeaderMid from '../../../components/common/HeaderMid';
import { IconCamera } from '../../../assets/icons';
import { Button } from '../../../styles/Button';
import ReactGA from 'react-ga';

const Post = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const post = useLocation().state;
  const [localTags, setLocalTags] = useState([]);
  const [previewSrc, setPreviewSrc] = useState();
  const [file, setFile] = useState();
  const [state, setState] = useState({
    category: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    if (post) {
      setState({
        category: post.category,
        title: post.title,
        content: post.content,
      });
      setLocalTags(post.tags);
      setPreviewSrc(post.imageUrl);
    }
  }, [post]);

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    const reader = new FileReader();
    reader.readAsDataURL(image);

    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewSrc(reader.result);
        resolve();
      };
    });
  };

  const createGAEvent = (event) => {
    ReactGA.event({
      category: 'Community',
      action: `커뮤니티에서 ${event}`,
      label: 'community',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.category) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    let formData = new FormData();
    formData.append('category', state.category);
    formData.append('title', state.title);
    formData.append('content', state.content);
    if (post?.imageUrl) {
      !previewSrc || file
        ? formData.append('change', true)
        : formData.append('change', false);
    } else if (post && file) {
      formData.append('change', true);
    }
    if (localTags) {
      for (let i = 0; i < localTags.length; i++) {
        const tagForm = localTags[i];
        formData.append(`tags[${i}]`, tagForm);
      }
    }
    if (file) formData.append('image', file);

    try {
      if (post) {
        const res = await formdataApi.put(`/posts/${postId}`, formData);
        createGAEvent('게시물 수정');
        alert('게시물 수정 완료');
        navigate(-1);
        return queryClient.invalidateQueries(['communityPosts', '전체']);
      } else {
        const res = await formdataApi.post(`/posts`, formData);
        createGAEvent('게시물 작성');
        alert('게시물 작성 완료');
        navigate('/community');
        return queryClient.invalidateQueries(['communityPosts', '전체']);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <PageTitle title={post ? '게시물 수정' : '게시물 작성'} />
      <HeaderMid text={post ? '게시물 수정' : '게시물 작성'} />

      <PostForm onSubmit={(e) => handleSubmit(e)}>
        <BoxP>
          <PostCategory>
            {communityRoles.slice(1).map((role) => (
              <React.Fragment key={role}>
                <input
                  id={role}
                  value={role}
                  type="radio"
                  name="category"
                  onChange={handleChangeState}
                  className="hidden"
                  checked={state.category === role}
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
            <span>{state.title.length}/20</span>
          </PostTitle>

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
            <TagBox localTags={localTags} setLocalTags={setLocalTags} />
          </TagWrapper>

          <AddPhoto>
            {previewSrc ? (
              <label htmlFor="input-photo">
                <img src={previewSrc} alt="" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPreviewSrc();
                    setFile();
                  }}
                >
                  삭제
                </button>
              </label>
            ) : (
              <label htmlFor="input-photo">
                <IconCamera />
                사진 올리기
              </label>
            )}

            <input
              id="input-photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadImage(e)}
              className="hidden"
            />
          </AddPhoto>
        </BoxP>

        <SubmitBtnWrapper>
          <Button>{post ? '수정하기' : '등록하기'}</Button>
        </SubmitBtnWrapper>
      </PostForm>
    </>
  );
};

export default Post;

const PostForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  padding-bottom: 90px;
`;

const PostCategory = styled.div`
  overflow-x: auto;
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
    user-select: none;
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
  position: relative;
  display: flex;
  border-bottom: 1px solid #dfdfdf;
  input {
    width: 100%;
    padding: 20px;
    font-size: 15px;
    font-weight: 700;
    color: #000;
    &::placeholder {
      font-size: 15px;
      color: #ababab;
    }
  }
  span {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: #ababab;
  }
`;

const TagWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  width: 100%;
  padding: 5px 0 15px 20px;
  border-bottom: 1px solid #dfdfdf;
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
  font-size: 14px;
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
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 85px;
    border: 1px solid #bcbcbc;
    border-radius: 5px;
    background: #eee;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    svg {
      margin-bottom: 5px;
    }
    img {
      min-width: 85px;
      min-height: 85px;
      object-fit: cover;
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
      border-bottom-left-radius: 5px;
      background: #000;
      color: #fff;
      font-size: 12px;
    }
  }
`;

const SubmitBtnWrapper = styled.div`
  button {
    position: fixed;
    left: 20px;
    bottom: 35px;
    width: calc(100% - 40px);

    @media only screen and (min-width: 1025px) {
      left: calc(50vw - 230px);
      width: 460px;
    }
  }
`;
