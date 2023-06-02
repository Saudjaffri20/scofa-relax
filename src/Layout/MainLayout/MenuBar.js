import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { logo } from "../../Assets/images";

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

  const menu = [
    {
      text: "Home",
      link: "/home",
      path: "home",
      icon: <MenuHome />,
    },
    {
      text: "Sounds",
      link: "/sounds",
      path: "sounds",
      icon: <MenuSound />,
    },
    {
      text: "Meditation",
      link: "/meditation",
      path: "meditation",
      icon: <MenuMeditation />,
    },
    {
      text: "Stories",
      link: "/stories",
      path: "stories",
      icon: <MenuMoon />,
    },
    {
      text: "Articles",
      link: "/articles",
      path: "articles",
      icon: <MenuArticle />,
    },
  ];

  return (
    <div className={`menubar ${props?.menuClass}`}>
      <Link className="logo" to="/home">
        <img src={logo} alt="Logo" />
      </Link>
      <ul className="list-unstyled">
        {menu.map((item) => (
          <li className="menubar-li">
            <Link
              className={
                location.pathname.includes(item.path)
                  ? "menuLink active"
                  : "menuLink"
              }
              to={item.link}
            >
              <span className="menuIcon">{item.icon}</span>
              <span className="menuLinkText">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <hr className="menuSeperator d-none d-md-block" />
      <ul className="list-unstyled d-none d-md-block">
        <li className="menubar-li">
          <Link
            className={
              location.pathname.includes("playist")
                ? "menuLink active"
                : "menuLink"
            }
            to={"#_"}
          >
            <span className="menuLinkText">Playlist</span>
          </Link>
        </li>
        <li className="menubar-li">
          <Link
            className={
              location.pathname.includes("favourites")
                ? "menuLink active"
                : "menuLink"
            }
            to={"#_"}
          >
            <span className="menuLinkText">Favourites</span>
          </Link>
        </li>
        <li className="menubar-li">
            <Link
              className="menuLink"
              to={"https://scofa.com/articles/"}
              target="_blank"
              >
              <span className="menuIcon"><ArticlesIcon/></span>
              <span className="menuLinkText">Articles</span>
            </Link>
          </li>
        <li className="menubar-li">
            <Link
              className="menuLink"
              to={"https://store.scofa.com/"}
              target="_blank"
            >
              <span className="menuIcon"><StoreIcon/></span>
              <span className="menuLinkText">Store</span>
            </Link>
          </li>
        <li className="menubar-li">
            <Link
              className="menuLink"
              to={"https://scofa.com/"} 
              target="_blank"
              >
              <span className="menuIcon"><FindDoctorsIcon/></span>
              <span className="menuLinkText">Find Doctors</span>
            </Link>
          </li>
        <li className="menubar-li">
            <Link
              className="menuLink"
              to={"https://scofa.com/check-sleep-disorder-symptoms/"}
              target="_blank"
            >
              <span className="menuIcon"><CheckSymptomsIcon/></span>
              <span className="menuLinkText">Check Symptoms</span>
            </Link>
          </li>
      </ul>
    </div>
  );
};
