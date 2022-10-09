import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatRoom.css";
export default function ChatRoom({ socket }) {
  const navigate = useNavigate();
  const MESSAGE_EVENT = "newMsg";
  const USER_JOINED_EVENT = "joinedUser";
  const NEW_MESSAGE_EVENT = "newChatMessage";
  const room = socket.io.opts.query.room;
  const username = localStorage.getItem("username");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState();
  const [myMsg, setMyMsg] = useState({
    username,
  });

  const Pressing = () => {
    socket.emit("keyPress", username);
  };

  useEffect(() => {
    socket.on("typing", (data) => {
      if (data !== username) {
        setTyping(data);
      }
      setTimeout(() => setTyping(""), 2000);
    });

    if (!socket.io.opts.query.room) navigate("/");
    socket.on(NEW_MESSAGE_EVENT, (data) => {
      const incoming = {
        ...data,
        status: data.id === socket.id ? "sent" : "received",
      };
      setMessages((prevMsg) => [...prevMsg, incoming]);
    });
    socket.on(USER_JOINED_EVENT, (data) => {
      data.id !== socket.id ? showMe(data) : show(data);
    });
  }, []);

  const showMe = (data) => {
    const newU = document.querySelector("#messages-cont");
    const div = document.createElement("div");
    div.id = "welcome-msg";
    setTimeout(() => {
      document.querySelector("#welcome-msg").remove();
    }, 2000);
    div.innerHTML = `<span> <b>${data.username}</b> Joined the chat </span>`;
    newU.appendChild(div);
  };

  const show = (data) => {
    const newU = document.querySelector("#messages-cont");
    const div = document.createElement("div");
    div.id = "welcome-msg";
    const bef = document.querySelector("#all-msg");
    div.innerHTML = `
      <span>
      hello ${data.username} welcome to the group chat
      </span>
      <sub> -javascript- </sub>
      `;
    newU.insertBefore(div, bef);
  };

  const sendMSg = (e) => {
    e.preventDefault();
    socket.emit(MESSAGE_EVENT, { ...myMsg });
    setMyMsg({ ...myMsg, msg: "" });
  };
  return (
    <div id="chatroom-cont">
      <header id="chat-header">
        <h2 id="room-name">{room} Room</h2>
      </header>
      <section id="chat-body">
        <div id="messages-cont">
          <div id="welcome-msg">
            <span>
              Lorem, ipsum dolor Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Enim .
            </span>
            <sub>Javascript</sub>
          </div>
          {messages.map((message, i) => {
            return (
              <div key={i} className={message.status} id="all-msg">
                <span id={"from"}> {message.username}</span>
                <div className="message-item">
                  {message.msg} : {i}
                </div>
              </div>
            );
          })}
          <small
            style={{
              opacity: "0.3",
marginLeft: "12px",
            }}
          >
            {typing ? `${typing}  is typing` : ""}
          </small>
        </div>
      </section>

      <footer id="chat-foot">
        <form id="chat-form" onSubmit={sendMSg}>
          <input
            type="text"
            name="msg"
            id="msg-input"
            value={myMsg.msg}
            onKeyDown={() => {
              Pressing();
            }}
            onChange={(e) => {
              setMyMsg({
                ...myMsg,
                msg: e.target.value,
              });
            }}
          />
          <input type="submit" name="send-btn" id="send-btn" value={"Send"} />
        </form>
      </footer>
    </div>
  );
}
