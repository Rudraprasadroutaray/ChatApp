const io = require('socket.io')({
  cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"],
      credentials: true
  }
});

const users = {};

io.on('connection', socket => {
  socket.on('user-joined', name => {
      console.log("New User", name)
      users[socket.id] = name;
      io.emit('user-joined', name); // Send 'user-joined' event to all connected clients including the new user
  });

  socket.on('send', data => {
      io.emit('receive', { message: data.message, name: users[socket.id] });
  });


//   socket.on('disconnect',message=>{
//     socket.broadcast.emit(users[socket.id]);
//     delete users[socket.id];
// }) 

});

io.listen(8000);
