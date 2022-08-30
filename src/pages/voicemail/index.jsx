import React from 'react';
import {
  Container,
  Header,
  Title,
  Body,
  EmptyWrap,
  EmptyIcon,
  EmptyDesc,
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
import api from '../../api/AxiosManager';
import { useQuery } from '@tanstack/react-query';

const Voicemail = () => {
  // Referance
  const navigate = useNavigate();

  const getVoicemails = async () => {
    const res = await api.get('/voice-mails');
    console.log(res);
    return res.data.data.voiceMails;
  };

  const {
    data: voicemailList,
    isLoading,
    error,
  } = useQuery(['mails'], getVoicemails, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteVoicemails = async (e) => {
    console.log(e.target.id);
    try {
      const res = await api.delete(`/voice-mails/${e.target.id}`);
      console.log(res);
      navigate(0)
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <>is load...</>;
  }

  return (
    <Container>
      <PageTitle title="소리샘" />
      <Header>
        <Title>소리샘</Title>
      </Header>
      <Body>
        {voicemailList.length === 0 ? (
          <EmptyWrap>
            <EmptyIcon
              src={`${process.env.PUBLIC_URL}/images/emtpy.png`}
              alt="아이콘"
            />
            <EmptyDesc>
              <p>아직 등록된 음성메시지가 없습니다.</p>
              <p>첫 번째 음성메시지를 등록해보세요!</p>
            </EmptyDesc>
          </EmptyWrap>
        ) : (
          voicemailList.map((item) => {
            return (
              <MailWrap key={item.voiceMailId}>
                <MailTitle>{item.title}</MailTitle>
                <MailDesc>{item.createdAt}</MailDesc>
                <div id={item.voiceMailId} style={{ width: '20px', height: '20px', background: 'grey', cursor: 'pointer', position: 'absolute', top: '20px', right: '20px'}} onClick={deleteVoicemails}></div>
                <AudioWrap>
                  <AudioPlayer soundUrl={item.soundUrl}></AudioPlayer>
                </AudioWrap>
                <UserWrap>
                  <From>{`from. ${item.from}`}</From>
                  <To>{`to. ${item.to}`}</To>
                </UserWrap>
              </MailWrap>
            );
          })
        )}
      </Body>
      <PlusBtn onClick={() => navigate('/voice-recorder')}>
        <img src={`${process.env.PUBLIC_URL}/images/plus.png`} alt="아이콘" />
      </PlusBtn>
    </Container>
  );
};

export default Voicemail;
