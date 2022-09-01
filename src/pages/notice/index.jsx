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
import { HiInformationCircle } from 'react-icons/hi';

//추후 임포트 삭제
import styled from 'styled-components';

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
        <InfoWrap>
          <InfoIcon>
            <HiInformationCircle size="3em" />
          </InfoIcon>
          <InfoDesc>
            <p>서비스 준비중입니다.</p>
            <p>추후 이용 부탁드립니다.</p>
          </InfoDesc>
        </InfoWrap>
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

const InfoWrap = styled.div`
  margin-top: 242px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoIcon = styled.div`
  color: #838383;
`;

const InfoDesc = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 1px;
  color: #838383;
  text-align: center;
`;
