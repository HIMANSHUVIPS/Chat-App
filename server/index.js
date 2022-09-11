const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const users= [{}];
app.use(cors());
app.get("/",(req,res)=>{
    res.send("hello")
});
const server = http.createServer(app);

const io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("new connecton");

    socket.on('joined',({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined the chat`});
        socket.emit('welcome',{user:"Admin",message:`Welcome to the Chat ,${users[socket.id]}`});
    });

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:'Admin',message:`${users[socket.id]} Left`})
        console.log(`${users[socket.id]} Left`);
    });
});
const port = process.env.PORT || 8000;
server.listen(port,()=> console.log("Listening to the port 8000"))

