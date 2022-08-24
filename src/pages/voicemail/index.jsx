import React from 'react';
import PageTitle from '../../components/common/PageTitle';
import {
  Container,
  Header,
  Title,
  Body,
  MailWrap,
  MailTitle,
  MailDesc,
  TimeWrap,
  StartTime,
  EndTime,
  UserWrap,
  From,
  To
} from './style'
import Recoder from './Recoder';


const Voicemail = () => {
  return (
    <>
      <Recoder />
    </>
    // <Container>
    //   <PageTitle title="소리샘" />
    //   <Header>
    //     <Title>소리샘</Title>
    //   </Header>
    //   <Body>
    //     <MailWrap>
    //       <MailTitle>첫째보아라</MailTitle>
    //       <MailDesc>8월 2일, 오전 11:23</MailDesc>
    //       <TimeWrap>
    //         <audio controls>녹음된 소리를 재생할 audio 엘리먼트</audio>
    //         <StartTime>0:00</StartTime>
    //         <EndTime>-1:51</EndTime>
    //       </TimeWrap>
    //       <UserWrap>
    //         <From>from. 홍길동</From>
    //         <To>to. 철수</To>
    //       </UserWrap>
    //     </MailWrap>
    //     <button>시작/종료</button>
    //   </Body>
    // </Container>
  );
};

export default Voicemail;


