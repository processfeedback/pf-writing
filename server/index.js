/* ========== EXTERNAL MODULES ========== */
const express = require('express');
const axios = require('axios');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

/* ========== SYSTEM VARIABLES ========== */
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
// change discordBot string to own discord webhook for local testing
const discordBot = 'https://discord.com/api/webhooks/1172974381383811173/ZYCsisMcH6myTZKglcOCLQdXZEV5TvDGTso-bQqArGdl2N5x16VFu9n_TJFpOQ5jFgXW';

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

/* ========== ROUTES ========== */
app.post('/sendDiscord', ({ body: { userName, room, message, url } }, res) => {
  const userMessage = `User ${userName} has requested assistance in chat room ${room}`;

  const discordMessage = {
    username: 'Captain Hook',
    avatar_url: '',
    content: userMessage,
    embeds: [{
      author: {
        name: userName
      },
      title: 'Link to the code',
      description: message,
      url: url
    }]
  };

  axios.post(discordBot, discordMessage)
  .then(res => {
    // console.log(res.body.data)
    return res.status(201)
  })
  .catch(error => console.error(`Unable to complete your request due to error: ${error}`));
});

io.on('connection', socket => {
  // console.log(`ID: ${socket.id} connected`);

  socket.on('joinRoom', data => {
    socket.join(data);
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on('sendMessage', data => {
    // console.log('Received message: ', data);
    socket.to(data.room).emit('returnMessage', data);
  });

  socket.on('disconnect', () => {
    // console.log(`ID: ${socket.id} disconnected`);
    socket.removeAllListeners();
  });
});

/* ========== SERVER CONNECTIONS ========== */
server.listen(3001, () => console.log(`Listening on http://localhost:3001`));