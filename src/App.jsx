import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";
import socketIOClient from "socket.io-client";

function App() {
  const [room, setRoom] = useState('')
  const socket = socketIOClient("http://localhost:5000", {
    reconnectionDelayMax: 10000,
    query: { room },
  });

  // const [details, setDetails] = useState({});
  
  const setLoginDetails = ({username, room}) => {
    setRoom(room)
      socket.emit("newUserJoin", {
      username,
      room,
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home sendLoginDetails={setLoginDetails} />}
        />
        <Route exact path="/chat" element={<ChatRoom socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
