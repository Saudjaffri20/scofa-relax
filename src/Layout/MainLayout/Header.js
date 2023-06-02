import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../../Util/authHeader";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Slices/UserSlice";

import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import CustomSearchBar from "../../Components/CustomSearchBar";

import { currentUser } from "../../Config/data";

export const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(currentUser);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    removeAccessToken()
    dispatch(setUserDetails(null))
    navigate('/login')
  };

  return (

    
    <div className="headerWrapper">
      <div className="row">
        <div className="col-12 text-end">
          <div className="d-flex align-items-center justify-content-end gap-3 flex-wrap-reverse">
            <div className="headerSearchWrapper">
              <p className="smallText mb-0 me-2">Search</p>
              <CustomSearchBar
                placeholder="What do you want to listen to?"
                onChange={(event) => {
                  handleSearch(event);
                }}
              />
            </div>
            <Link to={"/upgrade"} className="headerUpgradeLink d-none d-md-block">
              Upgrade
            </Link>
            <Dropdown className="headerDropdown">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="headerDropdownButton"
              >
                <img src={user.image} alt="Avatar" className="avatar" />
                {user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="headerDropdownMenu">
                <Link to={"/upgrade"} className="headerDropdownAction d-md-none">
                  Upgrade
                </Link>
                <Link to={"#_"} className="headerDropdownAction d-md-none">
                  Playlist
                </Link>
                <Link to={"#_"} className="headerDropdownAction d-md-none">
                  Favorites
                </Link>
                <Link to={"/settings"} className="headerDropdownAction">
                  Settings
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
          </div>
        </div>
      </div>
    </div>
  );
};
