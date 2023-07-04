import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../../Util/authHeader";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Slices/UserSlice";

import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { avatar, logo } from "../../Assets/images";

import CustomSearchBar from "../../Components/CustomSearchBar";
import BASEURL from "../../Config/global";
import { Cog, ThreeDots } from "../../Assets/svg";

// import { currentUser } from "../../Config/data";

export const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    removeAccessToken();
    localStorage.removeItem("user");
    dispatch(setUserDetails(null));
    navigate("/login");
  };

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
            <div className="d-flex align-items-center gap-2">
              <Link
                to={"/upgrade"}
                className="headerUpgradeLink d-none d-md-block"
              >
                Upgrade
              </Link>
              <Link className="" to="/settings">
                <img src={Cog} alt="Cog" className="headerIcon"/>
              </Link>
              <Dropdown className="headerDropdown">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="headerDropdownButton"
                >
                  {/* <img src={avatar} alt="Avatar" className="avatar" />
                {user.first_name} */}
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
                  {/* <Link to={"/settings"} className="headerDropdownAction">
                    Settings
                  </Link> */}
                  <button
                    type="button"
                    className="headerDropdownAction"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
