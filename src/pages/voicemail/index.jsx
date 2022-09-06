import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/AxiosManager';
import PageTitle from '../../components/common/PageTitle';
import Header from '../../components/common/Header';
import BtnAdd from '../../components/common/BtnAdd';
import AudioPlayer from '../../components/voicemail/AudioPlayer';
import MoreHoriz from '../../components/voicemail/MoreHoriz';
import { IconMoreHoriz } from '../../assets/icons';
import {
  Container,
  Body,
  EmptyWrap,
  IconWrap,
  EmptyDesc,
  MailWrap,
  MailTitle,
  MailDesc,
  DropdownWrap,
  AudioWrap,
  UserWrap,
  From,
  To,
} from './style';

const Voicemail = () => {
  // Referance
  const navigate = useNavigate();
  const getVoicemails = async () => {
    const res = await api.get('/voice-mails');
    return res.data.data.voiceMails;
  };

  const { data: voicemailList } = useQuery(['mails'], getVoicemails, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Container>
      <PageTitle title="소리샘" />
      <Header title="소리샘" link="/voice-mails" />

      <Body>
        {voicemailList.length === 0 ? (
          <EmptyWrap>
            <IconWrap>
              <IconMoreHoriz />
            </IconWrap>
            <EmptyDesc>
              <p>아직 등록된 음성메시지가 없습니다.</p>
              <p>첫 번째 음성메시지를 등록해보세요!</p>
            </EmptyDesc>
          </EmptyWrap>
        ) : (
          voicemailList.map((item) => (
            <MailWrap key={item.voiceMailId}>
              <MailTitle>{item.title}</MailTitle>
              <MailDesc>
                {dayjs(item.createdAt).format('M월 D일, a hh:mm')}
              </MailDesc>

              <DropdownWrap>
                <MoreHoriz voiceMailId={item.voiceMailId} />
              </DropdownWrap>

              <AudioWrap>
                <AudioPlayer soundUrl={item.soundUrl}></AudioPlayer>
              </AudioWrap>

              <UserWrap>
                <From>{`from. ${item.from}`}</From>
                <To>{`to. ${item.to}`}</To>
              </UserWrap>
            </MailWrap>
          ))
        )}
      </Body>
      <BtnAdd link="/voice-recorder" text="녹음 등록" plus={true} />
    </Container>
  );
};

export default Voicemail;
