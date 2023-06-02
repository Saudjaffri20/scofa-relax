import { Link } from "react-router-dom";

import MainLayout from "./../../Layout/MainLayout";

import "./style.css";

const Upgrade = () => {
  return (
    <>
      <MainLayout>
        <div className="row mt-4 mb-lg-5 mb-4">
          <div className="col-12 text-center">
            <h2 className="pageTitle">
              Try Premium for <br />1 month free
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="premiumList">
              <p className="premiumHeading">Why join Premium?</p>
              <p className="premiumItem">Ultimate Sounds</p>
              <p className="premiumItem">Shuffle Option</p>
              <p className="premiumItem">Make your Playlist</p>
              <p className="premiumItem">Listen to full tracks</p>
              <p className="premiumItem">HD Quality</p>
            </div>
          </div>
          <div className="col-12">
            <div className="premiumList">
              <p className="premiumHeading">Pick your Plan</p>
              <p className="premiumItem">$20.99 per Month</p>
              <p className="premiumItem">$30.00 per Year</p>
            </div>
          </div>
          <div className="col-12 text-center">
            <Link to={"#_"} className="customButton primaryButton">Get Premium</Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Upgrade;
