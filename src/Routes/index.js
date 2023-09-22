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
// import { useEffect, useState } from "react";


import Sounds from "../Screens/Sounds";

const WebRoutes = () => {
  const token = getAccessToken();
  return (
    <>
      <BrowserRouter basename="/oobt">
        <Routes>
          <Route path="/" element={<Sounds />} />
        </Routes>
        {/* <MainAudioPlayerWrapper /> */}
        <MultiAudioPlayerrr /> 
      </BrowserRouter>
    </>
  );
};

// const MainAudioPlayerWrapper = () => {
//   const token = getAccessToken();
//   const location = useLocation();
//   const [tokenStatus, setTokenStatus] = useState(false);

//   useEffect(() => {
//     const newToken = getAccessToken();
//     const isMainRoute = location.pathname === "/";
//     if (newToken && location.pathname != "/") {
//       setTokenStatus(true);
//     } else {
//       setTokenStatus(false);
//     }
//   }, [location, token]);


//   return tokenStatus ? <MultiAudioPlayerrr /> : null;
// };

export default WebRoutes;
