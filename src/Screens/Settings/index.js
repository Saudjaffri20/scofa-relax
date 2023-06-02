import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "./../../Layout/MainLayout";

import { currentUser } from "../../Config/data";

import "./style.css";
import { avatar } from "../../Assets/images";

const Settings = () => {
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   setUser(currentUser);
  // }, []);

  useEffect(() => {
    const currentUser = localStorage.getItem("user")
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <>
      <MainLayout>
        <div className="row mb-lg-5 mb-4">
          <div className="col-12">
            <div className="d-flex align-items-center gap-3">
              <img src={avatar} alt="" className="profileImage"/>
              <h2 className="pageTitle">{`${user.first_name} ${user.last_name}`}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="linkWrapper mb-4 px-3">
              <Link to={'#_'} className='text-decoration-none'>Account</Link>
            </div>
            <div className="linkWrapper mb-4 px-3">
              <Link to={'#_'} className='text-decoration-none'>Liked Tracks</Link>
            </div>
            <div className="linkWrapper mb-4 px-3">
              <Link to={'#_'} className='text-decoration-none'>News Feed</Link>
            </div>
            <div className="linkWrapper mb-4 px-3">
              <Link to={'#_'} className='text-decoration-none'>Social Apps</Link>
            </div>
            <div className="linkWrapper mb-4 px-3">
              <Link to={'#_'} className='text-decoration-none'>Devices</Link>
            </div>
            <div className="linkWrapper mb-4 px-3">
              <Link to={'#_'} className='text-decoration-none'>Privacy Policy</Link>
            </div>
            <div className="linkWrapper mb-4 px-3">
              <Link to={'#_'} className='text-decoration-none'>Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Settings;
