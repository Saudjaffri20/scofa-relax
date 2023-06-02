import { useEffect, useState } from "react";

import MainLayout from "./../../Layout/MainLayout";

import { sounds } from "../../Config/data";

import RoundAudio from "../../Components/RoundAudio";

import "./style.css";
import axios from "axios";
import BASEURL from "../../Config/global";


const Sounds = () => {
  const [soundsData, setSoundsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/sounds/`
        );
        if (response.data.error != true) {
          setSoundsData(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="pageTitle">Sounds</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="soundBoxWrapper">
              {soundsData.map((item, index) => <RoundAudio key={index} item={item}/>)}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Sounds;
