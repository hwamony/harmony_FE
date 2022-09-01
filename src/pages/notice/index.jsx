import React from 'react';
import { BackButton } from '../../components/Button';
import {
  Container,
  Header,
  Title,
  Body,
  NoticeWrap,
  NoticeItem,
  IconWrap,
  DescWrap,
  DescTitle,
  DescMsg,
  TimeWrap,
} from './style';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';

//추후 임포트 삭제
import InProgress from '../../components/common/InProgress';

const Notice = () => {
  // Reference
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton
          src={`${process.env.PUBLIC_URL}/images/back.png`}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
        />
        <Title>알림</Title>
      </Header>
      <Body>
        <InProgress />
        {/* <NoticeWrap>
          <NoticeItem>
            <IconWrap>
              <FiBell size="1.4em" color="#ffffff" />
            </IconWrap>
            <DescWrap>
              <DescTitle>소식알림</DescTitle>
              <DescMsg>일정이 추가되었습니다.</DescMsg>
            </DescWrap>
            <TimeWrap>08.14</TimeWrap>
          </NoticeItem>
          <NoticeItem>
            <IconWrap>
              <FiBell size="1.4em" color="#ffffff" />
            </IconWrap>
            <DescWrap>
              <DescTitle>소식알림</DescTitle>
              <DescMsg>일정이 추가되었습니다.</DescMsg>
            </DescWrap>
            <TimeWrap>08.14</TimeWrap>
          </NoticeItem>
          <NoticeItem>
            <IconWrap>
              <FiBell size="1.4em" color="#ffffff" />
            </IconWrap>
            <DescWrap>
              <DescTitle>소식알림</DescTitle>
              <DescMsg>일정이 추가되었습니다.</DescMsg>
            </DescWrap>
            <TimeWrap>08.14</TimeWrap>
          </NoticeItem>
        </NoticeWrap> */}
      </Body>
    </Container>
  );
};

export default Notice;
