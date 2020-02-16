const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;

io.on('connection', socket => {
    console.log('user has connected!');

    socket.on('disconnect', () => {
        console.log('user has disconnected');
    });
});

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Hello World!'
    });
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
