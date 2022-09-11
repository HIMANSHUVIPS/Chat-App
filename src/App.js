import React from 'react'
import Join from './components/Join/Join';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';

import "./App.css"
import Chat from './components/chat/Chat';


const App = () => {

  return (
    <>
        <Router>
          <Routes>
          <Route path="/" exact element= {<Join />}></Route>
          <Route path="/chat" element = {<Chat />}></Route>
          </Routes>
        </Router>
    </>
  )
}

export default App