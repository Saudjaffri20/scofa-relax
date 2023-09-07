import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../../Util/authHeader";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Slices/UserSlice";

import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { logo } from "../../Assets/images";

export const Header = (props) => {
  return (
    <div className="headerWrapper">
      <div className="row">
        <div className="col-12 text-end">
          <div className="d-flex align-items-center justify-content-lg-end justify-content-between">
            {/* <div className="headerSearchWrapper">
              <p className="smallText d-none d-md-block mb-0 me-2">Search</p>
              <CustomSearchBar
                placeholder="What do you want to listen to?"
                onChange={(event) => {
                  handleSearch(event);
                }}
              />
            </div> */}
            <Link className="logo d-block d-lg-none" to="/home">
              <img src={logo} alt="Logo" />
            </Link>
            {/* <div className="d-flex align-items-center gap-2">
              <Link
                to={"/upgrade"}
                className="headerUpgradeLink d-none d-md-block"
              >
                Upgrade
              </Link>
              <Link className="" to="/settings">
                <img src={Cog} alt="Cog" className="headerIcon" />
              </Link>
              <Dropdown className="headerDropdown">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="headerDropdownButton"
                >
                  <img src={ThreeDots} alt="" className="headerIcon" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="headerDropdownMenu">
                  <Link
                    to={"/upgrade"}
                    className="headerDropdownAction d-md-none"
                  >
                    Upgrade
                  </Link>
                  <Link to={"#_"} className="headerDropdownAction d-md-none">
                    Playlist
                  </Link>
                  <Link to={"#_"} className="headerDropdownAction d-md-none">
                    Favorites
                  </Link>
                  <Link
                    to={"https://scofa.com/articles/"}
                    target="_blank"
                    className="headerDropdownAction d-md-none"
                  >
                    Articles
                  </Link>
                  <Link
                    to={"https://store.scofa.com/"}
                    target="_blank"
                    className="headerDropdownAction d-md-none"
                  >
                    Store
                  </Link>
                  <Link
                    to={"https://scofa.com/"}
                    target="_blank"
                    className="headerDropdownAction d-md-none"
                  >
                    Find Doctors
                  </Link>
                  <Link
                    to={"https://scofa.com/check-sleep-disorder-symptoms/"}
                    target="_blank"
                    className="headerDropdownAction d-md-none"
                  >
                    Check Symptoms
                  </Link>

                  <button
                    type="button"
                    className="headerDropdownAction"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
