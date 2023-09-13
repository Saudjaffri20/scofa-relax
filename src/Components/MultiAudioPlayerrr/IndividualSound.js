import React, { useEffect, useRef, useState } from "react";
import BASEURL from "../../Config/global";
import { useDispatch } from "react-redux";
import { Howl } from "howler";
import { crossIcon, Spinner } from "../../Assets/svg";
import { removeAllSound } from "../../Store/Slices/SoundPlayerSlice";

const IndividualSound = ({
  sound,
  index,
  // isPlaying,
  // individualRemoveSound,
  // clearMixClicked,
  // setSoundList,
  handleRemoveSound,
  handleSoundVolume,
  soundList,
  howlList,
}) => {
  const dispatch = useDispatch();
  const howlInstanceRef = useRef(null);
  const patchHowlRef = useRef(null);
  const [hasPlayedPatch, setHasPlayedPatch] = useState(false);

  const checkPlaybackTime = () => {
    const currentTime = howlList[index].seek();

    // Check if it has reached 19 seconds
    if (currentTime >= 24 && !hasPlayedPatch) {
      patchHowlRef.current = new Howl({
        src: [BASEURL + sound.patch],
        loop: false,
        autoplay: true,
        usingWebAudio: true,
        html5: true,
        autoUnlock: true,
        preload: true,
        volume: 1, // Adjust the volume as needed
        autoSuspend: false,
        onend: function () {
          // Unload patchHowl when it ends
          patchHowlRef.current.unload();
          // setHasPlayedPatch(false); // Reset the flag when it ends
        },
        onplay: function () {
          console.log("Patch Play");
          setHasPlayedPatch(true); // Set the flag to true when it plays
        },
      });
    } else if (currentTime < 1 && hasPlayedPatch) {
      // If it's looping, reset the flag to false after each loop
      setHasPlayedPatch(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkPlaybackTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="individualAudio">
      <div className="mixerSoundDetail">
        <div className="mixerSoundThumbnailWrapper flex-shrink-0">
          <span
            className="soundControlButton audioRemoveButton"
            onClick={() => {
              handleRemoveSound(index);
            }}
          >
            <img src={crossIcon} alt="Cross Icon" />
          </span>

          <div className="mixerSoundThumbnail">
            <img src={BASEURL + sound.thumbnail} alt="Thumbnail" />
          </div>
        </div>
        <div className="flex-grow-1">
          <p className="mixerAudioTitle">{sound.title}</p>
        </div>
        <div className="d-flex align-center gap-2 flex-shrink-0">
          <span
            className="soundControlButton"
            onClick={() => handleSoundVolume("Decrease", index)}
          >
            -
          </span>
          <span
            className="soundControlButton"
            onClick={() => handleSoundVolume("Increase", index)}
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default IndividualSound;
