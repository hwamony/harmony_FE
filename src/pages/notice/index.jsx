import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useNavigate } from 'react-router-dom';

import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import api from '../../api/AxiosManager';
import { useUserNickname, useUserNotifications } from '../../hooks/useData';

import PageTitle from '../../components/common/PageTitle';
import HeaderMid from '../../components/common/HeaderMid';
import { FiBell } from 'react-icons/fi';
import { Container, Body, NoticeWrap, NoticeItem, IconWrap, DescWrap, DescTitle, DescMsg, TimeWrap } from './style';

const Notice = () => {
  dayjs.locale('ko');
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const { nickname } = useUserNickname().data;
  const { notifications } = useUserNotifications().data;

  const connectWs = () => {
    const SERVER_STOMP_URL = 'https://dev.hwa-mok.com/websocket';
    const sock = new SockJs(SERVER_STOMP_URL);
    const client = StompJs.over(sock);

    client.connect(
      {},
      () => {
        console.log('connect!');

        client.subscribe(`/topic/user/${nickname}`, (message) => {
          const quote = JSON.parse(message.body);
          console.log(notifications);
          setNotice((prev) => [quote, ...prev]);

          console.log(quote);
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    setNotice([...notifications]);
    connectWs();
  }, []);

  const deleteNotifications = async () => {
    try {
      await api.delete('/notifications');
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PageTitle title="알림" />
      <HeaderMid text="알림" />
      <Container>
        <Body>
          <div className="wrapper-btn">
            <button onClick={deleteNotifications}>삭제</button>
          </div>
          <NoticeWrap>
            {notice.map((item) => {
              const { id, domain, action, createdAt } = item;

              return (
                <NoticeItem key={id}>
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
                    <TimeWrap>
                      {dayjs(createdAt).format('M월 D일 HH:MM')}
                    </TimeWrap>
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
