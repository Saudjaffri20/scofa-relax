import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IndividualSound from "./IndividualSound";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Modal } from "react-bootstrap";
import {
  clearAllSound,
  removeSound,
  removeAudio,
} from "../../Store/Slices/SoundPlayerSlice";

// import { playAll } from "../../Store/Slices/SoundPlayerSlice";

import {
  // MixerButton,
  // TimerButton,
  PauseButton,
  PlayButton,
  // Spinner,
  CrossIcon,
  crossIcon,
  // playIcon,
  playButton,
  pauseButton,
  saveMixButton,
  timerButton,

  // mixerIcon,
  // timerIcon,
  // saveMixIcon,
} from "../../Assets/svg";
import "./style.css";
import BASEURL from "../../Config/global";

import { Howl, Howler } from "howler";
import CustomButton from "../CustomButton";
import { getAccessToken } from "../../Util/authHeader";
import { useLocation } from "react-router";
import {
  pauseMixer,
  playMixer,
  resetMixer,
} from "../../Store/Slices/MixerSlice";
import VolumeBar from "../VolumeBar";
import VolumeSlider from "./../VolumeSlider";

const MultiAudioPlayerrr = () => {
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

  const location = useLocation();

  const sounds = useSelector((state) => state.soundPlayer.sounds);
  const audio = useSelector((state) => state.soundPlayer.audio);
  const isPlaying = useSelector((state) => state.mixer.play);

  const dispatch = useDispatch();

  const [soundList, setSoundList] = useState([]);
  const [audioState, setAudioState] = useState({});
  const [sourceList, setSourceList] = useState([]);
  const [lastSource, setLastSource] = useState(null);
  const [soundInfo, setSoundInfo] = useState(false);
  const [audioInfo, setAudioInfo] = useState(false);
  const [howlList, setHowlList] = useState([]);
  const [audioHowl, setAudioHowl] = useState(null);
  const [howlCount, setHowlCount] = useState(0);
  const [mixerTimer, setMixerTimer] = useState(null);

  const [overallVolume, setOverallVolume] = useState(0.5);
  const [showTimerModal, setShowTimerModal] = useState(false);

  const [loader, setLoader] = useState([]);
  const [openTray, setOpenTray] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      handleClearMix();
    }
  }, [location]);

  useEffect(() => {
    const duplicateArray = [];
    sounds.forEach((sound) => {
      duplicateArray.push(sound);
    });
    setSoundList(duplicateArray);
  }, [sounds]);

  useEffect(() => {
    // const duplicateArray = [];
    // soundList.forEach((sound) => {
    //   duplicateArray.push(sound.source);
    // });
    // setSourceList(duplicateArray);
    const lastElem = soundList[soundList.length - 1];
    setLastSource(lastElem);
    setSoundInfo(lastElem);
    // const lastSoundInfo = soundList[soundList.length - 1];
  }, [soundList]);

  useEffect(() => {
    setAudioState(audio);
  }, [audio]);

  // useEffect(() => {
  //   const lastElem = sourceList[sourceList.length - 1];
  //   setLastSource(lastElem);

  //   const lastSoundInfo = soundList[soundList.length - 1];
  //   setSoundInfo(lastSoundInfo);
  // }, [sourceList]);

  // useEffect(() => {
  //   // console.log(soundList[soundList.length - 1].naration);
  //   if (howlList.length) {
  //     howlList.filter((eachHowl, index) => {
  //       if (eachHowl.info.naration) {
  //         handleRemoveSound(index);
  //       }
  //     });
  //   }
  // }, [soundList]);

  useEffect(() => {
    if (soundList.length > 0 && soundList.length > howlCount) {
      const howl = new Howl({
        src: [BASEURL + lastSource.audio],
        loop: true,
        autoplay: isPlaying,
        // webAudio: true, // Use Web Audio API if supported
        html5: true, // Use HTML5 audio if supported
        autoUnlock: true,
        preload: true,
        volume: 0.5,
        autoSuspend: false,
        onload: function () {
          this.loaded = true;
          setLoader((prevLoader) => [...prevLoader, true]);
        },
      });
      const patch = new Howl({
        src: [BASEURL + lastSource.patch],
        loop: true,
        autoplay: isPlaying,
        // webAudio: true, // Use Web Audio API if supported
        html5: true, // Use HTML5 audio if supported
        autoUnlock: true,
        preload: true,
        mute: true,
        volume: 0,
        autoSuspend: false,
      });
      howl.loaded = false;
      howl.info = soundInfo;
      const duplicateHowlList = [...howlList];
      duplicateHowlList.push(howl);
      setHowlList(duplicateHowlList);
      // checkAndUpdateMediaSession(howl);
    }

    setHowlCount(howlList.length);
  }, [lastSource]);

  useEffect(() => {
    if (audioHowl) {
      // If an existing audioHowl instance exists, unload it
      audioHowl.unload();
    }
    const howl = new Howl({
      src: [BASEURL + audioState?.audio],
      loop: false,
      autoplay: isPlaying,
      webAudio: true, // Use Web Audio API if supported
      html5: true, // Use HTML5 audio if supported
      autoUnlock: true,
      preload: true,
      volume: 0.5,
      autoSuspend: false,
      onload: function () {
        this.loaded = true;
        setLoader((prevLoader) => [...prevLoader, true]);
      },
    });
    // howl.loaded = false;
    // howl.info = audioInfo;

    // const duplicateHowlList = [...howlList];
    // duplicateHowlList.push(howl);
    setAudioHowl(howl);
  }, [audioState]);

  // useEffect(() => {
  //   if (audioHowl) {
  //     if (isPlaying) {
  //       audioHowl.pause();
  //     } else {
  //       audioHowl.play();
  //     }
  //   }

  //   if (howlList.length > 0) {
  //     howlList.forEach((howl) => {
  //       if (isPlaying) {
  //         howl.pause();
  //       } else {
  //         howl.play();
  //       }
  //     });
  //   }
  // }, [isPlaying]);

  const handlePauseAll = () => {
    if (audioHowl) {
      audioHowl.pause();
    }
    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        howl.pause();
      });
    }
    dispatch(pauseMixer());
  };

  const handlePlayAll = () => {
    if (audioHowl) {
      audioHowl.play();
    }
    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        howl.play();
      });
    }
    dispatch(playMixer());
  };

  const handleIndividualVolume = (e, index) => {
    const volumeLevel = parseFloat(e.target.value);
    howlList[index].volume(volumeLevel);
  };

  const handleSoundVolume = (method, index) => {
    if (method === "Increase") {
      const newVolume = Math.min(howlList[index]?.volume() + 0.1, 1.0);
      howlList[index].volume(newVolume);
      console.log("increase", newVolume.toFixed(1));
    } else if (method === "Decrease") {
      const newVolume = Math.max(howlList[index]?.volume() - 0.1, 0);
      howlList[index].volume(newVolume);
      console.log("decrease", newVolume.toFixed(1));
    }
  };

  const handleRemoveSound = (index) => {
    console.log(index);
    howlList[index].unload();

    const updatedHowlList = [...howlList];
    updatedHowlList.splice(index, 1);
    setHowlList(updatedHowlList);

    const updatedSoundList = [...soundList];
    updatedSoundList.splice(index, 1);
    setSoundList(updatedSoundList);

    dispatch(removeSound(index));

    if (howlList > 1) {
      // setIsPlaying(false);
    }
  };

  const handleRemoveAudio = (index) => {
    // howlList[index].unload();

    // const updatedHowlList = [...howlList];
    // updatedHowlList.splice(index, 1);
    // setHowlList(updatedHowlList);

    // const updatedSoundList = [...soundList];
    // updatedSoundList.splice(index, 1);
    // setSoundList(updatedSoundList);
    if (audioState.audio) {
      audioHowl.unload();
      setAudioHowl(null);
      setAudioState(null);
      dispatch(removeAudio());
    }
    // dispatch(removeSound(index));

    // if (howlList > 1) {
    //   setIsPlaying(false);
    // }
  };

  const handleClearMix = () => {
    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        howl.unload();
      });
      setHowlList([]);
      dispatch(clearAllSound());
      dispatch(resetMixer());
      // setIsPlaying(false);
    }
    if (audioState.audio) {
      audioHowl.unload();
      setAudioHowl(null);
      setAudioState(null);
      dispatch(clearAllSound());
      dispatch(resetMixer());
    }
  };

  const runTimer = (minutes) => {
    console.log(minutes);
    if (minutes === null) {
      clearTimeout(mixerTimer);
      return;
    } else {
      const milliSeconds = minutes * 60 * 1000;
      clearTimeout(mixerTimer);
      const timeOut = setTimeout(() => {
        handleClearMix();
      }, milliSeconds);
      setMixerTimer(timeOut);
    }
    handleCloseTimer();
  };

  const handleCloseTimer = () => setShowTimerModal(false);
  const handleShowTimer = () => setShowTimerModal(true);

  return (
    <>
      {(howlList.length > 0 || audioState?.audio) && (
        <div className={`audioPlayerWrapper ${menuClass}`}>
          <div className="row">
            <div className="col-12">
              <div className="audioPlayerControls">
                {isPlaying ? (
                  <button
                    className="playButton playerAction"
                    onClick={handlePauseAll}
                  >
                    {/* <PauseButton className="playerActionIcon" /> */}
                    {/* <p className="playerActionText">Pause</p> */}

                    <img
                      src={pauseButton}
                      alt="Pause"
                      className="playerActionIcon"
                    />
                  </button>
                ) : (
                  <button
                    className="playButton playerAction"
                    onClick={handlePlayAll}
                  >
                    {/* <PlayButton className="playerActionIcon" /> */}
                    {/* <p className="playerActionText">Play</p> */}
                    <img
                      src={playButton}
                      alt="Play"
                      className="playerActionIcon"
                    />
                  </button>
                )}
                <div className="mixerCenter d-md-block d-none flex-grow-1">
                  <p className="overallVolumeText">Volume</p>
                  <VolumeSlider />
                </div>
                <div className="mixerRight">
                  <button className="playerAction">
                    <img
                      src={timerButton}
                      alt="Timer"
                      className="playerActionIcon"
                      onClick={handleShowTimer}
                    />

                    {/* <p className="playerActionText">Add Timer</p> */}
                    {/* <MixerButton className="playerActionIcon" /> */}
                  </button>
                  <div
                    className="currentMixButton"
                    onClick={() => {
                      setOpenTray(!openTray);
                    }}
                  >
                    <div className="currentMixIcons">
                      {howlList.length > 0 && (
                        <div className="currentImageWrapper">
                          <img
                            src={BASEURL + soundList[0].thumbnail}
                            alt="Thumbnail"
                          />
                        </div>
                      )}
                      {audioState?.audio && (
                        <div className="currentImageWrapper">
                          <img
                            src={BASEURL + audioState.thumbnail}
                            alt="Thumbnail"
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={`currentMixContent ${
                        (!audioState?.audio && soundList.length) ||
                        (audioState?.audio && soundList.length < 1)
                          ? "ms-1"
                          : ""
                      }`}
                    >
                      <p className="currentMixTitle">Current Mix</p>
                      <p className="currentMixText">
                        {howlList.length + (audioState?.audio ? 1 : 0)} Item
                        {howlList.length + (audioState?.audio ? 1 : 0) > 1 &&
                          "s"}
                      </p>
                    </div>
                  </div>
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
                        {soundList.map((sound, index) => (
                          <>
                            <IndividualSound
                              sound={sound}
                              index={index}
                              handleRemoveSound={handleRemoveSound}
                              handleSoundVolume={handleSoundVolume}
                              soundList={soundList}
                              howlList={howlList}
                            />
                          </>
                        ))}
                      </div>
                    </>
                  )}
                  {audioState?.audio && (
                    <>
                      <div className="audioHeader">
                        <p>{audioState.type}</p>
                      </div>
                      <div className="otherAudioWrapper">
                        <div className="individualAudio">
                          <div className="mixerSoundDetail">
                            <div className="mixerSoundThumbnailWrapper flex-shrink-0">
                              <span
                                className="soundControlButton audioRemoveButton"
                                onClick={handleRemoveAudio}
                              >
                                <img src={crossIcon} alt="Cross Icon" />
                              </span>

                              <div className="mixerAudioThumbnail">
                                <img
                                  src={BASEURL + audioState.thumbnail}
                                  alt="Thumbnail"
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <p className="mixerAudioTitle">
                                {audioState.title}
                              </p>
                            </div>
                            <div className="d-flex align-center gap-2 flex-shrink-0">
                              <span
                                className="soundControlButton"
                                // onClick={() => handleVolume("Decrease")}
                              >
                                -
                              </span>
                              <span
                                className="soundControlButton"
                                // onClick={() => handleVolume("Increase")}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </div>
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
      )}
      <Modal
        show={showTimerModal}
        centered
        onHide={handleCloseTimer}
        className="soundModal"
        backdrop="static"
      >
        <Modal.Body>
          <div className="text-end">
            <button
              className="closeButton notButton ms-auto"
              onClick={handleCloseTimer}
            >
              {/* <CrossIcon /> */}
              <img src={crossIcon} alt="" />
            </button>
          </div>
          <div className="customModalContent text-center">
            <h2 className="modalHeading pageTitle mb-4">Select Time</h2>
            <div className="timerOptions">
              <CustomButton
                variant="secondaryButton fw-light"
                text="None"
                onClick={() => {
                  runTimer(null);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-light"
                text="1 Minute"
                onClick={() => {
                  runTimer(1);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-light"
                text="15 Minutes"
                onClick={() => {
                  runTimer(15);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-light"
                text="30 Minutes"
                onClick={() => {
                  runTimer(30);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-light"
                text="1 Hour"
                onClick={() => {
                  runTimer(60);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-light"
                text="2 Hours"
                onClick={() => {
                  runTimer(120);
                }}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MultiAudioPlayerrr;
