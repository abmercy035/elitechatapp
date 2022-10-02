import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";

const Home = ({ sendRoom }) => {
  const [roomName, setRoomName] = React.useState("");
  const navigate = useNavigate();

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      <select
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      >
        <option value="" disabled>
          Select A Room
        </option>
        <option value="anonymous-chat">Anonymous</option>
        <option value="scoholars-forum">Scholars</option>
      </select>

      <button
        onClick={() => {
          sendRoom(roomName);
          roomName && navigate("/chat");
        }}
        className="enter-room-button"
      >
        Join room
      </button>
    </div>
  );
};

export default Home;
