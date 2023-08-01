import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { playSound2 } from "../../Store/Slices/SoundPlayerSlice2";

import MainLayout from "./../../Layout/MainLayout";

import { sounds } from "../../Config/data";

// import RoundAudio from "../../Components/RoundAudio";
import RoundAudio from "../../Components/RoundAudio2";
import Accordion from "react-bootstrap/Accordion";

import "./style.css";
import axios from "axios";
import BASEURL from "../../Config/global";

const obj = [
  {
    audio: "/media/assets/Rain_20.mp3",
    created_datetime: "2023-06-23T20:56:26.128813Z",
    featured: true,
    id: 80,
    image: "/media/assets/Scofa_Relax_Favicon-removebg-preview_8GSuApR.png",
    naration: false,
    premium: true,
    soundcategory: 102,
    soundscategoriesname: "Test 3",
    thumbnail: "/media/assets/Scofa_Relax_Favicon-removebg-preview_zgGRd1Y.png",
    title: "Test",
    audio_list: [
      "/media/assets/Rain_20.mp3",
      "/media/assets/Rain_40.mp3",
      "/media/assets/Rain_60.mp3",
      "/media/assets/Rain_80.mp3",
      "/media/assets/Rain_100.mp3",
    ],
  },
  {
    audio: "/media/assets/Fire-Sounds_01.mp3",
    created_datetime: "2023-06-23T20:56:26.128813Z",
    featured: true,
    id: 80,
    image: "/media/assets/Scofa_Relax_Favicon-removebg-preview_8GSuApR.png",
    naration: false,
    premium: true,
    soundcategory: 102,
    soundscategoriesname: "Test 3",
    thumbnail: "/media/assets/Scofa_Relax_Favicon-removebg-preview_zgGRd1Y.png",
    title: "Test 2",
    audio_list: [
      "/media/assets/Rain_20.mp3",
      "/media/assets/Rain_40.mp3",
      "/media/assets/Rain_60.mp3",
      "/media/assets/Rain_80.mp3",
      "/media/assets/Rain_100.mp3",
    ],
  },
  {
    audio: "/media/assets/Water_Fall_01.mp3",
    created_datetime: "2023-06-23T20:56:26.128813Z",
    featured: true,
    id: 80,
    image: "/media/assets/Scofa_Relax_Favicon-removebg-preview_8GSuApR.png",
    naration: false,
    premium: true,
    soundcategory: 102,
    soundscategoriesname: "Test 3",
    thumbnail: "/media/assets/Scofa_Relax_Favicon-removebg-preview_zgGRd1Y.png",
    title: "Test 3",
    audio_list: [
      "/media/assets/Rain_20.mp3",
      "/media/assets/Rain_40.mp3",
      "/media/assets/Rain_60.mp3",
      "/media/assets/Rain_80.mp3",
      "/media/assets/Rain_100.mp3",
    ],
  },
];

const Sounds = () => {
  const [soundsData, setSoundsData] = useState([]);
  const [categorizedSoundsData, setCategorizedSoundsData] = useState([]);
  const [categorizedFilteredData, setCategorizedFilteredData] = useState([]);
  const [featured, setFeatured] = useState([]);

  const dispatch = useDispatch();

  const dispatchPlaySound = (item) => {
    dispatch(playSound2(item));
  };

  console.log(soundsData)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/sounds/`);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/sounds/soundscategories`
        );
        if (response.data.error != true) {
          setCategorizedSoundsData(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredSound = soundsData.filter((sound) => sound.featured);
    setFeatured(filteredSound);
  }, [soundsData]);

  useEffect(() => {
    const duplicateArray = [];
    categorizedSoundsData.forEach((categoryData) => {
      if (categoryData.category_data.length > 0) {
        duplicateArray.push(categoryData);
      }
    });
    setCategorizedFilteredData(duplicateArray);
  }, [categorizedSoundsData]);

  return (
    <>
      <MainLayout>
        <div className="row mb-3">
          <div className="col-12">
            <h2 className="pageTitle">Sounds</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {obj.map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  dispatchPlaySound(item);
                }}
              >
                {item.title}
              </p>
            ))}
          </div>
        </div>
        <div className="row g-0">
          <div className="col-12 p-0">
            <Accordion
              defaultActiveKey={["0"]}
              alwaysOpen
              className="customAccordion"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Featured</Accordion.Header>
                <Accordion.Body>
                  <div className="soundBoxWrapper">
                    {featured.map((item, index) => (
                      <RoundAudio key={index} item={item} />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              {categorizedFilteredData.map((categorizedData, index) => (
                <Accordion.Item eventKey={index + 1} key={index + 1}>
                  <Accordion.Header>{categorizedData.name}</Accordion.Header>
                  <Accordion.Body>
                    <div className="soundBoxWrapper">
                      {categorizedData.category_data.map((item, idx) => (
                        <RoundAudio key={idx} item={item} />
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Sounds;
