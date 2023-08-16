import React, { useState } from "react";

import "./style.css";

const VolumeBar = () => {
  const [overAllVolume, setOverAllVolume] = useState(0.6);
  const increaseVolume = () => {
    const newVolume = Math.min(overAllVolume + 0.2, 1);
    setOverAllVolume(newVolume);
    Howler.volume(newVolume); // Update the global volume
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(overAllVolume - 0.2, 0);
    setOverAllVolume(newVolume);
    Howler.volume(newVolume); // Update the global volume
  };
  return (
    <div className="overallVolumeControl">
      <button
        className="playerAction overallVolumeAction"
        onClick={decreaseVolume}
      >
        -
      </button>
      <div className="volumeBars">
        <div className={`volumeBar ${volume >= 0.2 ? "active" : ""}`}></div>
        <div className={`volumeBar ${volume >= 0.4 ? "active" : ""}`}></div>
        <div className={`volumeBar ${volume >= 0.6 ? "active" : ""}`}></div>
        <div className={`volumeBar ${volume >= 0.8 ? "active" : ""}`}></div>
        <div className={`volumeBar ${volume >= 1 ? "active" : ""}`}></div>
      </div>
      <button
        className="playerAction overallVolumeAction"
        onClick={increaseVolume}
      >
        +
      </button>
    </div>
  );
};

export default VolumeBar;
