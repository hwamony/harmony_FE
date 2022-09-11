import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFamilyData } from '../../hooks/useData';

import { IconAlert, IconDetail } from '../../assets/icons';
import { useNavigate, Link } from 'react-router-dom';
import { hwamokGrades } from '../../utils/data';
import ReactGA from 'react-ga';

// TODO: 웹소켓 연결
import SockJs from 'sockjs-client';
import StompJs from 'stompjs';
import { useUserNickname, useUserNotifications } from '../../hooks/useData';

const Widget = () => {
  // State
  const [notice, setNotice] = useState(false);

  const navigate = useNavigate();
  const { data: familyInfo } = useFamilyData();
  const { nickname } = useUserNickname().data;
  const { notifications } = useUserNotifications().data;

  const connectWs = () => {
    // websocket 연결

    const SERVER_STOMP_URL = `${process.env.REACT_APP_HOST}/websocket`;

    const sock = new SockJs(SERVER_STOMP_URL);
    const client = StompJs.over(sock);

    client.connect(
      {},
      (data) => {
        console.log('connect!');

        client.subscribe(`/topic/user/${nickname}`, (message) => {
          {message.body && setNotice(true)}
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    connectWs();
    {notifications.length > 0 && setNotice(true)}
  }, [notifications]);

  const createGAEvent = (menu) => {
    ReactGA.event({
      category: 'Button',
      action: `위젯에서 ${menu} 이동`,
      label: 'widget',
    });
  };

  return (
    <FamilyWidget>
      <Link to="/family" onClick={() => createGAEvent('화목지수')}>
        <LeftWrapper>
          <Circle>
            <img
              src={hwamokGrades[familyInfo.level].icon}
              alt={hwamokGrades[familyInfo.level].name}
            />
            {familyInfo.flower && (
              <img
                src={`${process.env.PUBLIC_URL}/images/grades/flower.png`}
                alt=""
                className="hasFlower"
              />
            )}
          </Circle>
          <div>
            <strong>
              {familyInfo.familyName}
              <IconDetail />
            </strong>
            <p>
              {familyInfo.monthlyScore}방울{' '}
              <span>| {familyInfo.score}방울</span>
              <span className="level">
                {hwamokGrades[familyInfo.level].name}
              </span>
            </p>
          </div>
        </LeftWrapper>
      </Link>

      <AlertBtn
        onClick={() => {
          createGAEvent('알림');
          navigate('/notice');
        }}
      >
        <IconAlert />
        {notice && (
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#FF3B3B',
              position: 'absolute',
              top: '-4px',
              right: '-4px',
            }}
          ></div>
        )}
      </AlertBtn>
    </FamilyWidget>
  );
};

export default Widget;

const FamilyWidget = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px 0;
  strong {
    display: block;
    margin-bottom: 5px;
    font-size: 20px;
    svg {
      margin: -2px 0 0 8px;
    }
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  p {
    font-size: 14px;
    span {
      color: #a5a5a5;
      &.level {
        margin-left: 5px;
        border-radius: 60px;
        padding: 1px 9px;
        background: #d3d3d3;
        color: #fff;
        font-size: 14px;
      }
    }
  }
`;

const Circle = styled.div`
  position: relative;
  margin-right: 11px;
  font-size: 0.5em;
  img {
    width: 49px;
    height: 49px;
    &.hasFlower {
      position: absolute;
      top: 0;
      left: -5px;
      width: 20px;
      height: 20px;
    }
  }
`;

const AlertBtn = styled.div`
  cursor: pointer;
  position: relative;
`;
