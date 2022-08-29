import React, { useState } from 'react';
import { BackButton, Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import VoiceRecorder from '../../components/voicemail/VoiceRecorder';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import {
  Container,
  Header,
  Title,
  Body,
  InputWrap,
  LabelTitle,
  RecordWrap,
} from './style';

const Recoder = () => {
  // State
  const [blobUrl, setBlobUrl] = useState('');

  // Referance
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  // Function
  const onSubmit = (data) => {
    console.log({ ...data, sound: blobUrl });
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
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
