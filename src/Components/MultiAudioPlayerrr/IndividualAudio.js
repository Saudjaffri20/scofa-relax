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
  const [volume, setVolume] = useState(0.5);
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
    if (value === "Increase") {
      setVolume((prevVolume) => Math.min(prevVolume + 0.1, 1));
    } else if (value === "Decrease") {
      setVolume((prevVolume) => Math.max(prevVolume - 0.1, 0));
    }
  };

  const handleRemove = () => {
    if (howlInstanceRef.current) {
      howlInstanceRef.current.unload();
    }
    individualRemoveAudio();
  };

  // useEffect(() => {
  //   // Check if the "Clear Mix" button is clicked
  //   handleRemove();
  //   // Reset the clearMixClicked state in the parent
  //   resetClearMix();
  // }, [clearMixClicked]);

  return (
    <div className="individualAudio">
      <div className="mixerSoundDetail">
        <div className="mixerSoundThumbnailWrapper flex-shrink-0">
          <button
            className="soundControlButton audioRemoveButton"
            onClick={handleRemove}
          >
            <img src={crossIcon} alt="Cross Icon" />
          </button>
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
          <button
            className="soundControlButton"
            onClick={() => handleVolume("Decrease")}
          >
            -
          </button>
          <button
            className="soundControlButton"
            onClick={() => handleVolume("Increase")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualAudio;
