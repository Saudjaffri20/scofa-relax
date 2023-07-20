import React, { useEffect, useState } from "react";
import BASEURL from "../../Config/global";
import { Howl } from "howler";

const IndividualSound = ({ sound, isPlaying }) => {
  const [audioLinks, setAudioLinks] = useState([]);
  const [howlInstances, setHowlInstances] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(2);

  // console.log(currentLevel);
  console.log(howlInstances);

  useEffect(() => {
    const duplicateArray = [];
    sound.audio_list.forEach((item) => {
      duplicateArray.push(item);
    });
    setAudioLinks(duplicateArray);
  }, []);

  useEffect(() => {
    const newHowlInstances = audioLinks.map((item, index) => {
      const isMuted = index !== currentLevel;

      const howl = new Howl({
        src: [BASEURL + item],
        loop: true,
        autoplay: isPlaying,
        html5: true,
        autoUnlock: true,
        preload: true,
        volume: 1,
        autoSuspend: false,
        mute: isMuted,
      });
      return howl;
    });
    setHowlInstances(newHowlInstances);
  }, [audioLinks]);

  useEffect(() => {
    if (isPlaying) {
      howlInstances.forEach((howl) => {
        howl.play();
      });
    } else {
      howlInstances.forEach((howl) => {
        howl.pause();
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    // Update the mute property of Howl instances based on currentLevel
    howlInstances.forEach((howl, index) => {
      if (currentLevel === -1) {
        howl.mute(true); // Mute all Howl instances
      } else {
        howl.mute(index !== currentLevel);
      }
    });
  }, [currentLevel]);

  const increaseVolume = () => {
    setCurrentLevel((prevLevel) => Math.min(prevLevel + 1, 4));
  };

  const decreaseVolume = () => {
    setCurrentLevel((prevLevel) => Math.max(prevLevel - 1, -1));
  };

  return (
    <div>
      {sound.title} <button onClick={increaseVolume}>+</button>{" "}
      <button onClick={decreaseVolume}>-</button>
      <div className="volumeBoxes">
        <div className={`volumeBox ${currentLevel >= 0 ? "fill" : ""}`}></div>
        <div className={`volumeBox ${currentLevel >= 1 ? "fill" : ""}`}></div>
        <div className={`volumeBox ${currentLevel >= 2 ? "fill" : ""}`}></div>
        <div className={`volumeBox ${currentLevel >= 3 ? "fill" : ""}`}></div>
        <div className={`volumeBox ${currentLevel >= 4 ? "fill" : ""}`}></div>
      </div>
    </div>
  );
};

export default IndividualSound;
