import React from "react";
import MessagesBox from "./MessagesBox";

export default function Messages({ messages }) {
  return (
    <>
      {
        messages.map( ( message, i ) =>
        {
         <MessagesBox message={message} key={i} />;
        } )
      }
    </>
  );
}
