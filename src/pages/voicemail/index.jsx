import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/AxiosManager';

import PageTitle from '../../components/common/PageTitle';
import AudioPlayer from '../../components/voicemail/AudioPlayer';
import BtnAdd from '../../components/common/BtnAdd';
import { MdDeleteOutline } from 'react-icons/md';
import {
  Container,
  Header,
  Body,
  EmptyWrap,
  EmptyIcon,
  EmptyDesc,
  MailWrap,
  MailTitle,
  MailDesc,
  DropdownWrap,
  DropdownmenuBtn,
  Dropdown,
  DropdownContent,
  DropdownTitle,
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

  const showDropdown = (e) => {
    const dropdown = e.target.parentElement.nextSibling;
    {
      dropdown.hidden ? (dropdown.hidden = false) : (dropdown.hidden = true);
    }
  };

  const deleteVoicemails = async (e) => {
    console.log(e.target.id);
    try {
      const res = await api.delete(`/voice-mails/${e.target.id}`);
      console.log(res);
      navigate(0);
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
        <h1>소리샘</h1>
      </Header>
      <Body>
        {voicemailList.length === 0 ? (
          <EmptyWrap>
            <EmptyIcon
              src={`${process.env.PUBLIC_URL}/images/empty.png`}
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
              <>
                <MailWrap key={item.voiceMailId}>
                  <MailTitle>{item.title}</MailTitle>
                  <MailDesc>{item.createdAt}</MailDesc>
                  <DropdownWrap>
                    <DropdownmenuBtn onClick={showDropdown}>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/dropmenu.png`}
                        alt="아이콘"
                      />
                    </DropdownmenuBtn>
                    <Dropdown hidden={true}>
                      <DropdownContent
                        id={item.voiceMailId}
                        onClick={deleteVoicemails}
                      >
                        <MdDeleteOutline color="#000000"></MdDeleteOutline>
                        <DropdownTitle>삭제</DropdownTitle>
                      </DropdownContent>
                    </Dropdown>
                  </DropdownWrap>
                  <AudioWrap>
                    <AudioPlayer soundUrl={item.soundUrl}></AudioPlayer>
                  </AudioWrap>
                  <UserWrap>
                    <From>{`from. ${item.from}`}</From>
                    <To>{`to. ${item.to}`}</To>
                  </UserWrap>
                </MailWrap>
              </>
            );
          })
        )}
      </Body>
      <BtnAdd link="/voice-recorder" text="녹음 등록" plus={true} />
    </Container>
  );
};

export default Voicemail;
