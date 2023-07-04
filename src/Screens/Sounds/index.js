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
  const [featured, setFeatured] = useState([]);

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
    const filteredSound = soundsData.filter((sound) => sound.featured)
    setFeatured(filteredSound)
  }, [soundsData])

  return (
    <>
      <MainLayout>
        <div className="row mb-3">
          <div className="col-12">
            <h2 className="pageTitle">Sounds</h2>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-12 p-0">
            <Accordion defaultActiveKey={['0']} alwaysOpen className="customAccordion">
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
              <Accordion.Item eventKey="1">
                <Accordion.Header>Nature</Accordion.Header>
                <Accordion.Body>
                  <div className="soundBoxWrapper">
                    {soundsData.map((item, index) => (
                      <RoundAudio key={index} item={item} />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Animal</Accordion.Header>
                <Accordion.Body>
                  <div className="soundBoxWrapper">
                    {soundsData.map((item, index) => (
                      <RoundAudio key={index} item={item} />
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Sounds;
