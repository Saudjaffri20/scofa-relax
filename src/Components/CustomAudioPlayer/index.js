import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainMixer from "./MainMixer";

import "./style.css";

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

  const sounds = useSelector((state) => state.soundPlayer.sounds);
  const audio = useSelector((state) => state.audio.audio);

  // console.log("audioooooo", audio)

  const [soundList, setSoundList] = useState([]);
  const [otherAudio, setOtherAudio] = useState(null);

  useEffect(() => {
    const duplicateArray = [];
    if (sounds.length > 0) {
      sounds.forEach((sound) => {
        duplicateArray.push(sound);
      });
      setSoundList(duplicateArray);
    }
  }, [sounds]);

  useEffect(() => {
    setOtherAudio(audio);
  }, [audio]);

  return (
    <>
      {(soundList.length > 0 || otherAudio) && (
        <>
          <MainMixer
            menuClass={menuClass}
            soundList={soundList}
            setSoundList={setSoundList}
            otherAudio={otherAudio}
            setOtherAudio={setOtherAudio}
          />
        </>
      )}
      {/* <Modal
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
      </Modal> */}
    </>
  );
};
export default MultiAudioPlayerrr;
