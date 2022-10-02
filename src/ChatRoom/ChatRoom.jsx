import React, { useRef } from "react";
import "./ChatRoom.css";
import useChat from "../useChat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ChatRoom = ({ room }) => {
  const navigate = useNavigate();
  const roomId = room;
  const inputEl = useRef(null);
  const msgInput = document.querySelector("#msg-input");
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const handleNewMessageChange = (event) => {
    if (event.target.value) setNewMessage(event.target.value);
  };
  useEffect(() => {
    if (!roomId) navigate("/");
    inputEl.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
    msgInput.focus();
  };

  return (
    <div className="chat-room-container">
      <header id="chat-header">
        <h1 className="room-name">Room: {roomId}</h1>
      </header>
      <div className="messages-container">
        <ol className="messages-list">
          <div id="welcome-msg">
            <span>
              welcome to {roomId} feel free to say anything all identites are
              kept anonymous.
            </span>
            <sub>-Javascript Enthusiast-</sub>
          </div>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
        <div id="last-msg" ref={inputEl}></div>
      </div>
      <footer id="footer">
        <input
          id="msg-input"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatRoom;
