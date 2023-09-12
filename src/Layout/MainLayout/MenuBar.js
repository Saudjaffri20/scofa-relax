import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { logo } from "../../Assets/images";

import { Howl } from "howler";

import {
  MenuHome,
  MenuSound,
  MenuMeditation,
  MenuMoon,
  MenuArticle,
  ArticlesIcon,
  StoreIcon,
  FindDoctorsIcon,
  CheckSymptomsIcon,
} from "../../Assets/svg";

import "./style.css";

export const Menubar = (props) => {
  const location = useLocation();

  useEffect(() => {
    const sound = new Howl({
      src: [require(`./../../../src/Assets/audio/silent.mp3`)], // Update the path accordingly
      autoplay: true,
      html5: true,
      autoUnlock: true,
      preload: true,
      volume: 0,
      mute: true,
      autoSuspend: false,
    });

    // Play the sound
    sound.play();

    // Clean up
    return () => {
      sound.unload();
    };
  }, []);

  const menu = [
    {
      text: "Sounds",
      link: "/",
      path: "/",
      icon: MenuSound,
    },
  ];

  const externalMenu = [
    {
      text: "Sleep Articles",
      link: "https://scofa.com/articles/",
      icon: ArticlesIcon,
    },
    {
      text: "Sleep Store",
      link: "https://store.scofa.com/",
      icon: StoreIcon,
    },
    {
      text: "Find Sleep Doctors",
      link: "https://scofa.com/featured-search/",
      icon: FindDoctorsIcon,
    },
    {
      text: "Check Sleep Symptoms",
      link: "https://scofa.com/check-sleep-disorder-symptoms/",
      icon: CheckSymptomsIcon,
    },
  ];

  return (
    <div className={`menubar ${props?.menuClass}`}>
      <Link className="logo" to="/home">
        <img src={logo} alt="Logo" />
      </Link>
      <ul className="list-unstyled">
        {menu.map((item, index) => (
          <li className="menubar-li" key={index}>
            <Link
              className={
                location.pathname.includes(item.path)
                  ? "menuLink active"
                  : "menuLink"
              }
              to={item.link}
            >
              <img src={item.icon} className="menuIcon" />
              <span className="menuLinkText">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
