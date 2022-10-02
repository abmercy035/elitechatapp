import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";

function App() {

  const [roomVal, setRoomVal] = useState();
  const changeRoom = (value) => {
    if (value) {
      setRoomVal(value);
    }
  };
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home sendRoom={changeRoom} />} />
        <Route exact path="/chat" element={<ChatRoom room={roomVal} />} />
      </Routes>
    </Router>
  );
}

export default App;
