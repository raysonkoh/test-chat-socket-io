import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {ENDPOINT} from '../configs';
let socket;

const Chatpage = props => {
  const [messages, setMessages] = useState([]);
  const [currMsg, setCurrMsg] = useState('');
  const {name, room} = props.location;

  useEffect(() => {
    if (!name || !room) {
      console.log('invalid');
      props.history.push('/');
    }

    socket = io(ENDPOINT);
    console.log('connected');

    socket.on('server-to-client-message', ({msg}) => {
      const newMessages = [];
      for (let i = 0; i < messages.length; i++) {
        newMessages[i] = messages[i];
      }
      newMessages.push(msg);
      setMessages(newMessages);
      console.log('received message', msg);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>
        CHAT PAGE Name: {name} Room: {room}
      </h1>
      {messages.map(msg => (
        <div>
          <p>{msg}</p>
        </div>
      ))}
      <input
        value={currMsg}
        onChange={e => setCurrMsg(e.target.value)}
        placeholder="type your message here..."
      />
      <button>send message</button>
    </div>
  );
};

export default Chatpage;
