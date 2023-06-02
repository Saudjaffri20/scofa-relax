import React, { useEffect, useState } from "react";

import { Menubar } from "./MenuBar";
import { Header } from "./Header";

import "./style.css";
import MainAudioPlayer from "../../Components/MainAudioPlayer";

const MainLayout = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuClass = windowWidth < 1024 ? "mobileMenu" : "desktopMenu";
  return (
    <>
      <Menubar menuClass={menuClass} />
      <div className="secondaryBg">
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-12">
              <div
                className={`mainBody ${
                  menuClass === "mobileMenu" ? "mobileBody" : "desktopBody"
                }`}
              >
                <Header />
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MainAudioPlayer menuClass={menuClass} /> */}
    </>
  );
};

export default MainLayout;
