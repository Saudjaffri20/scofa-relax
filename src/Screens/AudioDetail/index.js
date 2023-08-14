import React from "react";
import "./style.css";
import MainLayout from "../../Layout/MainLayout";
import { cardImage1 } from "../../Assets/images";
import BASEURL from "../../Config/global";
import { Play } from "../../Assets/svg";

const AudioDetail = () => {
  return (
    <MainLayout>
      <div className="row mb-4">
        <div className="col-10 col-lg-12">
          <div className="row">
            <div className="col-lg-5 my-2">
              <div className="audioImage">
                <img
                  src={`${BASEURL}/media/assets/AdobeStock_565111453_RtuU8Rx.png`}
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-7 my-2">
              <div className="audioDetails">
                <h2 className="audioTitle">
                  Total Thankfulness and Deep Gratitude
                </h2>
                <h4 className="audioCategory">Resting</h4>
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
              className="audioStripButton audioStripPlay"
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
