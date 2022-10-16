import React from "react";

export default function Button({
  cls, value, onclick,
  pl, txt, type,  src,
  func, id,
}) {
  if (onclick && !src) {
    return (
      <div className={cls} id={id} onClick={func}>
        {txt}
      </div>
    );
  }
  if (src) {
    return <img className={cls} id={id} src={src} onClick={func} />;
  } else {
    return (
      <input
        type={type}
        placeholder={pl}
        className={cls}
        value={value}
        id={id}
        onChange={func}
      />
    );
  }
}
