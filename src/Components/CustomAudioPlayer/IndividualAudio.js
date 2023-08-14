import React, { useEffect, useRef, useState } from "react";
import BASEURL from "../../Config/global";
import { crossIcon, Spinner } from "../../Assets/svg";
import { useDispatch } from "react-redux";
import { removeAudio } from "../../Store/Slices/AudioSlice";

const IndividualAudio = ({
  sound,
  isPlaying,
  individualRemoveAudio,
  clearMixClicked,
  setOtherAudio,
}) => {
  const dispatch = useDispatch();
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const [volume, setVolume] = useState(0.6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
  
    const audioElement = new Audio(BASEURL + sound.audio);
    audioElement.loop = true;
  
    const sourceNode = audioContextRef.current.createMediaElementSource(audioElement);
  
    gainNodeRef.current.gain.value = volume;
    sourceNode.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);
    audioElement.play();
  
    audioElement.addEventListener("canplaythrough", () => {
      setIsLoading(false);
      if (isPlaying) {
        audioElement.play();
      }
    });
  
    return () => {
      audioElement.pause();
      audioElement.src = "";
      sourceNode.disconnect();
      gainNodeRef.current.disconnect();
      audioContextRef.current.close();
    };
  }, [sound.audio]);

  useEffect(() => {
    if (isPlaying) {
      audioContextRef.current.resume();
    } else {
      audioContextRef.current.suspend();
    }
  }, [isPlaying]);


  useEffect(() => {
    if (clearMixClicked) {
      individualRemoveAudio();
    }
  }, [clearMixClicked]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  const handleVolume = (value) => {
    if (value === "Increase") {
      setVolume((prevVolume) => Math.min(prevVolume + 0.2, 1));
    } else if (value === "Decrease") {
      setVolume((prevVolume) => Math.max(prevVolume - 0.2, 0));
    }
  
    // Resume the audio context if it's suspended
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  
    // Update the gain node's gain value
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  };

  return (
    <div className="individualAudio">
      <div className="mixerSoundDetail">
        <div className="mixerSoundThumbnailWrapper flex-shrink-0">
          <span
            className="soundControlButton audioRemoveButton"
            onClick={individualRemoveAudio}
          >
            <img src={crossIcon} alt="Cross Icon" />
          </span>
          {isLoading ? (
            <div className="spinner">
              <img src={Spinner} alt="Spinner" />
            </div>
          ) : (
            <>
              <div className="mixerSoundThumbnail">
                <img src={BASEURL + sound.thumbnail} alt="Thumbnail" />
              </div>
            </>
          )}
        </div>
        <div className="flex-grow-1">
          <p className="mixerAudioTitle">{sound.title}</p>
        </div>
        <div className="d-flex align-center gap-2 flex-shrink-0">
          <span
            className="soundControlButton"
            onClick={() => handleVolume("Decrease")}
          >
            -
          </span>
          <span
            className="soundControlButton"
            onClick={() => handleVolume("Increase")}
          >
            +
          </span>
          <span
            className="soundControlButton"
            onClick={() => setOtherAudio(sound)}
          >
            Play
          </span>
        </div>
      </div>
    </div>
  );
};

export default IndividualAudio;
