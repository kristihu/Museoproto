import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';

import Gridmain from './components/Gridmain';

const App = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);

  const handleImageClick = (index) => {
    console.log('clickclick',index)
    if (index === 0) {
      setIsPlaying(true);
    }
  };

  const images = [
    './images/Capture.png',
    './images/Capture2.png',
    './images/Capture3.png',
    './images/Capture4.png',
    './images/Capture5.png',
  ];

  const handleButtonClick = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoTime(0);
  };

  return (
    <div className="container">
      <div className="first">
      <Gridmain images={images}  handleClick={handleImageClick} />
     
      <Button variant="contained">Hello World</Button>
        <button onClick={handleButtonClick}>Play Video</button>
      </div>
      <div className="second">
        <Gridmain variant="contained" images={images} />
        {!isPlaying ? (
          <button onClick={handleButtonClick}>Play Video</button>
        ) : (
          <video ref={videoRef} src="/test.mp4" controls style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: isPlaying ? 'block' : 'none' }} onEnded={handleVideoEnd} currenttime={videoTime}></video>
        )}
      </div>
    </div>
  );
};

export default App;
