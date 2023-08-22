import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Modal } from "react-bootstrap";
import {
  clearAllSound,
  removeSound,
  removeAudio,
  hideErrorMessage,
} from "../../Store/Slices/SoundPlayerSlice";

// import { playAll } from "../../Store/Slices/SoundPlayerSlice";

import {
  MixerButton,
  TimerButton,
  PauseButton,
  PlayButton,
  Spinner,
  CrossIcon,
  crossIcon,
  playIcon,
} from "../../Assets/svg";
import "./style.css";
import BASEURL from "../../Config/global";

import { Howl, Howler } from "howler";
import CustomButton from "../CustomButton";
import { getAccessToken } from "../../Util/authHeader";
import { useLocation } from "react-router";

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
  console.log(audio);

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

  const [isPlaying, setIsPlaying] = useState(true);
  const [overallVolume, setOverallVolume] = useState(0.5);
  const [showTimerModal, setShowTimerModal] = useState(false);

  const [loader, setLoader] = useState([]);

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
    setLastSource(BASEURL + lastElem?.audio);
    setSoundInfo(lastElem);
    // const lastSoundInfo = soundList[soundList.length - 1];
  }, [soundList]);

  useEffect(() => {
    setAudioState(audio);
  }, [audio]);

  // console.log(soundList)
  // console.log(lastSource);

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
        src: [lastSource],
        loop: true,
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

  // console.log(howlList);

  // function checkAndUpdateMediaSession(howl) {
  //   if (howl.info.narration) {
  //     // Create a new MediaSession API
  //     if ("mediaSession" in navigator) {
  //       navigator.mediaSession.metadata = new MediaMetadata({
  //         title: howl.info.title,
  //         artwork: [
  //           { src: howl.info.thumbnail, sizes: "512x512", type: "image/png" },
  //         ],
  //       });
  //     }
  //   }
  // }

  // useEffect(() => {
  //   // firstSound();
  //   alreadyPlaying();
  // }, [howlList]);

  // const firstSound = () => {
  //   if (howlList.length == 1) {
  //     howlList.forEach((howl) => {
  //       howl.play();
  //     });
  //     setIsPlaying(true);
  //   }
  // };

  // const alreadyPlaying = () => {
  //   if (isPlaying) {
  //     howlList.forEach((howl) => {
  //       const nowPlaying = howl.playing();
  //       if (!nowPlaying) {
  //         howl.play();
  //       }
  //     });
  //   }
  // };

  const handlePauseAll = () => {
    if (audioHowl && audioHowl.playing()) {
      audioHowl.pause();
    }

    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        if (howl.playing()) {
          howl.pause();
        }
      });
    }

    setIsPlaying(false);
  };

  const handlePlayAll = () => {
    if (audioHowl && !audioHowl.playing()) {
      audioHowl.play();
      setIsPlaying(true);
    }

    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        if (!howl.playing()) {
          howl.play();
        }
      });
    }
  };

  const handleChangeOverallVolume = (e) => {
    const volumeLevel = parseFloat(e.target.value);
    if (howlList.length > 0) {
      setOverallVolume(volumeLevel);
      Howler.volume(volumeLevel);
      // howlList.forEach((howl) => {
      //   howl.volume(volumeLevel);
      // });
    }
  };

  const handleIndividualVolume = (e, index) => {
    const volumeLevel = parseFloat(e.target.value);
    howlList[index].volume(volumeLevel);
  };

  const volumeControl = (value) => {
    if (value === "increase" && howlList.length > 0 && overallVolume <= 1) {
      setOverallVolume(overallVolume + 0.01);
      Howler.volume(overallVolume);
      howlList.forEach((howl) => {
        howl.volume(overallVolume);
      });
    }
    if (value === "decrease" && howlList.length > 0 && overallVolume >= 0) {
      setOverallVolume(overallVolume - 0.01);
      Howler.volume(overallVolume);
      howlList.forEach((howl) => {
        howl.volume(overallVolume);
      });
    }
  };

  const handleRemoveSound = (index) => {
    howlList[index].unload();

    const updatedHowlList = [...howlList];
    updatedHowlList.splice(index, 1);
    setHowlList(updatedHowlList);

    const updatedSoundList = [...soundList];
    updatedSoundList.splice(index, 1);
    setSoundList(updatedSoundList);

    dispatch(removeSound(index));

    if (howlList > 1) {
      setIsPlaying(false);
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
  console.log("audioState", audioState);

  const handleClearMix = () => {
    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        howl.unload();
      });
      setHowlList([]);
      dispatch(clearAllSound());
      setIsPlaying(false);
    }
    if (audioState.audio) {
      audioHowl.unload();
      setAudioHowl(null);
      setAudioState(null);
      dispatch(clearAllSound());
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

  const isPlayingRef = useRef(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

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
                <div className="playerVolume">
                  <div className="volumeControl">
                    <button
                      onClick={() => {
                        volumeControl("decrease");
                      }}
                    >
                      -
                    </button>
                    <p>Volume</p>
                    <button
                      onClick={() => {
                        volumeControl("increase");
                      }}
                    >
                      +
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={overallVolume}
                    onChange={handleChangeOverallVolume}
                  />
                </div>

                <div>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={
                      <div className="currentMixButton">
  <div className="currentMixIcons">
    {howlList.length > 0 && (
      <div className="currentImageWrapper">
        <img src={BASEURL + soundList[0].thumbnail} alt="Thumbnail" />
      </div>
    )}
    {audioState?.audio && (
      <div className="currentImageWrapper">
        <img src={BASEURL + audioState.thumbnail} alt="Thumbnail" />
      </div>
    )}
  </div>
  <div className="currentMixContent">
    <p className="currentMixTitle">Current Mix</p>
    <p className="currentMixText">
      {howlList.length + (audioState?.audio ? 1 : 0)}{" "}
      Item{howlList.length + (audioState?.audio ? 1 : 0) > 1 && "s"}
    </p>
  </div>
</div>

                    }
                    // title={<div>aa</div>}
                    drop="up"
                    variant="transparent"
                    className="mixerButton playerAction customDropdownButton"
                  >
                    <div className="mixer">
                      <div className="mixerHeader"></div>
                      <div className="mixerBody">
                        {soundList.map((sound, index) => (
                          <div className="individualAudio" key={index}>
                            <div className="mixerSoundDetail">
                              {loader[index] ? (
                                <img
                                  src={BASEURL + sound.thumbnail}
                                  alt=""
                                  className="mixerSoundThumbnail"
                                />
                              ) : (
                                <div className="spinner">
                                  <Spinner />
                                </div>
                              )}
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                onChange={(e) => {
                                  handleIndividualVolume(e, index);
                                }}
                              />
                              <button
                                className="notButton audioRemoveButton"
                                onClick={() => {
                                  handleRemoveSound(index);
                                }}
                              >
                                <CrossIcon />
                                {/* <img src={crossIcon} alt="" /> */}
                              </button>
                            </div>
                            <p className="mixerAudioTitle">{sound.title}</p>
                          </div>
                        ))}
                        {audioState?.audio && (
                          <div className="individualAudio">
                            <div className="mixerSoundDetail">
                              s{" "}
                              <img
                                src={BASEURL + audioState.thumbnail}
                                alt=""
                                className="mixerSoundThumbnail"
                              />
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                // onChange={(e) => {
                                //   handleIndividualVolume(e, index);
                                // }}
                              />
                              <button
                                className="notButton audioRemoveButton"
                                onClick={handleRemoveAudio}
                              >
                                <CrossIcon />
                                {/* <img src={crossIcon} alt="" /> */}
                              </button>
                            </div>
                            <p className="mixerAudioTitle">
                              {audioState.title}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="mixerFooter">
                        <button
                          className="timerButton notButton"
                          onClick={handleShowTimer}
                        >
                          <TimerButton className="playerActionIcon" />
                          <p className="playerActionText">Timer</p>
                        </button>
                        <CustomButton
                          variant="primaryButton fw-normal"
                          text="Clear Mix"
                          onClick={handleClearMix}
                        />
                      </div>
                    </div>
                  </DropdownButton>
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
              <CrossIcon />
              {/* <img src={crossIcon} alt="" /> */}
            </button>
          </div>
          <div className="customModalContent text-center">
            <h2 className="modalHeading pageTitle mb-4">Select Time</h2>
            <div className="timerOptions">
              <CustomButton
                variant="secondaryButton fw-normal"
                text="None"
                onClick={() => {
                  runTimer(null);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-normal"
                text="1 Minute"
                onClick={() => {
                  runTimer(1);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-normal"
                text="15 Minutes"
                onClick={() => {
                  runTimer(15);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-normal"
                text="30 Minutes"
                onClick={() => {
                  runTimer(30);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-normal"
                text="1 Hour"
                onClick={() => {
                  runTimer(60);
                }}
              />
              <CustomButton
                variant="secondaryButton fw-normal"
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
