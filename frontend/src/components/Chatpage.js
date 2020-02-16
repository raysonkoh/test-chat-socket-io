import React from 'react';
import io from 'socket.io-client';
import {ENDPOINT} from '../configs';
const socket = io(ENDPOINT);

const Chatpage = props => {
  const {name, room} = props.location;
  console.log(name, room);
  return <h1>CHAT PAGE</h1>;
};

export default Chatpage;
