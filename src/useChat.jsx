import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
<<<<<<< HEAD
// const SOCKET_SERVER_URL = "https://elitechatapi.herokuapp.com";
const SOCKET_SERVER_URL = "http://localhost:5000";
=======
const SOCKET_SERVER_URL = "https://elitechatapi.herokuapp.com";
// const SOCKET_SERVER_URL = "http://localhost:5000";
>>>>>>> bfdc84660cb7f08d9643392c881c56e0b82279b0

const useChat = (roomId) => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
 

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
