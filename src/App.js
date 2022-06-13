import './App.css';
//Used to establish a connection between the client and the server.
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
