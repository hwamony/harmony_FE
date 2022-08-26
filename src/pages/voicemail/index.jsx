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
  Timeline,
  Timebar,
  Currenttime,
  Duration,
  AudioBtn,
  PlayBtn,
  UserWrap,
  From,
  To,
  PlusBtn,
} from './style';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

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
  const [audio, setAudio] = useState({
    playState: 'play',
  });
  let { playState } = audio;

  const currenttimehandler = (e) => {
    const currenttime = document.getElementById(`${e.target.accessKey}_current`);
    const timebar = document.getElementById(`${e.target.accessKey}_timebar`);
    const percent = (e.target.currentTime/e.target.duration * 100).toFixed(2);
    timebar.value = percent;
    const seconds = parseInt(e.target.currentTime); 
    const min = parseInt(seconds / 60);
    const sec = seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60;
    currenttime.innerText = min + ":" + sec;
    const playbtn = document.getElementById(`${e.target.accessKey}_playbtn`);
    if (e.target.currentTime === e.target.duration) {
      e.target.currentTime = 0;
      playbtn.classList.remove('pause');
      playbtn.classList.add('play');
    }
  }

  const durationhandler = (e) => {
    const duration = document.getElementById(`${e.target.accessKey}_duration`);
    const seconds = parseInt(e.target.duration);
    const min = parseInt(seconds / 60);
    const sec = seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60;
    duration.innerText = min + ":" + sec;
  }

  const playhandler = (e) => {
    const myaudio = document.getElementById(`${e.target.value}_audio`);
    if (e.target.classList[2] === 'play') {
      myaudio.play();
      e.target.classList.remove('play');
      e.target.classList.add('pause');
    } else {
      myaudio.pause();
      e.target.classList.remove('pause');
      e.target.classList.add('play');
    }
  };

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
                <audio src={item.soundUrl} id={`${item.voiceMailId}_audio`} accessKey={item.voiceMailId} preload='metadata'
                onLoadedMetadata={durationhandler}
                onTimeUpdate={currenttimehandler}/>
                <Timeline>
                  <Timebar type='range' id={`${item.voiceMailId}_timebar`} value='0'
                  onchange={(e) => {
                    const myaudio = document.getElementById(`${e.target.accessKey}_audio`);
                    myaudio.currentTime = e.target.value;

                  }}
                  ></Timebar>
                  <Currenttime id={`${item.voiceMailId}_current`}>0:00</Currenttime>
                  <Duration id={`${item.voiceMailId}_duration`}></Duration>
                </Timeline>
                <AudioBtn>
                  <PlayBtn className='play' id={`${item.voiceMailId}_playbtn`} value={item.voiceMailId} onClick={playhandler}/>
                </AudioBtn>
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
