import React from "react";
import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ sendLoginDetails }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [room, setRoom] = useState();

  const Login = (e) => {
    sendLoginDetails({ username, room });
    localStorage.setItem("username", username);
    e.preventDefault();
    if (username && room) {
      navigate("/chat");
    }
  };

  return (
    <div id="login-cont">
      <header id="login-header">
        <div id="login-logo">?</div>
        <h2 id="comp-name"> Chat App </h2>
      </header>
      <div id="form-cont">
        <div id="login-msg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
          provident doloremque repellendus hic. Quia quidem voluptatum neque
          modi dolor aspernatur?
        </div>

        <div id="login-form-cont">
          <form action="#" id="login-form" onSubmit={Login}>
            <input
              type="text"
              className="username-input"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <select
              className="username-input"
              type="text"
              placeholder="Room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              <option value="" disabled selected>
                Select A Room
              </option>
              <optgroup label="anonymous 9:00-pm">
                <option value="anonymous">Anonymous</option>
                <option value="Anonymous-200lvl">Anonymous 200lvl</option>
              </optgroup>
              <optgroup label="Scholars-Forum 8:00-pm">
                <option value="scoholars-forum-100lvl">
                  scholars 100 level
                </option>
                <option value="scoholars-forum-200lvl">
                  scholars 200 level
                </option>
              </optgroup>
              <option value="Counciling-forum" >Council Group 9:00-pm</option>
              <option value="enter room"> enter a different room </option>
            </select>

            <input
              type="text"
              id="room-input"
              placeholder="Enter Room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <input type="submit" id="submit-input" value="submit" />
          </form>
        </div>
      </div>

      <footer id="login-foot">
        <h4>Sponors</h4>
        <nav>
          <ul>
            <li> 200 level</li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
