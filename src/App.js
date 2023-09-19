import { useEffect } from "react";
import axios from "axios";
import WebRoutes from "./Routes";
import BASEURL from "./Config/global";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./Assets/css/style.css";
import { async } from "q";

function App() {
  const fetchDevice = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/user/get_device_info`);
      const device = response.data.data;
      if (device == "iOS" || device == "Mac OS X") {
        window.location.href = "https://relax.scofa.com/ios";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDevice();
  }, []);

  return (
    <>
      <WebRoutes />
    </>
  );
}

export default App;
