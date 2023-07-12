import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Howl, Howler } from "howler";
import { getAccessToken } from "../../Util/authHeader";

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

  const sounds = useSelector((state) => state.soundPlayer2);
  console.log("sounds   =>", sounds)

  return <></>;
};

export default MultiAudioPlayer2;
