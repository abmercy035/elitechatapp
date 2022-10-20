import React from "react";

export default function MessagesBox({ message }) {
  return (
    <div key={Math.random() * 50} className={message.status} id="all-msg">
      <span key={Math.random() * 150} id={"from"}>
        {" "}
        {message.username}
      </span>
      <div key={Math.random() * 200} className="message-item">
        {message.msg}
      </div>
    </div>
  );
}
