import React from 'react';
import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import { BackButton } from '../../styles/Button';
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
    <>
      <PageTitle title="알림" />
      <HeaderMid text="알림" />
      <InProgress />
      {/* <Container>
        <Body>
          <NoticeWrap>
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
          </NoticeWrap>
        </Body>
      </Container> */}
    </>
  );
};

export default Notice;
