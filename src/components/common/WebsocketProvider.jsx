import React from 'react';
import { connect, send } from '../../hooks/useSocket';

const WebsocketProvider = () => {
  connect();

  return <div></div>;
};

export default WebsocketProvider;
