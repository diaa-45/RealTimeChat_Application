const express=require("express");
const app=express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set("views","public");
app.use(express.static("public"));

app.get("/", (req,res)=>{
  return res.render("index.html");
})

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chatmessage', msg => {
    io.emit('chatmessage', msg);
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});