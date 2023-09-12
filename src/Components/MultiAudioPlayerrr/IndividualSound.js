import React, { useEffect, useRef, useState } from "react";
import BASEURL from "../../Config/global";
import { Howl } from "howler";
import { crossIcon, Spinner } from "../../Assets/svg";
import { useDispatch } from "react-redux";
import { removeAllSound } from "../../Store/Slices/SoundPlayerSlice";

const IndividualSound = ({
  sound,
  isPlaying,
  individualRemoveSound,
  clearMixClicked,
  setSoundList,
}) => {
  const dispatch = useDispatch();
  const howlInstanceRef = useRef(null);
  const patchHowlRef = useRef(null);
  const [volume, setVolume] = useState(0.6);
  const [isLoading, setIsLoading] = useState(true);
  const [hasReached19Seconds, setHasReached19Seconds] = useState(false);

  useEffect(() => {
    howlInstanceRef.current = new Howl({
      src: [BASEURL + sound.audio],
      loop: true,
      autoplay: isPlaying,
      usingWebAudio: true,
      html5: true,
      autoUnlock: true,
      preload: true,
      volume: volume,
      autoSuspend: false,
      onload: function () {
        setIsLoading(false);
        console.log("Loaded");
        patchHowlRef.current = new Howl({
          src: [BASEURL + sound.patch],
          loop: false,
          autoplay: true,
          usingWebAudio: true,
          html5: true,
          autoUnlock: true,
          preload: true,
          volume: 0,
          autoSuspend: false,
        });
      },
      onplay: function () {
        console.log("Playing");
      },
      onunlock: function () {
        console.log("Unlock");
      },
      onpause: function () {
        console.log("Pause");
      },
      onend: function () {
        console.log("End");
      },
      onseek: function () {
        console.log("seeking", howlInstanceRef.current.seek());
      },
    });

    // howlInstanceRef.current.on("load", () => {
    //   setIsLoading(false);
    // });

    return () => {
      if (howlInstanceRef.current) {
        howlInstanceRef.current.unload();
        // patchHowlRef.current.unload();
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
        dispatch(removeAllSound());
        setSoundList([]);
      }
    }
  }, [clearMixClicked]);

  useEffect(() => {
    if (howlInstanceRef.current) {
      howlInstanceRef.current.volume(volume);
    }
  }, [volume]);

  useEffect(() => {
    let intervalId;

    // Function to check the playback time and handle the 19-second condition
    const checkPlaybackTime = () => {
      if (howlInstanceRef.current) {
        const currentTime = howlInstanceRef.current.seek();

        // Check if it has reached 19 seconds
        if (currentTime >= 24 && !hasReached19Seconds) {
          setHasReached19Seconds(true);
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
            },
            onplay: function () {
              console.log("Patch Play");
            },
          });
          // Do something when it reaches 19 seconds
        }

        // If it's looping, reset the flag to false after each loop
        if (currentTime < 1 && hasReached19Seconds) {
          setHasReached19Seconds(false);
        }
      }
    };

    // Set up an interval to continuously check the playback time (every second)
    intervalId = setInterval(checkPlaybackTime, 1000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(intervalId);
      // if (patchHowlRef.current) {
      //   patchHowlRef.current.unload();
      // }
    };
  }, [hasReached19Seconds]);

  const handleVolume = (value) => {
    if (value === "Increase") {
      setVolume((prevVolume) => Math.min(prevVolume + 0.2, 1));
    } else if (value === "Decrease") {
      setVolume((prevVolume) => Math.max(prevVolume - 0.2, 0));
    }
  };

  const handleRemove = () => {
    if (howlInstanceRef.current) {
      howlInstanceRef.current.unload();
    }
    individualRemoveSound();
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

export default IndividualSound;
