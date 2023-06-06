import { useEffect, useState } from "react";

import MainLayout from "./../../Layout/MainLayout";

import {
  HeartButton,
  PauseButton,
  PlayButton,
  ShuffleButton,
  playIcon,
} from "../../Assets/svg";

import "./style.css";
import CustomTable from "../../Components/CustomTable";
import axios from "axios";
import BASEURL from "../../Config/global";

import { useDispatch } from "react-redux";
import { playAudio } from "../../Store/Slices/AudioSlice";
import { playSound } from "../../Store/Slices/SoundPlayerSlice";

const Stories = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [playingAudio, setPlayingAudio] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/stories/`);
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

  const tableHeaders = [
    {
      key: "play",
      title: "",
    },
    {
      key: "title",
      title: "Title",
    },
    {
      key: "duration",
      title: "Duration",
    },
    {
      key: "genre",
      title: "Genre/Mood",
    },
    {
      key: "action",
      title: "",
    },
  ];

  return (
    <>
      <MainLayout>
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="pageTitle">Stories</h2>
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
          <div className="col-12">
            <CustomTable headers={tableHeaders}>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {" "}
                      <button
                        type="button"
                        className="customTableAction roundButton primaryFill"
                        onClick={() => {
                          dispatchPlaySound(
                            item.audio,
                            item.title,
                            item.thumbnail,
                            item.naration
                          );
                        }}
                      >
                        <img src={playIcon} alt="" />
                      </button>
                    </td>
                    <td>
                      <img
                        src={`${BASEURL + item.thumbnail}`}
                        alt="Thumbnail"
                        className="customTableThumbnail"
                      />
                      {item.title}
                    </td>
                    <td>{item.duration}</td>
                    <td>{item.storycategoriesname}</td>
                    <td>
                      <div className="customTableActions">
                        <button
                          type="button"
                          className="customTableAction notButton lightStroke"
                        >
                          <HeartButton />
                        </button>

                        {/* {playingAudio.id == item.id ? <p>Playing</p> : <p>Not</p>} */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </CustomTable>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Stories;
