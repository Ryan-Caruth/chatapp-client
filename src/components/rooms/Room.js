//Used to establish a connection between the client and the server.
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../chat/Chat";
import "./styles.css"

const socket = io("http://localhost:5000");

function Room() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");

  //Function to join a room when the user clicks the join button.
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join-room", room);
    }
  };

  return (
    <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="John...."
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="RoomID..."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
          <button onClick={joinRoom}>Join A Room</button>
          
          <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default Room;
