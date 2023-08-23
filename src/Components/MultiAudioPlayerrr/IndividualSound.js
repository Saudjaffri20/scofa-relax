import React, { useEffect, useRef, useState } from "react";
import BASEURL from "../../Config/global";
import { useDispatch } from "react-redux";
import { Howl } from "howler";
import { CrossIcon } from "../../Assets/svg";

const IndividualSound = ({ sound, isPlaying }) => {
  console.log(sound);
  const dispatch = useDispatch();
  // const howlInstanceRef = useRef(null);
  const [howlState, setHowlState] = useState(null);
  const [volume, setVolume] = useState(0.6);
  // const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     howlInstanceRef.current = new Howl({
  //       src: [BASEURL + sound.audio],
  //       loop: true,
  //       autoplay: isPlaying,
  //       html5: true,
  //       autoUnlock: true,
  //       preload: true,
  //       volume: volume,
  //       autoSuspend: false,
  //     });

  //     //   howlInstanceRef.current.on("load", () => {
  //     //     setIsLoading(false);
  //     //   });

  //     //   return () => {
  //     //     if (howlInstanceRef.current) {
  //     //       howlInstanceRef.current.unload();
  //     //     }
  //     //   };
  //   }, [sound.audio]);

  useEffect(() => {
    const howl = new Howl({
      src: [BASEURL + sound.audio],
      loop: true,
      autoplay: isPlaying,
      webAudio: true, // Use Web Audio API if supported
      html5: true, // Use HTML5 audio if supported
      autoUnlock: true,
      preload: true,
      volume: volume,
      autoSuspend: false,
    });

    setHowlState(howl);
    // setHowlCount(howlList.length);
  }, [sound.audio]);

  useEffect(() => {
    if (howlState) {
      if (isPlaying) {
        howlState.play();
      } else {
        howlState.pause();
      }
    }
  }, [isPlaying]);

  //   useEffect(() => {
  //     if (howlInstanceRef.current) {
  //       if (clearMixClicked) {
  //         howlInstanceRef.current.unload();
  //         dispatch(removeAllSound());
  //         setSoundList([]);
  //       }
  //     }
  //   }, [clearMixClicked]);

  //   useEffect(() => {
  //     if (howlInstanceRef.current) {
  //       howlInstanceRef.current.volume(volume);
  //     }
  //   }, [volume]);

  //   const handleVolume = (value) => {
  //     if (value === "Increase") {
  //       setVolume((prevVolume) => Math.min(prevVolume + 0.2, 1));
  //     } else if (value === "Decrease") {
  //       setVolume((prevVolume) => Math.max(prevVolume - 0.2, 0));
  //     }
  //   };

  //   const handleRemove = () => {
  //     if (howlInstanceRef.current) {
  //       howlInstanceRef.current.unload();
  //     }
  //     individualRemoveSound();
  //   };

  return (
    <div className="individualAudio">
      <div className="mixerSoundDetail">
        <img
          src={BASEURL + sound.thumbnail}
          alt="Thumbnail"
          className="mixerSoundThumbnail"
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          //   onChange={(e) => {
          //     handleIndividualVolume(e);
          //   }}
        />
        <button
          className="notButton audioRemoveButton"
          //   onClick={() => {
          //     handleRemoveSound();
          //   }}
        >
          <CrossIcon />
        </button>
      </div>
      <p className="mixerAudioTitle">{sound.title}</p>
    </div>
  );
};

export default IndividualSound;
