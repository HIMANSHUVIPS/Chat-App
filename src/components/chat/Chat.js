import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join';
import socketIo from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import "./Chat.css";    
import Message from '../Message/Message';
const ENDPOINT = "https://my-chat-server-node.herokuapp.com/";
let socket;


const Chat = () => {
  const [id, setid] = useState("");
  const [Messages, setMessages] = useState([]);
  const send = ()=>{
  
    const message=document.getElementById('chatInput').value;
    document.getElementById("chatInput").value=null;
    socket.emit('message',{message,id});
    
  }
    useEffect(() => {
      socket = socketIo(ENDPOINT,{transports:['websocket']});
      socket.on('connect',()=>{
        alert('connected');
        setid(socket.id); 
      });
      socket.emit('joined',{user})

      socket.on('welcome',(data)=>{
        setMessages([...Messages,data]);
        console.log(data.user,data.message);
      });
      socket.on('userJoined',(data)=>{
        setMessages([...Messages,data]);
        console.log(data.user,data.message);
      });
      socket.on('leave',(data)=>{
        setMessages([...Messages,data]);
        console.log(data.user,data.message);
      });
      return () => {
        socket.emit('disconnect');
        socket.off();
      }
    }, []);

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setMessages([...Messages,data]);
        console.log(data.user,data.message,data.id);
      });
    
      return () => {
        socket.off();
      }
    }, [Messages]);
    
  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
              <h2>My Chat</h2>
              <a href='/'><img src='./images/closeIcon.png' alt='close'></img></a>
            </div>
            <ScrollToBottom className='chatBox'>
             { Messages.map((item,index) => <Message user ={item.id===id ? '':item.user} message={item.message} classs={item.id===id?'right':'left'} />)}
            </ScrollToBottom>
            <div className='inputBox'>
                <input type='text' onKeyPress={(event)=>event.key ==='Enter' ? send() : null} id='chatInput' placeholder='Message...'/>
                <button className='sendBtn' onClick={send}><img src='./images/send.png' alt='send'></img></button>
            </div>
            
        </div>  
    </div>
  )
}

export default Chat