import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { Howler } from "howler";

// import { removeSoundAction } from "../../Store/Slices/SoundPlayerSlice2";

import { removeSound } from "../../Store/Slices/SoundPlayerSlice";
import { removeAudio } from "../../Store/Slices/AudioSlice";

import IndividualSound from "./IndividualSound";
import IndividualAudio from "./IndividualAudio";

import {
  PauseButton,
  PlayButton,
  // MixerButton,
  crossIcon,
  mixerIcon,
  timerIcon,
  save,
  saveMixIcon,
} from "../../Assets/svg";

import { logo } from "../../Assets/images";

import "./style.css";
import BASEURL from "../../Config/global";
import {
  pauseMixer,
  playMixer,
  resetMixerVolume,
} from "../../Store/Slices/MixerSlice";
import VolumeBar from "../VolumeBar";

const MainMixer = ({
  menuClass,
  soundList,
  setSoundList,
  otherAudio,
  setOtherAudio,
}) => {
  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.mixer.play);

  // const [isPlaying, setIsPlaying] = useState(true);
  const [openTray, setOpenTray] = useState(false);
  const [clearMixClicked, setClearMixClicked] = useState(false);
  const [overAllVolume, setOverAllVolume] = useState(0.6);

  useEffect(() => {
    dispatch(playMixer());

    return () => {
      dispatch(pauseMixer());
      dispatch(resetMixerVolume());
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (menuClass == "mobileMenu") {
      
        if (document.visibilityState === "hidden") {
          handlePauseAll();
        } else {
          if (isPlaying) {
            handlePlayAll();
          }
        }
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // useEffect(() => {
  //   // ...

  //   // Define media metadata for the Media Session API
  //   if ("mediaSession" in navigator) {
  //     navigator.mediaSession.metadata = new window.MediaMetadata({
  //       title: "Relax Scofa",
  //       artwork: [
  //         {
  //           src: `${BASEURL + "/" + logo}`,
  //           sizes: "96x96",
  //           type: "image/png",
  //         },
  //       ],
  //     });

  //     navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

  //     navigator.mediaSession.setActionHandler("play", handlePlayAll);
  //     navigator.mediaSession.setActionHandler("pause", handlePauseAll);
  //   }

  //   return () => {
  //     // Clean up
  //     dispatch(pauseMixer());
  //     dispatch(resetMixerVolume());
  //     if ("mediaSession" in navigator) {
  //       navigator.mediaSession.metadata = null;
  //     }
  //   };
  // }, []);

  const handlePlayAll = () => {
    dispatch(playMixer());
  };

  const handlePauseAll = () => {
    dispatch(pauseMixer());
  };

  const handleRemoveSound = (index) => {
    const updatedSoundList = [...soundList];
    updatedSoundList.splice(index, 1);
    setSoundList(updatedSoundList);
    dispatch(removeSound(index));
  };

  const handleRemoveAudio = () => {
    setOtherAudio(null);
    dispatch(removeAudio());
  };

  const handleClearMix = () => {
    setClearMixClicked(true);
  };

  // const increaseVolume = () => {
  //   const newVolume = Math.min(overAllVolume + 0.2, 1);
  //   setOverAllVolume(newVolume);
  //   Howler.volume(newVolume); // Update the global volume
  // };

  // const decreaseVolume = () => {
  //   const newVolume = Math.max(overAllVolume - 0.2, 0);
  //   setOverAllVolume(newVolume);
  //   Howler.volume(newVolume); // Update the global volume
  // };

  return (
    <>
      <div className={`audioPlayerWrapper ${menuClass}`}>
        <div className="row">
          <div className="col-12">
            <div className="audioPlayerControls">
              <div className="mixerLeft">
                {isPlaying ? (
                  <button
                    className="playButton playerAction"
                    onClick={handlePauseAll}
                  >
                    <PauseButton className="playerActionIcon" />
                    {/* <p className="playerActionText">Pause</p> */}
                  </button>
                ) : (
                  <button
                    className="playButton playerAction"
                    onClick={handlePlayAll}
                  >
                    <PlayButton className="playerActionIcon" />
                    {/* <p className="playerActionText">Play</p> */}
                  </button>
                )}

                <button
                  className="playerAction"
                  // onClick={() => {
                  //   setOpenTray(!openTray);
                  // }}
                >
                  <img
                    src={saveMixIcon}
                    alt="Save Icon"
                    className="playerActionIcon"
                  />
                  {/* <p className="playerActionText">Save Mix</p> */}
                  {/* <MixerButton className="playerActionIcon" /> */}
                </button>
              </div>
              <div className="mixerCenter d-md-block d-none">
                <p className="overallVolumeText">Volume</p>
                {/* <div className="overallVolumeControl">
                  <button
                    className="playerAction overallVolumeAction"
                    onClick={decreaseVolume}
                  >
                    -
                  </button>
                  <div className="volumeBars">
                    <div
                      className={`volumeBar ${
                        overAllVolume >= 0.2 ? "active" : ""
                      }`}
                    ></div>
                    <div
                      className={`volumeBar ${
                        overAllVolume >= 0.4 ? "active" : ""
                      }`}
                    ></div>
                    <div
                      className={`volumeBar ${
                        overAllVolume >= 0.6 ? "active" : ""
                      }`}
                    ></div>
                    <div
                      className={`volumeBar ${
                        overAllVolume >= 0.8 ? "active" : ""
                      }`}
                    ></div>
                    <div
                      className={`volumeBar ${
                        overAllVolume >= 1 ? "active" : ""
                      }`}
                    ></div>
                  </div>
                  <button
                    className="playerAction overallVolumeAction"
                    onClick={increaseVolume}
                  >
                    +
                  </button>
                </div> */}
                <VolumeBar />
              </div>
              <div className="mixerRight">
                <button
                  className="playerAction"
                  // onClick={() => {
                  //   setOpenTray(!openTray);
                  // }}
                >
                  <img
                    src={timerIcon}
                    alt="Timer Icon"
                    className="playerActionIcon"
                  />
                  {/* <p className="playerActionText">Add Timer</p> */}
                  {/* <MixerButton className="playerActionIcon" /> */}
                </button>
                {/* <button
                  className="playerAction"
                  onClick={() => {
                    setOpenTray(!openTray);
                  }}
                >
                  <img
                    src={mixerIcon}
                    alt="Mixer Icon"
                    className="playerActionIcon"
                  />
                  <p className="playerActionText">Mixer</p>
                  <MixerButton className="playerActionIcon" />
                </button> */}
                {(soundList.length > 0 || otherAudio) && (
                  <div
                    className="currentMixButton"
                    onClick={() => {
                      setOpenTray(!openTray);
                    }}
                  >
                    {otherAudio ? (
                      <div className="currentMixIcons">
                        <div className="currentImageWrapper">
                          <img
                            src={BASEURL + otherAudio?.thumbnail}
                            alt="Thumbnail"
                          />
                        </div>
                        {soundList.length > 0 && (
                          <div className="currentImageWrapper">
                            <img
                              src={BASEURL + soundList[0]?.thumbnail}
                              alt="Thumbnail"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="currentMixIcons">
                        {soundList.slice(0, 2).map((sound, index) => (
                          <div className="currentImageWrapper" key={index}>
                            <img
                              src={BASEURL + sound?.thumbnail}
                              alt="Thumbnail"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {soundList.length < 2 ? (
                      <>
                        <div className="currentMixContent ms-1">
                          <p className="currentMixTitle">Current Mix</p>
                          <p className="currentMixText">1 Item</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="currentMixContent">
                          <p className="currentMixTitle">Current Mix</p>
                          <p className="currentMixText">
                            {soundList.length} Items
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className={`mixerTray ${openTray ? "open" : "close"}`}>
                <div className="mixerHeader">
                  <h3>Mixer</h3>
                  <button
                    className="notButton"
                    onClick={() => {
                      setOpenTray(false);
                    }}
                  >
                    <img src={crossIcon} alt="Close Button" />
                  </button>
                </div>
                {soundList.length > 0 && (
                  <>
                    <div className="audioHeader">
                      <p>Sounds</p>
                    </div>
                    <div className="individualSoundsWrapper">
                      {soundList.map((item, index) => (
                        <IndividualSound
                          key={index}
                          sound={item}
                          isPlaying={isPlaying}
                          individualRemoveSound={() => {
                            handleRemoveSound(index);
                          }}
                          clearMixClicked={clearMixClicked}
                          setSoundList={setSoundList}
                        />
                      ))}
                    </div>
                  </>
                )}
                {otherAudio && (
                  <>
                    <div className="audioHeader">
                      <p>{otherAudio.type}</p>
                    </div>
                    <div className="otherAudioWrapper">
                      <IndividualAudio
                        sound={otherAudio}
                        isPlaying={isPlaying}
                        individualRemoveAudio={() => {
                          handleRemoveAudio();
                        }}
                        clearMixClicked={clearMixClicked}
                        setOtherAudio={setOtherAudio}
                      />
                    </div>
                  </>
                )}

                <div className="clearMixWrapper">
                  <button className="clearMixButton" onClick={handleClearMix}>
                    Clear Mix
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMixer;
