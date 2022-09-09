import React, { Children, useEffect, useState } from 'react';
import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import api from '../../api/AxiosManager';
import { useUserNickname, useUserNotifications } from '../../hooks/useData';

export const connectWs = () => {
  // websocket 연결
  const { nickname } = useUserNickname().data;
  const { notifications }  = useUserNotifications().data;

  console.log(notifications)
  // FIXME: https로 수정
  const SERVER_STOMP_URL = 'https://dev.hwa-mok.com/websocket';

  const sock = new SockJs(SERVER_STOMP_URL);
  const client = StompJs.over(sock);

  client.connect(
    {},
    (data) => {
      console.log('connect!')

      client.subscribe(`/topic/user/${nickname}`, (message) => {
        const quote = JSON.parse(message.body);
        console.log(quote);
      });
    },
    (err) => {
      console.log(err);
    },
  );
};
