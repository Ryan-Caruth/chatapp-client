import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./styles.css";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  //State to store all the messages in the room.
  const [messageList, setMessageList] = useState([]);

  //Function that allows us to send message to the server.
  const sendMessage = async () => {
    if (currentMessage !== "") {
      //Object to keep track of data to send to the server.
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      //Create a socket.io event to send the message to the server.
      await socket.emit("send-message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
    }
  };

  //useEffect that will listen to any changes in the socket
  useEffect(() => {
    socket.on("receive-message", (data) => {
      //Print out entire message list plus the new message.
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="messge-meta">
                    <p>{messageContent.author}</p>
                    <p>{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
                  type="text"
                  value={currentMessage}
          placeholder="Type here..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default Chat;
