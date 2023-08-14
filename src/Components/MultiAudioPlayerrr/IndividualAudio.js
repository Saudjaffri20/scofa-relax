import React, { useEffect, useRef, useState } from "react";
import BASEURL from "../../Config/global";
import { Howl } from "howler";

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
  const howlInstanceRef = useRef(null);
  const [volume, setVolume] = useState(0.6);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    howlInstanceRef.current = new Howl({
      src: [BASEURL + sound.audio],
      autoplay: isPlaying,
      html5: true,
      autoUnlock: true,
      preload: true,
      volume: volume,
      autoSuspend: false,
    });

    howlInstanceRef.current.on("load", () => {
      setIsLoading(false);
    });

    howlInstanceRef.current.on("end", () => {
      handleRemove();
    });

    return () => {
      if (howlInstanceRef.current) {
        howlInstanceRef.current.unload();
      }
    };
  }, [sound.audio]);

  useEffect(() => {
    if (howlInstanceRef.current) {
      if (isPlaying) {
        howlInstanceRef.current.play();
      } else {
        howlInstanceRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (howlInstanceRef.current) {
      if (clearMixClicked) {
        howlInstanceRef.current.unload();
        setOtherAudio(null);
        dispatch(removeAudio());
      }
    }
  }, [clearMixClicked]);

  useEffect(() => {
    if (howlInstanceRef.current) {
      howlInstanceRef.current.volume(volume);
    }
  }, [volume]);

  const handleVolume = (value) => {
    if (howlInstanceRef.current) {
      const currentVolume = howlInstanceRef.current.volume();
      if (value === "Increase") {
        const newVolume = Math.min(currentVolume + 0.2, 1);
        howlInstanceRef.current.volume(newVolume);
        setVolume(newVolume); // Update local state for UI display
      } else if (value === "Decrease") {
        const newVolume = Math.max(currentVolume - 0.2, 0);
        howlInstanceRef.current.volume(newVolume);
        setVolume(newVolume); // Update local state for UI display
      }
    }
  };

  const handleRemove = () => {
    if (howlInstanceRef.current) {
      howlInstanceRef.current.unload();
    }
    individualRemoveAudio();
  };

  return (
    <div className="individualAudio">
      <div className="mixerSoundDetail">
        <div className="mixerSoundThumbnailWrapper flex-shrink-0">
          <span
            className="soundControlButton audioRemoveButton"
            onClick={handleRemove}
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
        </div>
      </div>
    </div>
  );
};

export default IndividualAudio;
