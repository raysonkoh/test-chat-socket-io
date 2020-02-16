import React from 'react';
import io from 'socket.io-client';
import {ENDPOINT} from '../configs';
const socket = io(ENDPOINT);

const Chatpage = props => {
  return <h1>CHAT PAGE</h1>;
};

export default Chatpage;
