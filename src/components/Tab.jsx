import React from "react";

export default function Tab({ id, cls, txt }) {

    return (
      <div className={cls} id={id}>
        {txt}
        
      </div>
    );
  // }
}
