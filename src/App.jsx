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
  // const SOCKET_SERVER_URL = "https://elitechatapi.herokuapp.com";
  const SOCKET_SERVER_URL = "http://localhost:5000";

  const [room, setRoom] = useState("");
  const socket = socketIOClient(SOCKET_SERVER_URL, {
    reconnectionDelayMax: 10000,
    query: { room },
  });
  const setLoginDetails = ({ username, room }) => {
    setRoom(room);
    socket.emit("newUserJoin", {
      username,
      room,
    });
  };
  return (
    <>
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
    </>
  );
}

export default App;
