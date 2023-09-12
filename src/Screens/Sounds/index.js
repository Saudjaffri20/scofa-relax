import { useEffect, useState } from "react";

import MainLayout from "./../../Layout/MainLayout";

import { sounds } from "../../Config/data";

import RoundAudio from "../../Components/RoundAudio";
import Accordion from "react-bootstrap/Accordion";

import "./style.css";
import axios from "axios";
import BASEURL from "../../Config/global";
import { playSound } from "../../Store/Slices/SoundPlayerSlice";
import { useDispatch } from "react-redux";

const Sounds = () => {
  const [soundsData, setSoundsData] = useState([]);
  const [categorizedSoundsData, setCategorizedSoundsData] = useState([]);
  const [categorizedFilteredData, setCategorizedFilteredData] = useState([]);
  const [featured, setFeatured] = useState([]);

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

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         `${BASEURL}/api/sounds/soundscategories`
  //       );
  //       if (response.data.error != true) {
  //         setCategorizedSoundsData(response.data.data);
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const filteredSound = soundsData.filter((sound) => sound.featured);
  //   setFeatured(filteredSound);
  // }, [soundsData]);

  // useEffect(() => {
  //   const duplicateArray = [];
  //   categorizedSoundsData.forEach((categoryData) => {
  //     // if (categoryData.category_data.length > 0) {
  //     duplicateArray.push(categoryData);
  //     // }
  //   });
  //   setCategorizedFilteredData(duplicateArray);
  // }, [categorizedSoundsData]);

  return (
    <>
      <MainLayout>
        <div className="row g-0">
          <div className="col-12 p-0">
            <div className="soundBoxWrapper">
              {soundsData.map((sound, index) => (
                <RoundAudio key={index} item={sound} />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Sounds;
