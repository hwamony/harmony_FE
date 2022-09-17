import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import api from '../../api/AxiosManager';

import { TextField } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import { Button } from '../../styles/Button';

const EditAlbum = () => {
  const navigate = useNavigate();
  const { scheduleId, galleryId } = useParams();
  const location = useLocation();
  const album = location.state;
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumContent, setAlbumContent] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    setAlbumTitle(album.title);
    setAlbumContent(album.content);
  }, []);

  const editAlbum = async (e) => {
    e.preventDefault();

    const data = {
      title: albumTitle,
      content: albumContent,
    };

    try {
      const res = await api.put(`/galleries/${galleryId}`, data);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const { mutate: editAlbumM } = useMutation(editAlbum, {
    onSuccess: () => {
      alert('앨범이 수정되었습니다!');
      navigate(`/galleries/${scheduleId}`);
      return queryClient.invalidateQueries(['albums', scheduleId]);
    },
  });

  return (
    <>
      <PageTitle title="앨범수정 - 갤러리" />
      <HeaderMid text="앨범수정" />

      <AlbumForm onSubmit={editAlbumM}>
        <>
          <InputWrapper>
            <TextField
              id="input-albumtitle"
              label="앨범명"
              variant="outlined"
              autoComplete="off"
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              required
            />
          </InputWrapper>

          <ContentWrapper>
            <Textarea
              placeholder="내용을 3000자 이내로 입력해주세요."
              wrap="hard"
              spellCheck="false"
              maxLength="3000"
              minRows="5"
              maxRows="17"
              value={albumContent}
              onChange={(e) => setAlbumContent(e.target.value)}
              required
            />
          </ContentWrapper>
        </>

        <Button>수정하기</Button>
      </AlbumForm>
    </>
  );
};

export default EditAlbum;

const AlbumForm = styled.form`
  overflow-y: auto;
  min-height: calc(100vh - 55px - 90px);
  padding: 0 20px 90px;
  label {
    color: #000;
  }
  strong {
    display: block;
    margin: 22px 0;
    font-weight: 500;
  }
  hr {
    margin: 0 -20px;
    border: 1px solid #ebebeb;
  }
  button {
    position: fixed;
    bottom: 35px;
    width: calc(100% - 40px);

    @media only screen and (min-width: 1025px) {
      width: 460px;
    }
  }
  .MuiSnackbar-root {
    bottom: 75px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding: 24px 0;
  .MuiFormControl-root {
    width: 100%;
  }
  svg.MuiSelect-icon {
    padding: 12px 13px 16px;
    margin-right: 5px;
    background: #fff url(/images/chevron_down.png) center no-repeat;
    transition: all 0.2s ease;
  }
`;

const ContentWrapper = styled.div``;

const Textarea = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #b5b5b5;
  border-radius: 4px;
  resize: none;
  font-size: 1em;
  line-height: 1.4em;
  transition: border 0.2s ease;
  outline: none;
  &::placeholder {
    font-weight: 300;
    font-size: 0.9em;
  }
`;
