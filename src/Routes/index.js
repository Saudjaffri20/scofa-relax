import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { getAccessToken } from "../Util/authHeader";
// import MainAudioPlayer from "../Components/MainAudioPlayer";
// import MultiAudioPlayer from "../Components/MultiAudioPlayer";
import MultiAudioPlayerrr from "../Components/MultiAudioPlayerrr";
// import MultiAudioPlayerrr from "../Components/CustomAudioPlayer";
import { useEffect, useState } from "react";

import Main from "../Screens/Main/";

import Login from "../Screens/Auth/Login";
import Signup from "../Screens/Auth/Signup";

import Home from "../Screens/Home";
import Stories from "../Screens/Stories";
import Relaxation from "../Screens/Relaxation";
import Articles from "../Screens/Articles";
import Sounds from "../Screens/Sounds";
import AudioDetail from "../Screens/AudioDetail";
// import Sounds from "../Screens/Sounds2";
import Settings from "../Screens/Settings";
import Upgrade from "../Screens/Upgrade";

const WebRoutes = () => {
  const token = getAccessToken();
  return (
    <>
      <BrowserRouter basename="/test">
        <Routes>
          <Route path="/" element={<Sounds />} />
        </Routes>
        <MainAudioPlayerWrapper />
      </BrowserRouter>
    </>
  );
};

const MainAudioPlayerWrapper = () => {
  // return tokenStatus ? <MainAudioPlayer /> : null;
  // return tokenStatus ? <MultiAudioPlayer /> : null;
  return <MultiAudioPlayerrr />;
  // return tokenStatus ? <MultiAudioPlayer2 /> : null;
};

export default WebRoutes;
