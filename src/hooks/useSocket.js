import SockJs from 'sockjs-client';
import StompJs from 'stompjs';

// 알림기능
// websocket 연결

const SERVER_STOMP_URL = 'http://43.200.174.197/websocket';

const sock = new SockJs(SERVER_STOMP_URL);
const client = StompJs.over(sock);

export const connect = () => {
  // 클라이언트의 콘솔창에 STOMP 메세지가 출력되지 않도록 디버그
  //   client.debug = null;

  client.connect(
    {},
    (frame) => {
      console.log('connect', frame);

      client.send('/app/voice-mails', {}, 'connection complete!');

      client.subscribe('/topic/voice-mails', (data) => {
        console.log(data);
      });
    },
    (err) => console.log(err),
  );
};