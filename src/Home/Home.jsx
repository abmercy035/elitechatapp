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
              id="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              id="room-input"
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
