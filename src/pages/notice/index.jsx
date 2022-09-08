import React from 'react';
import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  Container,
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

const Notice = () => {
  // Reference
  const navigate = useNavigate();
  dayjs.locale('ko');

  const data = [
    {
      domain: 'schedule',
      action: 'create',
      createdAt: '2022-08-14'
    },
    {
      domain: 'schedule',
      action: 'update',
      createdAt: '2022-08-15'
    },
    {
      domain: 'gallery',
      action: 'create',
      createdAt: '2022-08-16'
    },
    {
      domain: 'community',
      action: 'comment',
      createdAt: '2022-08-17'
    },
    {
      domain: 'community',
      action: 'like',
      createdAt: '2022-08-18'
    },
    {
      domain: 'voiceMail',
      action: 'create',
      createdAt: '2022-08-19'
    },
  ];
  return (
    <>
      <PageTitle title="알림" />
      <HeaderMid text="알림" />
      <Container>
        <Body>
          <NoticeWrap>
            {data.map((item, idx) => {
              const { domain, action, createdAt } = item;

              return (
                <NoticeItem key={idx}>
                  <IconWrap>
                    <FiBell size="1.4em" color="#ffffff" />
                  </IconWrap>
                  <DescWrap>
                    <DescTitle>소식알림</DescTitle>
                    <DescMsg>
                      {domain === 'schedule' &&
                        action === 'create' &&
                        '새로운 일정이 추가되었습니다.'}
                      {domain === 'schedule' &&
                        action === 'update' &&
                        '일정이 수정되었습니다.'}
                      {domain === 'gallery' &&
                        action === 'create' &&
                        '새로운 갤러리가 추가되었습니다.'}
                      {domain === 'community' &&
                        action === 'comment' &&
                        '새로운 댓글이 달렸습니다.'}
                      {domain === 'community' &&
                        action === 'like' &&
                        '누군가 좋아요를 눌렀습니다.'}
                      {domain === 'voiceMail' &&
                        action === 'create' &&
                        '새로운 음성메세지가 추가되었습니다.'}
                    </DescMsg>
                    <TimeWrap>{dayjs(createdAt).format('M월 D일')}</TimeWrap>
                  </DescWrap>
                </NoticeItem>
              );
            })}
          </NoticeWrap>
        </Body>
      </Container>
    </>
  );
};

export default Notice;
