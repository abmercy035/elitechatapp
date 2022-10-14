import React from "react";

export default function Footer({sendMSg, Pressing, setMyMsg, myMsg, inputEl}) {
  return (
    <footer id="chat-foot">
      <form id="chat-form" onSubmit={sendMSg}>
        <input
          id="msg-input"
          type="text"
          name="msg"
          ref={inputEl}
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
  );
}
