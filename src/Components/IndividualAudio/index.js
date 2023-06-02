import React, { useState } from "react";
import "./style.css";

const IndividualAudio = ({ thumbnail, title, volume, index }) => {
  const handleIndividualVolume = (e, index) => {
    const volumeLevel = parseFloat(e.target.value);
    console.log(volumeLevel);
  };
  return (
    <>
      <div className="individualAudio">
        <div className="mixerSoundDetail">
          <img src={thumbnail} alt="" className="mixerSoundThumbnail" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              handleIndividualVolume(e, index);
            }}
          />
          <button>X</button>
        </div>
        <p className="mixerSoundTitle">{title}</p>
      </div>
    </>
  );
};
export default IndividualAudio;
