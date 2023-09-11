import React, { useEffect, useRef, useState } from "react";
import BASEURL from "../../Config/global";
import { useDispatch } from "react-redux";
import { Howl } from "howler";
import { CrossIcon } from "../../Assets/svg";

const IndividualSound = ({ sound, isPlaying }) => {
  console.log(sound);
  const dispatch = useDispatch();
  const [howlState, setHowlState] = useState(null);
  const [volume, setVolume] = useState(0.6);

  // useEffect(() => {
  //   const howl = new Howl({
  //     src: [BASEURL + sound.audio],
  //     loop: true,
  //     autoplay: isPlaying,
  //     webAudio: true, // Use Web Audio API if supported
  //     html5: true, // Use HTML5 audio if supported
  //     autoUnlock: true,
  //     preload: true,
  //     volume: volume,
  //     autoSuspend: false,
  //   });

  // //   setHowlState(howl);
  // //   // setHowlCount(howlList.length);
  // // }, [sound.audio]);

  // useEffect(() => {
  //   if (howlState) {
  //     if (isPlaying) {
  //       howlState.play();
  //     } else {
  //       howlState.pause();
  //     }
  //   }
  // }, [isPlaying]);

  // return (
    // <div className="individualAudio">
    //   <div className="mixerSoundDetail">
    //     <div className="mixerSoundThumbnailWrapper flex-shrink-0">
    //       <span
    //         className="soundControlButton audioRemoveButton"
    //         onClick={() => {
    //           handleRemoveSound(index);
    //         }}
    //       >
    //         <img src={crossIcon} alt="Cross Icon" />
    //       </span>

    //       <div className="mixerSoundThumbnail">
    //         <img src={BASEURL + sound.thumbnail} alt="Thumbnail" />
    //       </div>
    //     </div>
    //     <div className="flex-grow-1">
    //       <p className="mixerAudioTitle">{sound.title}</p>
    //     </div>
    //     <div className="d-flex align-center gap-2 flex-shrink-0">
    //       <span
    //         className="soundControlButton"
    //         onClick={() => handleSoundVolume("Decrease", index)}
    //       >
    //         -
    //       </span>
    //       <span
    //         className="soundControlButton"
    //         onClick={() => handleSoundVolume("Increase", index)}
    //       >
    //         +
    //       </span>
    //     </div>
    //   </div>
    // </div>
  // );
};

export default IndividualSound;
