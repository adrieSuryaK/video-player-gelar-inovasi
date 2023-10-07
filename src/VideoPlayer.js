import React, { useState, useEffect, useRef } from 'react';

function VideoPlayer() {
    const [videoStatus, setVideoStatus] = useState('');
    const videoRef = useRef(null);
    const [hasLoaded, setHasLoaded] = useState(false);
  
    useEffect(() => {
      const eventSource = new EventSource('http://192.168.1.3:4000/monitorVideoStatus');
  
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setVideoStatus(data.status);
      };
  
      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
      };
  
      return () => {
        eventSource.close();
      };
    }, []);
  
    useEffect(() => {
      if (videoRef.current && hasLoaded) {
        videoRef.current.play();
      }
    }, [hasLoaded]);
  
    useEffect(() => {
      // Handle video source changes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = getVideoSource();
        videoRef.current.load();
        videoRef.current.addEventListener('loadedmetadata', () => {
          setHasLoaded(true);
        });
      }
    }, [videoStatus]);
  
    const getVideoSource = () => {
      if (videoStatus === 'waiting') {
        return '/assets/waiting.mp4';
      } else if (videoStatus === 'playing') {
        return '/assets/congratz.mp4';
      } else {
        return '';
      }
    };
  
    return (
      <div className="VideoPlayer">
        <video ref={videoRef} controls loop muted playsInline autoPlay>
          <source src={getVideoSource()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  
  export default VideoPlayer;