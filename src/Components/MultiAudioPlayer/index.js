import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MixerButton,
  PauseButton,
  PlayButton,
  Spinner,
} from "../../Assets/svg";
import "./style.css";
import BASEURL from "../../Config/global";

import { Howl, Howler } from "howler";

const MultiAudioPlayer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const menuClass = windowWidth < 1024 ? "mobileMenu" : "desktopMenu";
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const audioSource = useSelector((state) => state.audio.audioSource);
  const audioTitle = useSelector((state) => state.audio.audioTitle);
  const audioThumbnail = useSelector((state) => state.audio.audioThumbnail);

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [soundLoading, setsoundLoading] = useState(false);

  const [volume, setVolume] = useState(0.5);
  // if (sound) {
  //   console.log(soundLoading);
  //   console.log("State =>  ", sound._state);
  // }

  useEffect(() => {
    if (sound) {
      sound.stop();
      sound.unload();
    }
    const audio = new Howl({
      src: [audioSource],
      loop: true,
      autoplay: false,
      preload: true,
      onload: () => {
        audio.play();
        setIsPlaying(true);
      },
    });

    setSound(audio);
  }, [audioSource]);

  useEffect(() => {
    setThumbnail(audioThumbnail);
    setTitle(audioTitle);
  }, [audioSource]);

  useEffect(() => {
    if (sound) {
      if (sound._src[0]) {
        setsoundLoading(true);
        sound.once("load", () => {
          setsoundLoading(false);
        });
        sound.load();
      }
    }
  }, [sound]);

  const handlePlay = () => {
    if (sound._src[0]) {
      sound.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const volumeLevel = parseFloat(e.target.value);
    setVolume(volumeLevel);
    if(sound) {
      sound.volume(volumeLevel);
      console.log(sound);
    }
  };

  return (
    <>
      <div className={`audioPlayerWrapper ${menuClass}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="audioPlayerControls">
                {soundLoading ? (
                  <div className="playerAction spinner">
                    <Spinner />
                  </div>
                ) : isPlaying ? (
                  <button
                    className="playButton playerAction"
                    onClick={handlePause}
                  >
                    <PauseButton />
                    <p>Pause</p>
                  </button>
                ) : (
                  <button
                    className="playButton playerAction"
                    onClick={handlePlay}
                  >
                    <PlayButton />
                    <p>Play</p>
                  </button>
                )}

                <div className="playerVolume">
                  <div className="soundTitle">
                    <p className="lightColor smallText m-0">{title}</p>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
                {/* <button className="mixerButton playerAction">
                  <MixerButton />
                  <p>Mixer</p>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MultiAudioPlayer;
