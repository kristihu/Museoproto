import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';

import Gridmain from './components/Gridmain';

const App = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [videoFile, setVideoFile] = useState('');

 

  const handleImageClick = (id) => {
    const image = images.find((img) => img.id === id);
    if (image) {
      console.log(image,'image')
      setVideoFile(image.video);
      setIsPlaying(true);
    }
  };
  

  const images = [
    { id: 0, image: './images/Capture.png', video: './images/test.mp4' },
    { id: 1, image: './images/Capture2.png', video: './images/test2.mp4' },
    { id: 2, image: './images/Capture3.png', video: './images/test3.mp4' },
    { id: 3, image: './images/Capture4.png', video: './images/test.mp4' },
    { id: 4, image: './images/Capture5.png', video: './images/test2.mp4' },
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
        <Gridmain images={images} handleClick={handleImageClick} />

        <Button variant="contained">Hello World</Button>
        <button onClick={handleButtonClick}>Play Video</button>
      </div>
      <div className="second">
        <Gridmain variant="contained" images={images} />
        {!isPlaying ? (
          <button onClick={handleButtonClick}>Play Video</button>
        ) : (
          <video
            ref={videoRef}
            src={videoFile}
            controls
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: isPlaying ? 'block' : 'none',
            }}
            onEnded={handleVideoEnd}
            currenttime={videoTime}
          ></video>
        )}
      </div>
    </div>
  );
};

export default App;
