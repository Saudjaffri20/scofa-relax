import { useEffect, useState } from "react";

import MainLayout from "./../../Layout/MainLayout";

import {
  HeartButton,
  PauseButton,
  Play,
  PlayButton,
  ShuffleButton,
} from "../../Assets/svg";

import "./style.css";
import CustomTable from "../../Components/CustomTable";
import axios from "axios";
import BASEURL from "../../Config/global";

import Accordion from "react-bootstrap/Accordion";

import { useDispatch } from "react-redux";
import { playAudio } from "../../Store/Slices/AudioSlice";
import { playSound } from "../../Store/Slices/SoundPlayerSlice";

const Meditation = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [categorizedSoundsData, setCategorizedSoundsData] = useState([]);
  const [categorizedFilteredData, setCategorizedFilteredData] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/meditation/`);
        if (response.data.error != true) {
          setData(response.data.data);
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
          `${BASEURL}/api/meditation/mediationcategories`
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
    const filteredSound = data.filter((audio) => audio.featured);
    setFeatured(filteredSound);
  }, [data]);

  useEffect(() => {
    const duplicateArray = [];
    categorizedSoundsData.forEach((categoryData) => {
      if (categoryData.category_data.length > 0) {
        duplicateArray.push(categoryData);
      }
    });
    setCategorizedFilteredData(duplicateArray);
  }, [categorizedSoundsData]);

  console.log("categorizedFilteredData => ", categorizedFilteredData);

  // const playSound = (id, source, title, thumbnail) => {
  //   if (playingAudio.id == id) {
  //     return;
  //   } else {
  //     setPlayingAudio({ id, source, title, thumbnail });
  //     dispatch(playAudio({ id, source, title, thumbnail }));
  //   }
  // };

  const dispatchPlaySound = (source, title, thumbnail, naration) => {
    dispatch(playSound({ source, title, thumbnail, naration }));
  };

  // const dispatchSound = (id, source, title, thumbnail) => {
  //   dispatch(playAudio({ id, source, title, thumbnail }));
  // };

  return (
    <>
      <MainLayout>
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="pageTitle">Meditation</h2>
          </div>
        </div>
        {/* <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex align-items-center gap-2">
              <div className="customTableActionWrapper">
                <button
                  type="button"
                  className="customTableAction notButton whiteFill"
                >
                  <ShuffleButton />
                </button>
                <p>Shuffle</p>
              </div>
              <button
                type="button"
                className="customTableAction roundButton primaryFill"
              >
                <PlayButton />
              </button>
            </div>
          </div>
        </div> */}
        <div className="row mb-3">
          <div className="col-12 px-0">
            <Accordion
              defaultActiveKey={["0"]}
              alwaysOpen
              className="customAccordion"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Featured</Accordion.Header>
                <Accordion.Body>
                  <div className="audioStrips stripedRows">
                    {featured.map((item, index) => (
                      <>
                        <div className="audioStrip" key={index}>
                          <div className="audioStripDetails">
                            <img src={`${BASEURL + item.thumbnail}`} alt="" />
                            <p>{item.title}</p>
                          </div>
                          <div className="audioStripExtra">
                            <p className="audioStripduration">00:00</p>
                            <button
                              type="button"
                              className="audioStripButton audioStripPlay"
                              onClick={() => {
                                dispatchPlaySound(
                                  item.audio,
                                  item.title,
                                  item.thumbnail,
                                  item.naration
                                );
                              }}
                            >
                              <img src={Play} alt="" />
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              {categorizedFilteredData.map((categorizedData, index) => (
                <Accordion.Item eventKey={index + 1} key={index + 1}>
                  <Accordion.Header>{categorizedData.name}</Accordion.Header>
                  <Accordion.Body>
                    <div className="audioStrips stripedRows">
                      {categorizedData.category_data.map((item, index) => (
                        <>
                          <div className="audioStrip" key={index}>
                            <div className="audioStripDetails">
                              <img src={`${BASEURL + item.thumbnail}`} alt="" />
                              <p>{item.title}</p>
                            </div>
                            <div className="audioStripExtra">
                              <p className="audioStripduration">00:00</p>
                              <button
                                type="button"
                                className="audioStripButton audioStripPlay"
                                onClick={() => {
                                  dispatchPlaySound(
                                    item.audio,
                                    item.title,
                                    item.thumbnail,
                                    item.naration
                                  );
                                }}
                              >
                                <img src={Play} alt="" />
                              </button>
                            </div>
                          </div>
                        </>
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

export default Meditation;
