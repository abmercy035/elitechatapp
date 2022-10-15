import React from "react";

export default function Button({id, cls, txt, onclick, func, type, src}) {

  if(onclick && !src){
    return (
      <div className={cls} id={id}  onClick={func}>
        {txt}
      </div>
    );
  }
  if(src){
    return (
      <img className={cls} id={id} src={src}  onClick={func}
      />
    );
  }
  else{
  return (
    <input type={type} className={cls}  id={id} onChange={func}
    />
  );}
}
