import React from "react";
import Tab from "./Tab";
import "./header.css"

export default function Header() {
  return (
    <header id="app-header">
      {/* <Tab id="Profile" txt="Profile" /> */}
      <Tab id="chat" />
      <Tab id="cboard" />
      {/* <Tab id="online" txt="online" /> */}
    </header>
  );
}