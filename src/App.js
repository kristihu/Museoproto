import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Home from "./Home";
import AdminPanel from "./AdminPanel";

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect("http://localhost:3001");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
