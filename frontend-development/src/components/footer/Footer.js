import React from "react";
import call from "../../assets/svgs/Group 57918.svg";
import bulletPoint from "../../assets/svgs/bulletPoint.svg";
import message from "../../assets/svgs/Message.svg";
import addres from "../../assets/svgs/Addresh.svg";
import logo from "../../assets/svgs/main-logo.png";
import facebook from "../../assets/svgs/Facebook.svg";
import instagram from "../../assets/svgs/Instagram.svg";
import youtube from "../../assets/svgs/Youtube.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "36.5%" }}>
      <div className="container-fluid p-0 h-100">
        <footer
          className="text-center text-lg-start text-white h-100"
          style={{
            backgroundColor: "#2c5ab4",
            display: "flex",
            paddingTop: 10,
            position: "relative",
            zIndex: 1,
            flexDirection: "column",
          }}
        >
          <section className="footer-section">
            <div
              className="container text-start text-md-start mt-lg-5"
              style={{ maxWidth: 910 }}
            >
              <div className="row mt-3" style={{ width: "100%" }}>
                <div className="col-6 footer-element-container col-sm-6 col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 footer-menu ">
                  <div>
                    <h6 className=" header-fontweight footer-title">Support</h6>

                    <p
                      onClick={() => {
                        navigate("/faq");
                        window.scrollTo(0, 0);
                      }}
                      style={{ cursor: "pointer" }}
                      className="footer-text"
                    >
                      <img
                        alt="img"
                        src={bulletPoint}
                        className="footer-icon"
                      />
                      FAQ
                    </p>

                    <p
                      onClick={() => {
                        navigate("/sitemap");
                        window.scrollTo(0, 0);
                      }}
                      className="footer-text"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        alt="img"
                        src={bulletPoint}
                        className="footer-icon"
                      />
                      Site Map
                    </p>

                    <p
                      onClick={() => {
                        navigate("/privacy");
                        window.scrollTo(0, 0);
                      }}
                      className="footer-text"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        alt="img"
                        src={bulletPoint}
                        className="footer-icon"
                      />
                      Privacy
                    </p>

                    <p
                      onClick={() => {
                        navigate("/term");
                        window.scrollTo(0, 0);
                      }}
                      className="footer-text"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        alt="img"
                        src={bulletPoint}
                        className="footer-icon"
                      />
                      Terms
                    </p>
                  </div>
                </div>

                <div className="col-6 footer-element-container serve-div col-sm-6 col-md-4 col-lg-3 col-xl-4 mx-auto mb-md-0 mb-4">
                  <div>
                    <h6 className=" header-fontweight footer-title">
                      We Serve
                    </h6>

                    <p className="footer-text">
                      <img
                        alt="img"
                        src={bulletPoint}
                        className="footer-icon"
                      />
                      USA
                    </p>
                    <p className="footer-text">
                      <img
                        alt="img"
                        src={bulletPoint}
                        className="footer-icon"
                      />
                      Canada
                    </p>
                  </div>
                </div>

                <div className="col-6 footer-element-container col-sm-6 col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 contact-footer">
                  <div className="d-flex flex-column gap-1">
                    <h6 className=" header-fontweight footer-title">
                      Contact Us
                    </h6>
                    <div
                      className="d-flex p-0"
                      style={{ alignItems: "flex-start" }}
                    >
                      <img alt="img" src={call} className="footer-icon" />
                      <p className="footer-text">HomeSoul</p>
                    </div>
                    <div
                      className="d-flex p-0"
                      style={{ alignItems: "flex-start" }}
                    >
                      <img alt="img" src={call} className="footer-icon" />
                      <p className="footer-text">647-708-4322</p>
                    </div>
                    <div
                      className="d-flex p-0"
                      style={{ alignItems: "flex-start" }}
                    >
                      <img alt="img" src={message} className="footer-icon" />
                      <p
                        style={{ minHeight: "20px" }}
                        className="footer-text"
                      ></p>
                    </div>
                    <div
                      className="d-flex p-0"
                      style={{ alignItems: "flex-start" }}
                    >
                      <img alt="img" src={addres} className="footer-icon" />
                      <p className="footer-text">201 Whitehall Drive, Unit 6</p>
                    </div>
                  </div>
                </div>

                <div className="col-6 footer-element-container col-sm-6 col-md-4 col-lg-3 col-xl-2 mx-auto mb-md-0 mb-4 social-link text-md-center">
                  <div>
                    <h6 className=" header-fontweight footer-title">
                      Keep In Touch
                    </h6>
                    <div
                      className="d-flex social-element p-0"
                      style={{ alignItems: "flex-start", flexWrap: "nowrap" }}
                    >
                      <a href="https://www.instagram.com/">
                        <img
                          alt="img"
                          src={instagram}
                          style={{ marginRight: "15px" }}
                        />
                      </a>
                      <a href="https://www.youtube.com/">
                        <img
                          alt="img"
                          src={youtube}
                          style={{ marginRight: "15px" }}
                        />
                      </a>
                      <a href="https://www.facebook.com/">
                        <img alt="img" src={facebook} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <img
                  alt="img"
                  src={logo}
                  style={{
                    backgroundColor: "white",
                    padding: "13px 24px 5px",
                    borderRadius: "71px 71px 0px 0px",
                    maxWidth: "123px",
                  }}
                />
              </div>
            </div>
          </section>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "#6DBD45", fontSize: "20px" }}
          >
            <a className=" footer-last-text " href="#">
              @HomeSoul Plateform Inc. &nbsp;All Right Served
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
