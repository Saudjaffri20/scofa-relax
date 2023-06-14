import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Modal } from "react-bootstrap";
import {
  clearAllSound,
  removeSound,
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
  const soundErrorMessage = useSelector(
    (state) => state.soundPlayer.errorMessage
  );
  const dispatch = useDispatch();

  const [soundList, setSoundList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [lastSource, setLastSource] = useState(null);
  const [soundInfo, setSoundInfo] = useState(false);
  const [howlList, setHowlList] = useState([]);
  const [howlCount, setHowlCount] = useState(0);
  const [mixerTimer, setMixerTimer] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [overallVolume, setOverallVolume] = useState(0.5);
  const [isMixerDisabled, setIsMixerDisabled] = useState(true);
  const [showTimerModal, setShowTimerModal] = useState(false);

  const [loadedSound, setLoadedSound] = useState([]);

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
    const duplicateArray = [];
    soundList.forEach((sound) => {
      duplicateArray.push(sound.audioSource);
    });
    setSourceList(duplicateArray);
  }, [soundList]);

  useEffect(() => {
    const lastElem = sourceList[sourceList.length - 1];
    setLastSource(lastElem);

    const lastSoundInfo = soundList[soundList.length - 1];
    setSoundInfo(lastSoundInfo);
  }, [sourceList]);

  useEffect(() => {
    // console.log(soundList[soundList.length - 1].naration);
    if (howlList.length) {
      howlList.filter((eachHowl, index) => {
        if(eachHowl.info.naration) {
          handleRemoveSound(index)
        }
      })
    }
  }, [soundList]);

  console.log("soundList => ", soundList);
  console.log("howlList => ", howlList);

  useEffect(() => {
    if (sourceList.length > 0 && soundList.length > howlCount) {
      setLoadedSound([...loadedSound, false]);

      const howl = new Howl({
        src: [lastSource],
        loop: true,
        autoplay: false,
        html5: true,
        autoUnlock: true,
        preload: true,
        volume: 0.5,
        // onload: () => {
        //   setLoadedSound((previousArray) => {
        //     const newArray = [...previousArray];
        //     newArray[newArray.length - 1] = true;
        //     return newArray;
        //   });
        // },
      });


      howl.info = soundInfo;
      const duplicateHowlList = [...howlList];
      duplicateHowlList.push(howl);
      setHowlList(duplicateHowlList);
    }

    setHowlCount(howlList.length);
  }, [lastSource]);

  useEffect(() => {
    // firstSound();
    alreadyPlaying();
  }, [howlList]);

  useEffect(() => {
    if (howlList.length > 0) {
      setIsMixerDisabled(false);
    } else {
      setIsMixerDisabled(true);
    }
  }, [howlList]);

  const firstSound = () => {
    if (howlList.length == 1) {
      howlList.forEach((howl) => {
        howl.play();
        setIsPlaying(true);
      });
    }
  };

  const alreadyPlaying = () => {
    if (isPlaying) {
      howlList.forEach((howl) => {
        const nowPlaying = howl.playing();
        if (!nowPlaying) {
          howl.play();
        }
      });
    }
  };

  const handlePauseAll = () => {
    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        howl.pausedPosition = howl.seek();
        howl.pause();
      });
      setIsPlaying(false);
    }
  };

  const handlePlayAll = () => {
    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        howl.seek(howl.pausedPosition);
        howl.play();
      });
      setIsPlaying(true);
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
      console.log(overallVolume);
    }
    if (value === "decrease" && howlList.length > 0 && overallVolume >= 0) {
      setOverallVolume(overallVolume - 0.01);
      Howler.volume(overallVolume);
      howlList.forEach((howl) => {
        howl.volume(overallVolume);
      });
      console.log(overallVolume);
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

    loadedSound.splice(index, 1);
  };

  const handleClearMix = () => {
    if (howlList.length > 0) {
      howlList.forEach((howl) => {
        howl.unload();
      });
      setHowlList([]);
      dispatch(clearAllSound());
      setIsPlaying(false);
      setIsMixerDisabled(true);
      setLoadedSound([]);
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
      <div className={`audioPlayerWrapper ${menuClass}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="audioPlayerControls">
                {isPlaying ? (
                  <button
                    className="playButton playerAction"
                    onClick={handlePauseAll}
                  >
                    <PauseButton className="playerActionIcon" />
                    <p className="playerActionText">Pause</p>
                  </button>
                ) : (
                  <button
                    className="playButton playerAction"
                    onClick={handlePlayAll}
                  >
                    <PlayButton className="playerActionIcon" />
                    <p className="playerActionText">Play</p>
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
                <DropdownButton
                  id="dropdown-basic-button"
                  disabled={isMixerDisabled}
                  title={
                    <div className="">
                      <MixerButton className="playerActionIcon" />
                      <p className="playerActionText">Sound Mixer</p>
                    </div>
                  }
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
                            {loadedSound[index] ? (
                              <img
                                src={sound.audioThumbnail}
                                alt=""
                                className="mixerSoundThumbnail"
                              />
                            ) : (
                              <div className="spinner">
                                <Spinner />
                              </div>
                            )}
                            {/* <img
                              src={sound.audioThumbnail}
                              alt=""
                              className="mixerSoundThumbnail"
                            /> */}
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
                          <p className="mixerAudioTitle">{sound.audioTitle}</p>
                        </div>
                      ))}
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
