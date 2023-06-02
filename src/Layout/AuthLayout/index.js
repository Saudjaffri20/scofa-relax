import { Link } from "react-router-dom";
import { logo, googlePlay, appStore } from "../../Assets/images";

import "./style.css";

const AuthLayout = (props) => {
  return (
    <>
      <section className="fullPageBg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="fullPage">
                <div className="row text-center my-4">
                  <div className="col-12">
                    <div className="logo mt-3">
                      <img src={logo} alt="Logo" />
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-xl-6 col-lg-8 col-md-10 mx-auto">
                    <div className="authFormWrapper">
                      <div className="authHeader">
                        {props.signup ? (
                          <p className="lightColor smallText fw-semibold text-uppercase m-0">
                            Register
                          </p>
                        ) : (
                          <p className="lightColor smallText fw-semibold text-uppercase m-0">
                            Login
                          </p>
                        )}
                        <h2 className="authTitle">Welcome</h2>
                      </div>
                      {props?.children}
                      {props.signup ? (
                        <p className="authPara mt-3">
                          Already have an account?{" "}
                          <Link to={"/login"} className="authParaLink">
                            Sign In
                          </Link>
                        </p>
                      ) : (
                        <p className="authPara mt-3">
                          Don't have an account?{" "}
                          <Link to={"/signup"} className="authParaLink">
                            Sign Up
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="authFooter">
                      {props.signup && (
                        <div className="authFooterLinks">
                          <Link to={"#_"}>Terms & Conditions</Link>
                          <span>|</span>
                          <Link to={"#_"}>Privacy Policy</Link>
                        </div>
                      )}
                      <div className="appLinks">
                        <Link to={"#_"} className="appLink">
                          <img src={googlePlay} alt="Google Play" />
                        </Link>
                        <Link to={"#_"} className="appLink">
                          <img src={appStore} alt="App Store" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
