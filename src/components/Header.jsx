import React from "react";
import Tab from "./Tab";

export default function Header() {
  return (
    <header id="app-header">
      {/* <Tab id="Profile" txt="Profile" /> */}
      <Tab id="chat" txt="chat" />
      <Tab id="cboard" txt="c-board" />
      {/* <Tab id="online" txt="online" /> */}
    </header>
  );
}
