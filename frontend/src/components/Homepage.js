import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Homepage = props => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleEnterRoom = e => {
    if (name === '' || room === '') {
      e.preventDefault();
    }
  };

  return (
    <div>
      <input
        placeholder="name?"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="room?"
        value={room}
        onChange={e => setRoom(e.target.value)}
      />
      <Link to={{pathname: '/chat', name, room}} onClick={handleEnterRoom}>
        <button>enter room</button>
      </Link>
    </div>
  );
};

export default Homepage;
