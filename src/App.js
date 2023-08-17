import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Home from "./Home";
import AdminPanel from "./AdminPanel";
import { LanguageProvider } from "./components/LanguageContext"; // Make sure the correct path is used

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect("http://localhost:3001");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
};

export default App;
