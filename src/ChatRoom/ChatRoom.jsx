import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatRoom.css";
import "./canva.css";
import MessagesBox from "../components/MessagesBox";
import Typing from "../components/Typing";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Header from "../components/Header";
export default function ChatRoom({ socket }) {
  const navigate = useNavigate();
  const inputEl = useRef(null);
  const lastEl = useRef(null);
  const MESSAGE_EVENT = "newMsg";
  const USER_JOINED_EVENT = "joinedUser";
  const NEW_MESSAGE_EVENT = "newChatMessage";
  const room = socket.io.opts.query.room;
  const username = localStorage.getItem("username");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState();
  const [lineWidth, setLineWidth] = useState();
  const [lineColor, setLineColor] = useState();

  const [myMsg, setMyMsg] = useState({
    username,
  });

  let color = "black";
  let strokeSize = 1;

  function changeColor(data) {
    color = data;
  }
  function changeSize(width) {
    strokeSize = width;
  }

  useEffect(() => {
    const navs = document.querySelectorAll("#app-header div");
    const chat = document.querySelector("#messages-cont");
    const cboard = document.querySelector("#canvas-cont");

    //
    //
    //
    //

    // toggling Tabs
    Array.from(navs).forEach((nav) => {
      console.log(nav);
      nav.addEventListener("click", (e) => {
        if (e.target.id === "cboard") {
          Array.from([chat]).forEach((elem) => {
            if (!elem.classList.contains("hide")) {
              elem.classList.toggle("hide");
              cboard.classList.toggle("hide");
            }
          });
        } else if (e.target.id === "chat") {
          Array.from([cboard]).forEach((elem) => {
            if (!elem.classList.contains("hide")) {
              elem.classList.toggle("hide");
              chat.classList.toggle("hide");
            }
          });
        }
      });
    });

    //
    //
    //
    //

    // window.addEventListener("load", () => {
    var canvas = document.getElementById("canvas-board");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    //
    //
    //
    //

    //resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //
    //
    //
    //

    //variables
    let painting = false;

    //
    //
    //
    //

    //functions
    function startPosition(e) {
      painting = true;
      socket.emit("pointerdown", { clientX: e.clientX, clientY: e.clientY });
      draw(e);
    }

    //
    //
    //
    //

    function endPosition() {
      painting = false;
      ctx.beginPath();
      socket.emit("pointerup", false);
    }

    //
    //
    //
    //

    function draw(e) {
      if (!painting) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      ctx.lineWidth = strokeSize;
      ctx.lineCap = "round";
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      socket.emit("pointermove", { offsetX: e.offsetX, offsetY: e.offsetY });
    }

    //
    //
    //
    //

    //event listeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("touchend", endPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener(
      "touchmove",

      //
      //
      //
      //

      function (e) {
        var touch = e.touches[0];
        let r = canvas.getBoundingClientRect();
        var mouseEvent = new MouseEvent("mousemove", {
          clientX: touch.clientX - r.left,
          clientY: touch.clientY - r.top,
        });
        draw(mouseEvent);
      },
      false
    );

    //
    //
    //
    //

    socket.on("penStart", (e) => {
      if (!painting) {
        return;
      }
      ctx.lineWidth = strokeSize;
      ctx.lineCap = "round";
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    });
    socket.on("penStop", (data) => {
      painting = data;
      ctx.beginPath();
    });
    socket.on("penMove", (e) => {
      ctx.lineWidth = strokeSize;
      ctx.lineCap = "round";
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    });
  }, []);

  const clearCanva = () => {
    var canvas = document.getElementById("canvas-board");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const Pressing = () => {
    socket.emit("keyPress", username);
  };

  useEffect(() => {
    lastEl.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    socket.on("typing", (data) => {
      if (data !== username) {
        setTyping(data);
      }
      setTimeout(() => setTyping(""), 2000);
    });

    // if (!socket.io.opts.query.room) navigate("/");
    socket.on(NEW_MESSAGE_EVENT, (data) => {
      const incoming = {
        ...data,
        status: data.id === socket.id ? "sent" : "received",
      };
      setMessages((prevMsg) => [...prevMsg, incoming]);
    });
    socket.on(USER_JOINED_EVENT, (data) => {
      data.id !== socket.id ? showMe(data) : show(data);
    });
  }, []);

  const showMe = (data) => {
    const newU = document.querySelector("#messages-cont");
    const div = document.createElement("div");
    div.id = "welcome-msg";
    setTimeout(() => {
      document.querySelector("#welcome-msg").remove();
    }, 2000);
    div.innerHTML = `<span> <b>${data.username}</b> Joined the chat </span>`;
    newU.appendChild(div);
  };

  const show = (data) => {
    const newU = document.querySelector("#messages-cont");
    const div = document.createElement("div");
    div.id = "welcome-msg";
    const bef = document.querySelector("#all-msg");
    div.innerHTML = `
      <span>
      hello ${data.username} welcome to the group chat
      </span>
      <sub> -javascript- </sub>
      `;
    newU.insertBefore(div, bef);
  };

  const sendMSg = (e) => {
    e.preventDefault();
    if (myMsg.msg) socket.emit(MESSAGE_EVENT, { ...myMsg });
    setMyMsg({ ...myMsg, msg: "" });
  };

  return (
    <>
      <Header />

      <div id="chatroom-cont">
        <header id="chat-header">
          <h2 id="room-name">{room} Room</h2>
        </header>
        <section id="chat-body">
          <div id="messages-cont" className="containers">
            {messages.map((message, i) => {
              return <MessagesBox message={message} index={i} />;
            })}
            <div id="last-msg" ref={lastEl}>
              <Typing typing={typing} />
            </div>
          </div>
          <div id="canvas-cont" className="containers hide">
            <div id="toolbox">
              <Button
                id="lineSize"
                cls="tools"
                type="number"
                func={(e) => changeSize(e.target.value)}
              />
              <Button
                id="colorSelector"
                cls="tools"
                txt="erase"
                type="color"
                func={(e) => changeColor(e.target.value)}
              />
              <Button
                txt="erase"
                id="eraser"
                cls="tools"
                value={strokeSize}
                func={() => changeColor("white")}
                onclick
              />
              <Button
                txt="Clear All"
                id="eraser"
                cls="tools"
                func={() => clearCanva()}
                onclick
              />
              <div />
            </div>
            <canvas id="canvas-board"></canvas>
          </div>
        </section>
        <Footer
          sendMSg={sendMSg}
          Pressing={Pressing}
          setMyMsg={setMyMsg}
          myMsg={myMsg}
          inputEl={inputEl}
        />
      </div>
    </>
  );
}
