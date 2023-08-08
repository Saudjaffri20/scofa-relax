import React, { useEffect, useRef } from "react";
import BASEURL from "../../Config/global";
import { Howl } from "howler";

const IndividualAudio = ({ sound, isPlaying, individualRemoveAudio }) => {
  const howlInstanceRef = useRef(null);

  useEffect(() => {
    howlInstanceRef.current = new Howl({
      src: [BASEURL + sound.audio],
      loop: true,
      autoplay: isPlaying,
      html5: true,
      autoUnlock: true,
      preload: true,
      volume: 1,
      autoSuspend: false,
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

  const handleRemove = () => {
    if (howlInstanceRef.current) {
      howlInstanceRef.current.unload();
    }
    individualRemoveAudio();
  };

  return (
    <div className="individualAudio">
      <div className="mixerSoundDetail">
        <div className="mixerSoundThumbnail">
          <img src={BASEURL + sound.thumbnail} alt="Thumbnail" />
        </div>
        <div className="flex-grow-1">
          <p className="mixerAudioTitle">{sound.title}</p>
        </div>
        <button className="notButton audioRemoveButton" onClick={handleRemove}>
          Close
        </button>
      </div>
    </div>
  );
};

export default IndividualAudio;
