import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../Layout/AuthLayout";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import CustomToast from "../../Components/CustomToast";

import "./style.css";
import axios from "axios";
import BASEURL from "../../Config/global";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [successAlert, setSuccessAlert] = useState(false);
  const [error, setError] = useState({ error: false, text: "" });

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    setPasswordMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const handlePhoneChange = (event) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    console.log(formattedValue)
    setFormData({
      ...formData,
      phone: formattedValue,
    });
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters from the input
    const cleanedValue = value.replace(/\D/g, '');
  
    // Apply the USA phone number format
    const formattedValue = cleanedValue.replace(
      /^(\d{3})(\d{3})(\d{4})$/,
      '($1) $2-$3'
    );
  
    return formattedValue;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!passwordMatch) return;

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", newPassword);
    formDataToSend.append("phone_number", formData.phone);
    formDataToSend.append("type", "user");
    try {
      const response = await axios.post(
        `${BASEURL}/api/user/signup/`,
        formDataToSend
      );
      if (response.data.error === false) {
        setSuccessAlert(true);
        setError({ error: false, text: "" });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError({ error: true, text: response.data.message });
      }
    } catch (error) {
      setError({
        error: true,
        text: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <>
      <AuthLayout signup={true}>
        <form>
          <div className="row">
            <div className="col-lg-6">
              <CustomInput
                label="First Name"
                required
                id="fname"
                type="text"
                labelClass="mainLabel"
                inputClass="mainInput"
                value={formData.first_name || ""}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    first_name: event.target.value,
                  });
                }}
              />
            </div>
            <div className="col-lg-6">
              <CustomInput
                label="Last Name"
                required
                id="lname"
                type="text"
                labelClass="mainLabel"
                inputClass="mainInput"
                value={formData.last_name || ""}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    last_name: event.target.value,
                  });
                }}
              />
            </div>
            <div className="col-lg-6">
              <CustomInput
                label="Phone"
                required
                id="phone"
                type="text"
                maxLength={10}
                labelClass="mainLabel"
                inputClass="mainInput"
                value={formData.phone || ""}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="col-lg-6">
              <CustomInput
                label="Email"
                required
                id="email"
                type="text"
                labelClass="mainLabel"
                inputClass="mainInput"
                value={formData.email || ""}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  });
                }}
              />
            </div>
            <div className="col-lg-6">
              <CustomInput
                label="Password"
                required
                id="pass"
                type="password"
                labelClass="mainLabel"
                inputClass="mainInput"
                value={newPassword || ""}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="col-lg-6">
              <CustomInput
                label="Confirm Password"
                required
                id="cpass"
                type="password"
                labelClass="mainLabel"
                inputClass="mainInput"
                value={confirmPassword || ""}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {!passwordMatch && (
              <div className="col-12">
                <p className="smallText lightColor">Password doesn't match</p>
              </div>
            )}
            {error.error && (
              <div className="col-12">
                <p className="smallText lightColor">{error.text}</p>
              </div>
            )}
          </div>
          <div className="row mt-4 text-center">
            <div className="col-12">
              <CustomButton
                variant="primaryButton"
                text="Sign Up"
                onClick={handleClick}
              />
            </div>
          </div>
        </form>
        <CustomToast
          show={successAlert}
          title={"Successful"}
          message={"Signed Up"}
          close={() => {
            setSuccessAlert(false);
          }}
        />
      </AuthLayout>
    </>
  );
};

export default Signup;
