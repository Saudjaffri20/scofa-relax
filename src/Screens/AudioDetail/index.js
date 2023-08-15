import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { playAudio } from "../../Store/Slices/AudioSlice";

import axios from "axios";

import BASEURL from "../../Config/global";
import MainLayout from "../../Layout/MainLayout";

import { Play } from "../../Assets/svg";
import "./style.css";

const AudioDetail = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();

  const audio = useSelector((state) => state.audio.audio);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (type === "meditation") {
      fetchMeditation();
    } else if (type === "stories") {
      fetchStory();
    } else if (type === "articles") {
      fetchArticle();
    }
  }, [type, id]);

  const fetchMeditation = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/meditation/${id}`);
      if (response.data.error != true) {
        setData(response.data.data);
        setIsLoading(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStory = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/stories/${id}`);
      if (response.data.error != true) {
        setData(response.data.data[0]);
        setIsLoading(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/articles/${id}`);
      if (response.data.error != true) {
        setData(response.data.data[0]);
        setIsLoading(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dispatchPlayAudio = (item) => {
    dispatch(playAudio(item));
  };

  return (
    <MainLayout>
      <div className="row mb-4">
        <div className="col-10 col-lg-12">
          <div className="row">
            <div className="col-lg-5 my-2">
              {isLoading && isImageLoading && (
                <div className="customCardSkeleton skeleton"></div>
              )}
              <div className={`audioImage ${isImageLoading ? "d-none" : ""}`}>
                <img
                  src={BASEURL + data.image}
                  alt=""
                  onLoad={() => {
                    setIsImageLoading(false);
                  }}
                />
              </div>
            </div>
            <div className="col-lg-7 my-2">
              {isLoading && <div className="skeletonText skeleton"></div>}
              {isLoading && <div className="skeletonText skeleton"></div>}
              <div className={`audioDetails ${isLoading ? "d-none" : ""}`}>
                <h5 className="audioType">{data.type}</h5>
                <h2 className="audioTitle">{data.title}</h2>
                <h4 className="audioCategory">
                  {data.meditationcategoriesname}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="audioAction">
            <button
              type="button"
              className="audioButton"
              onClick={() => {
                dispatchPlayAudio(data);
              }}
            >
              <img src={Play} alt="" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AudioDetail;
