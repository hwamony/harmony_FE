import React, { useState } from 'react';
import {
  Container,
  Header,
  Title,
  Body,
  MailWrap,
  MailTitle,
  MailDesc,
  AudioWrap,
  UserWrap,
  From,
  To,
  PlusBtn,
} from './style';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import AudioPlayer from '../../components/voicemail/AudioPlayer';

const Voicemail = () => {
  const data = [
    {
      voiceMailId: 'a1',
      title: '첫째는 보아라',
      from: '엄마',
      to: '첫째',
      createdAt: '2022-08-22',
      soundUrl:
        'https://drive.google.com/uc?export=download&id=1c_L0-DSr__USjiQIjxOy2B68XPHgYWlF',
    },
    {
      voiceMailId: 'a2',
      title: '둘째는 보아라',
      from: '엄마',
      to: '둘째',
      createdAt: '2022-08-22',
      soundUrl:
        'https://drive.google.com/uc?export=download&id=1VTzUu0T5dKkdfdT8NJmKZbTfAHyAm_sI',
    },
  ];

  const navigate = useNavigate();

  return (
    <Container>
      <PageTitle title="소리샘" />
      <Header>
        <Title>소리샘</Title>
      </Header>
      <Body>
        {data.map((item) => {
          return (
            <MailWrap key={item.voiceMailId}>
              <MailTitle>{item.title}</MailTitle>
              <MailDesc>{item.createdAt}</MailDesc>
              <AudioWrap>
                <AudioPlayer soundUrl={item.soundUrl}></AudioPlayer>
              </AudioWrap>
              <UserWrap>
                <From>{`from. ${item.from}`}</From>
                <To>{`to. ${item.to}`}</To>
              </UserWrap>
            </MailWrap>
          );
        })}
      </Body>
      <PlusBtn onClick={() => navigate('/voice-recorder')}>
        <img src={`${process.env.PUBLIC_URL}/images/plus.png`} alt="아이콘" />
      </PlusBtn>
    </Container>
  );
};

export default Voicemail;
