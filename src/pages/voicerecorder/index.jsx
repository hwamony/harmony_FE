import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import api from '../../api/AxiosManager';
import VoiceRecorder from '../../components/voicemail/VoiceRecorder';
import { BackButton, Button } from '../../styles/Button';
import { Input } from '../../styles/Input';
import { Label } from '../../styles/Label';
import { Container, Header, Title, Body, InputWrap, LabelTitle, RecordWrap } from './style';
import ReactGA from 'react-ga';

const Recoder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actions } = useAuth();
  const { register, handleSubmit } = useForm();
  const [blobUrl, setBlobUrl] = useState('');

  const createGAEvent = (event) => {
    ReactGA.event({
      category: 'Voicemail',
      action: `소리샘에서 ${event}`,
      label: 'voicemail',
    });
  };

  const onSubmit = async (data) => {
    const audioBlob = await fetch(blobUrl).then((r) => r.blob()); // react-media-recorder 리턴된 blob url을 blob으로 변환
    const file = new File([audioBlob], 'msg'); // blob을 데이터로 하는 파일 생성

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('from', data.from);
    formData.append('to', data.to);
    formData.append('sound', file);

    try {
      await api.post('/voice-mails', formData);
      createGAEvent('녹음 등록');
      actions.onScoreChanged(20);
      navigate('/voice-mails');
      return queryClient.invalidateQueries(['familyInfo']);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Header>
        <BackButton
          src={`${process.env.PUBLIC_URL}/images/back.png`}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
        />
        <Title>녹음등록</Title>
      </Header>

      <Body>
        <InputWrap>
          <Input
            name="title"
            placeholder="제목"
            ref={register({ required: true })}
            style={{ margin: '24px 0' }}
          ></Input>
        </InputWrap>
        <InputWrap style={{ borderTop: '1px solid #EBEBEB' }}>
          <Label
            htmlFor="from"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/from.png`}
              alt="아이콘"
            />
            <LabelTitle>보내는사람</LabelTitle>
          </Label>
          <Input
            id="from"
            name="from"
            placeholder="from."
            ref={register({ required: true })}
            style={{ marginTop: '16px' }}
          ></Input>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="to" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`${process.env.PUBLIC_URL}/images/to.png`} alt="아이콘" />
            <LabelTitle>받는사람</LabelTitle>
          </Label>
          <Input
            id="to"
            name="to"
            placeholder="to."
            ref={register({ required: true })}
            style={{ marginTop: '16px' }}
          ></Input>
        </InputWrap>

        <RecordWrap>
          <VoiceRecorder setBlobUrl={setBlobUrl} />
        </RecordWrap>

        <Button style={{ marginTop: '36px' }}>등록하기</Button>
      </Body>
    </Container>
  );
};

export default Recoder;
