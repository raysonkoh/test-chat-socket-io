const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;
const User = require('./models/User');
const UserHandler = require('./models/UserHandler');
const userHandler = new UserHandler();

io.on('connection', socket => {
  console.log('user has connected!');

  socket.on('client-to-server-join-room', ({name, room}, errHandler) => {
    console.log('received client-to-server-join-room on server!');
    const newUser = new User(socket.id, name, room);
    const {err, user} = userHandler.addUser(newUser);
    if (err) {
      console.log(err);
    }
    console.log(userHandler.users);
    socket.join(room);
    io.to(room).emit('server-to-client-message', {
      msg: {
        username: 'admin',
        text: `Welcome to room ${room}, ${name}!`,
      },
    });
  });

  socket.on('client-to-room-message', ({room, msg}, callback) => {
    console.log(
      `received client to room message, ${room}, ${msg.username} ${msg.text}`,
    );
    io.to(room).emit('server-to-client-message', {
      msg,
    });
    callback();
  });

  socket.on('disconnect', () => {
    console.log('user has disconnected');
    const {err, user} = userHandler.removeUser(socket.id);
    if (err) {
      console.log(err);
    }
    console.log(userHandler.users);
  });
});

app.use(express.json());

if (process.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
