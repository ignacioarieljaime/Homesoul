import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import bulletPoint from "../../assets/svgs/bulletPoint.svg";
import call from "../../assets/svgs/Group 57918.svg";
import message from "../../assets/svgs/Message.svg";
import addres from "../../assets/svgs/Addresh.svg";
import logo from "../../assets/svgs/main-logo.png";
import facebook from "../../assets/svgs/Facebook.svg";
import instagram from "../../assets/svgs/Instagram.svg";
import youtube from "../../assets/svgs/Youtube.svg";

const Sitemap = () => {
  const navigate = useNavigate();

  const handleScroll = (section) => {
    navigate("/", { state: { scrollTo: section } });
  };

  return (
    <>
      <Navbar />
      <section style={{ marginTop: "120px" }} className="footer-section">
        <div
          className="container text-start text-md-start mt-lg-5"
          style={{ maxWidth: 910 }}
        >
          <div className="row mt-3" style={{ width: "100%" }}>
            <div className="col-6 footer-element-container serve-div col-sm-6 col-md-4 col-lg-3 col-xl-4 mx-auto mb-md-0 mb-4">
              <div>
                <h6 className=" header-fontweight footer-title">Quick Links</h6>

                <p
                  onClick={() => {
                    navigate("/");
                  }}
                  className="sitemap-text"
                  style={{ cursor: "pointer" }}
                >
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  Home
                </p>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll("about-us");
                  }}
                  className="sitemap-text"
                  style={{ cursor: "pointer" }}
                >
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  About Us
                </p>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll("contact-us");
                  }}
                  className="sitemap-text"
                  style={{ cursor: "pointer" }}
                >
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  Contact Us
                </p>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll("our-solutions");
                  }}
                  className="sitemap-text"
                  style={{ cursor: "pointer" }}
                >
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  Our Solutions
                </p>
                <p className="sitemap-text" style={{ cursor: "pointer" }}>
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  Blog
                </p>
              </div>
            </div>

            <div className="col-6 footer-element-container col-sm-6 col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 footer-menu ">
              <div>
                <h6 className=" header-fontweight footer-title">Support</h6>

                <p
                  onClick={() => {
                    navigate("/faq");
                    window.scrollTo(0, 0);
                  }}
                  style={{ cursor: "pointer" }}
                  className="sitemap-text"
                >
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  FAQ
                </p>

                <p
                  onClick={() => {
                    navigate("/sitemap");
                    window.scrollTo(0, 0);
                  }}
                  className="sitemap-text"
                  style={{ cursor: "pointer" }}
                >
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  Site Map
                </p>

                <p
                  onClick={() => {
                    navigate("/privacy");
                    window.scrollTo(0, 0);
                  }}
                  className="sitemap-text"
                  style={{ cursor: "pointer" }}
                >
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  Privacy
                </p>

                <p
                  onClick={() => {
                    navigate("/term");
                    window.scrollTo(0, 0);
                  }}
                  className="sitemap-text"
                  style={{ cursor: "pointer" }}
                >
                  <img alt="img" src={bulletPoint} className="footer-icon" />
                  Terms
                </p>
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
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Sitemap;
