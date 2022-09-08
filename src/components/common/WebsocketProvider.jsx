import React from 'react';
import { connect } from '../../hooks/useSocket';

const WebsocketProvider = () => {
  connect();

  return <div></div>;
};

export default WebsocketProvider;
