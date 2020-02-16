import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {ENDPOINT} from '../configs';
let socket;

const Chatpage = props => {
  const [messages, setMessages] = useState([]);
  const [currMsg, setCurrMsg] = useState('');
  const {name, room} = props.location;
  const errHandler = err => alert(err);

  useEffect(() => {
    if (!name || !room) {
      console.log('invalid');
      props.history.push('/');
    }

    socket = io(ENDPOINT);
    console.log('connected');
    socket.emit('client-to-server-join-room', {name, room}, errHandler);

    return () => {
      socket.close();
    };
  }, [name, room, props.history]);

  useEffect(() => {
    socket.on('server-to-client-message', ({msg}) => {
      console.log('received message from server', msg);
      const newMessages = [];
      for (let i = 0; i < messages.length; i++) {
        newMessages.push(messages[i]);
      }
      newMessages.push(msg);
      setMessages(newMessages);
      console.log(newMessages);
    });
  }, [messages]);

  const sendMsgHandler = e => {
    socket.emit(
      'client-to-room-message',
      {
        room,
        msg: {
          username: name,
          text: currMsg,
        },
      },
      () => setCurrMsg(''),
    );
  };

  return (
    <div>
      <h1>
        CHAT PAGE Name: {name} Room: {room}
      </h1>
      {messages.map((msg, i) => (
        <div key={i}>
          <p>{msg.text}</p>
          <p>-- {msg.username}</p>
        </div>
      ))}
      <input
        value={currMsg}
        onChange={e => setCurrMsg(e.target.value)}
        placeholder="type your message here..."
      />
      <button onClick={sendMsgHandler}>send message</button>
    </div>
  );
};

export default Chatpage;
