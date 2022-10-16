import React from "react";

export default function Typing({typing}) {
  return (
    <small
      style={{
        opacity: "0.3",
        marginLeft: "12px",
      }}
    >
      {typing ? `${typing}  is typing` : ""}
    </small>
  );
}
