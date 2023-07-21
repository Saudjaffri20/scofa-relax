import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getAccessToken } from "../../Util/authHeader";
import MainMixer from "./MainMixer";

const MultiAudioPlayer2 = () => {
  const dispatch = useDispatch();

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

  const sounds = useSelector((state) => state.soundPlayer2.sounds);

  const [soundList, setSoundList] = useState([]);

  // console.log(soundList);

  // Setting the AUDIO SOURCE key in "sourceList" array state
  useEffect(() => {
    const duplicateArray = [];
    sounds.forEach((sound) => {
      duplicateArray.push(sound);
    });
    setSoundList(duplicateArray);
  }, [sounds]);



  return <>{soundList.length > 0 && <MainMixer soundList={soundList} setSoundList={setSoundList} />}</>;
};

export default MultiAudioPlayer2;
