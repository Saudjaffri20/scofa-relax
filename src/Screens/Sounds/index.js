import { useEffect, useState } from "react";

import MainLayout from "./../../Layout/MainLayout";

import { sounds } from "../../Config/data";

import RoundAudio from "../../Components/RoundAudio";
import Accordion from "react-bootstrap/Accordion";

import "./style.css";
import axios from "axios";
import BASEURL from "../../Config/global";

const Sounds = () => {
  const [soundsData, setSoundsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/sounds/test`);
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
        <div className="row g-0 py-5">
          <div className="col-12">
            <div className="soundBoxWrapper">
              {soundsData.map((item, idx) => (
                <RoundAudio key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Sounds;
