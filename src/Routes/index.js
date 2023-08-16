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
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route
          path="/home"
          element={<Navigate to={token ? "/home" : "/login"} />}
        /> */}
          <Route
            path="/login"
            element={
              <ProtectedRoutes>
                <Login />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoutes>
                <Signup />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            path="/stories"
            element={
              <PrivateRoutes>
                <Stories />
              </PrivateRoutes>
            }
          />
          <Route
            path="/relaxation"
            element={
              <PrivateRoutes>
                <Relaxation />
              </PrivateRoutes>
            }
          />
          <Route
            path="/articles"
            element={
              <PrivateRoutes>
                <Articles />
              </PrivateRoutes>
            }
          />
          <Route
            path="/sounds"
            element={
              <PrivateRoutes>
                <Sounds />
              </PrivateRoutes>
            }
          />
          <Route
            path="/audio-detail/:type/:id"
            element={
              <PrivateRoutes>
                <AudioDetail />
              </PrivateRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoutes>
                <Settings />
              </PrivateRoutes>
            }
          />
          <Route
            path="/upgrade"
            element={
              <PrivateRoutes>
                <Upgrade />
              </PrivateRoutes>
            }
          />

          {/* <Route path="*" element={<Error />} />  */}
        </Routes>
        <MainAudioPlayerWrapper />
      </BrowserRouter>
    </>
  );
};

const MainAudioPlayerWrapper = () => {
  const token = getAccessToken();
  const location = useLocation();
  const [tokenStatus, setTokenStatus] = useState(false);

  useEffect(() => {
    const newToken = getAccessToken();
    const isMainRoute = location.pathname === "/";
    if (newToken && location.pathname != "/") {
      setTokenStatus(true);
    } else {
      setTokenStatus(false);
    }
  }, [location, token]);

  // return tokenStatus ? <MainAudioPlayer /> : null;
  // return tokenStatus ? <MultiAudioPlayer /> : null;
  return tokenStatus ? <MultiAudioPlayerrr /> : null;
  // return tokenStatus ? <MultiAudioPlayer2 /> : null;
};

export default WebRoutes;
