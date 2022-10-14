import React from 'react'

export default function MessagesBox({message, index}) {
  return (
    <div key={index} className={message.status} id="all-msg">
    <span id={"from"}> {message.username}</span>
    <div className="message-item">{message.msg}</div>
  </div>
  )
}
