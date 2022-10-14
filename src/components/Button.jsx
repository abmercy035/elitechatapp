import React from "react";

export default function Button({id, cls, txt, onclick, func, type}) {

  if(onclick){
    return (
      <div className={cls} id={id}  onClick={func}>
        {txt}
      </div>
    );
  }
  else{
  return (
    <input type={type} className={cls} id={id} onChange={func}
    />
  );}
}
