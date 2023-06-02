import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import BASEURL from "../../Config/global";
import { setAccessToken } from "../../Util/authHeader";

import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Slices/UserSlice";

import AuthLayout from "../../Layout/AuthLayout";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";

import "./style.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loginError, setLoginError] = useState({ error: false, text: "" });

  const handleClick = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.email);
    formDataToSend.append("password", formData.password);
    try {
      const response = await axios.post(
        `${BASEURL}/api/user/login/`,
        formDataToSend
      );
      if (response.data.error === false) {
        const token = response.data.data[0].token;
        setLoginError({ error: false, text: "" });
        setAccessToken(token);
        dispatch(setUserDetails(response.data.data[0]));
        navigate("/home");
      } else {
        setLoginError({ error: true, text: response.data.message });
      }
    } catch (error) {
      setLoginError({
        error: true,
        text: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <>
      <AuthLayout>
        <form>
          <div className="row">
            <div className="col-12">
              <CustomInput
                label="Email"
                required
                id="email"
                type="text"
                labelClass="mainLabel"
                inputClass="mainInput"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  });
                }}
              />
            </div>
            <div className="col-12">
              <CustomInput
                label="Password"
                required
                id="pass"
                type="password"
                labelClass="mainLabel"
                inputClass="mainInput"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    password: event.target.value,
                  });
                }}
              />
            </div>
            {loginError.error == true && (
              <div className="col-12">
                <p className="smallText lightColor">{loginError.text}</p>
              </div>
            )}
            <div className="col-12 text-end">
              <Link to={"#_"} className={"authFormLinks"}>
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="row mt-4 text-center">
            <div className="col-12">
              <CustomButton
                variant="primaryButton"
                text="Login"
                onClick={handleClick}
              />
            </div>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
