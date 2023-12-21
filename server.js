const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let players = {};


app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {

  players[socket.id] = {
    x: 0,
    y: 0,
    id: socket.id
  };

  socket.on('user_info', (info) =>  {
    players[info.id] = {
      x: info.x,
      y: info.y,
      id: info.id
    }
  })

  socket.on('getPlayers', (info) =>  {
    socket.emit('players', players);
  })

  socket.on('disconnect', () => {
    delete players[socket.id];
    console.log("deco: " + socket.id +" | nb joueur:")
  });
});

http.listen(3000, () => {
  console.log('Server is listening on *:3000');
});
