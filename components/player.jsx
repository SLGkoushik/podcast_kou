import React, { useState, useEffect , useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
  faVolumeHigh,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { Files, getAudio } from '../lib/db';

function getTime(seconds) {
  var s = new Date(seconds * 1000).toISOString().substring(14, 19);
  return s;
}

const Player = ({ audio }) => {


  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [position, setPosition] = useState(0);
  const duration = audio?.duration || 0;
  const intervalRef = useRef(null);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audio.volume = newVolume / 100;
  };

  const handlePositionChange = (event) => {
    const newPosition = event.target.value;
    setPosition(newPosition);
    audio.currentTime = newPosition;
  };

  const handlePlayPause = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
      clearInterval(intervalRef.current);
    } else {
      audio.play();
      setPlaying(true);
      intervalRef.current = setInterval(() => {
        setPosition(audio.currentTime);
      }, 100);
    }
  };

  const handleStop = () => {
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
    setPosition(0);
    clearInterval(intervalRef.current);
  };

  return (
    <div className="player">
      <div className="player_info">
        <img src="https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b" alt="album cover" />
        <div className="player__songInfo">
          <h4>Yeah!</h4>
          <p>Usher</p>
        </div>
      </div>
      <div className="player_duration">
        {getTime(position)}
        <input type="range" min="0" max={duration} value={position} onChange={handlePositionChange} />
        {getTime(duration)}
      </div>
      <div className="player_controls">
        <FontAwesomeIcon icon={faStepBackward} />
        <FontAwesomeIcon icon={playing ? faPause : faPlay} onClick={handlePlayPause} />
        <FontAwesomeIcon icon={faStepForward} />
        {/* <FontAwesomeIcon icon={faStop} onClick={handleStop} /> */}
      </div>
      <div className="player_volume">
        <FontAwesomeIcon icon={faVolumeHigh} />
        <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
      </div>
    </div>
  );
};

export default Player;
