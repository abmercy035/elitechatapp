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

<header id="login-header">
        <h3>Elite Chat App</h3>
      </header>
      <blockquote>
        Hello welcome to Elite multipurpose Chat App the App is mainly for students,
        Stay with us as we integrate
        more other functions that will benefit and aid efficient study.
      <blockquote>
        <b>Today will be An Anonymous Night to test the capability of this App. Thank you </b>
      </blockquote>
      </blockquote>

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
        <optgroup label="anonymous 9:00-pm">
          <option value="anonymous">Anonymous</option>
          {/* <option value="Anonymous-200lvl">Anonymous 200lvl 8:00-pm</option> */}
        </optgroup>
        {/* <optgroup label="Scholars-Forum 8:00-pm">

        <option value="scoholars-forum-100lvl">Scholars 100 level</option>
        <option value="scoholars-forum-200lvl">Scholars 200 level</option>
        </optgroup>
        <option value="Counciling-forum">Council Group 9:00-pm</option> */}
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
