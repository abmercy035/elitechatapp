import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";

const Home = ({sendRoom}) => {
  const [roomName, setRoomName] = React.useState("");
  const navigate = useNavigate();

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const pageAccessedByReload = (
    (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
  );
  // if(pageAccessedByReload){navigate('/')}


  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <button onClick={()=>{sendRoom(roomName)
         roomName && navigate("/chat")
        }} className="enter-room-button">
      
        Join room
      </button>
    </div>
  );
};

export default Home;
