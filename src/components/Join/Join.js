import React, { useState } from 'react'
import "./Join.css"
//import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

let user;
const sendUser = ()=>{
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value=null
};

const Join = () => {
const [name, setName] = useState("");
  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src="./images/logo.png" alt="logo" />
        <h1>My-Chat</h1>
        <input onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' type="text" id='joinInput'></input>
        <Link onClick={(event)=>!name ? event.preventDefault():null} to  ='/chat'><button className='joinBtn' onClick={sendUser}>Log In</button></Link>
      </div>
    </div>

  )
}

export default Join;
export {user};