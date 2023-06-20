import { useEffect, useState } from "react";

import MainLayout from "./../../Layout/MainLayout";
import CustomCard from "../../Components/CustomCard";

import { sounds, meditation, stories, articles } from "../../Config/data";

import BASEURL from "./../../Config/global";

import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { playAudio } from "../../Store/Slices/AudioSlice";
import { playSound } from "../../Store/Slices/SoundPlayerSlice";
import CustomSearchBar from "../../Components/CustomSearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const [soundData, setSoundData] = useState([]);
  const [meditationData, setMeditationData] = useState([]);
  const [storiesData, setStoriesData] = useState([]);
  const [articlesData, setArticleData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/sounds/`);
        if (response.data.error != true) {
          setSoundData(response.data.data);
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
        const response = await axios.get(`${BASEURL}/api/meditation/`);
        if (response.data.error != true) {
          setMeditationData(response.data.data);
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
        const response = await axios.get(`${BASEURL}/api/stories/`);
        if (response.data.error != true) {
          setStoriesData(response.data.data);
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
        const response = await axios.get(`${BASEURL}/api/articles/`);
        if (response.data.error != true) {
          setArticleData(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const dispatchPlaySound = (source, title, thumbnail, naration) => {
    dispatch(playSound({ source, title, thumbnail, naration }));
  };

  // const dispatchSound = (source, title, thumbnail) => {
  //   dispatch(playAudio({ source, title, thumbnail }));
  // };
  return (
    <>
      <MainLayout>
        <div className="row mb-4">
          <div className="col-12">
            {/* <h2 className="pageTitle">Good Evening!</h2> */}
            <CustomSearchBar
              className="w-100"
              placeholder="What do you want to listen to?"
              onChange={(event) => {
                handleSearch(event);
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-8">
            <h2 className="sectionTitle">Sounds</h2>
          </div>
          <div className="col-4 text-end">
            <Link
              to={"/sounds"}
              className="smallText lightColor text-decoration-none"
            >
              See More
            </Link>
          </div>
          <div className="col-12">
            <div className="homeboxesWrapper">
              {soundData.slice(0, 6).map((item, index) => (
                <CustomCard
                  key={index}
                  title={item.title}
                  image={`${BASEURL + item.image}`}
                  alt={"In The News"}
                  onClick={() => {
                    dispatchPlaySound(
                      item.audio,
                      item.title,
                      item.thumbnail,
                      item.naration
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-8">
            <h2 className="sectionTitle">Meditation</h2>
          </div>
          <div className="col-4 text-end">
            <Link
              to={"/meditation"}
              className="smallText lightColor text-decoration-none"
            >
              See More
            </Link>
          </div>
          <div className="col-12">
            <div className="homeboxesWrapper">
              {meditationData.slice(0, 6).map((item, index) => (
                <CustomCard
                  key={index}
                  title={item.title}
                  image={`${BASEURL + item.image}`}
                  alt={"Meditation"}
                  onClick={() => {
                    dispatchPlaySound(
                      item.audio,
                      item.title,
                      item.thumbnail,
                      item.naration
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-8">
            <h2 className="sectionTitle">Stories</h2>
          </div>
          <div className="col-4 text-end">
            <Link
              to={"/stories"}
              className="smallText lightColor text-decoration-none"
            >
              See More
            </Link>
          </div>
          <div className="col-12">
            <div className="homeboxesWrapper">
              {storiesData.slice(0, 6).map((item, index) => (
                <CustomCard
                  key={index}
                  title={item.title}
                  image={`${BASEURL + item.image}`}
                  alt={"Stories"}
                  onClick={() => {
                    dispatchPlaySound(
                      item.audio,
                      item.title,
                      item.thumbnail,
                      item.naration
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-8">
            <h2 className="sectionTitle">Articles</h2>
          </div>
          <div className="col-4 text-end">
            <Link
              to={"/articles"}
              className="smallText lightColor text-decoration-none"
            >
              See More
            </Link>
          </div>
          <div className="col-12">
            <div className="homeboxesWrapper">
              {articlesData.slice(0, 6).map((item, index) => (
                <CustomCard
                  key={index}
                  title={item.title}
                  image={`${BASEURL + item.image}`}
                  alt={"Articles"}
                  onClick={() => {
                    dispatchPlaySound(
                      item.audio,
                      item.title,
                      item.thumbnail,
                      item.naration
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
