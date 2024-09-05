import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import BushImg from "../../assets/images/bush.png";
import customer from "../../assets/images/Customer.png";
import professional from "../../assets/images/Professional.png";
import { useNavigate } from "react-router-dom";

const UserTypes = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className="top-spacing" style={{ position: "relative" }}>
        <div className="userTypes-main userTypes-main-space">
          <div className="container p-0">
            <div
              className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xxl-2"
              style={{ marginRight: 0 }}
            >
              <div
                className="col-6  d-flex justify-content-center mb-4 mt-4 customer-user-card-space"
                style={{ paddingRight: 0 }}
              >
                <div className="user-type-card customer-user-card-space">
                  <div
                    className="d-flex justify-content-center flex-column text-center signup-container"
                    style={{ paddingTop: "4rem" }}
                  >
                    <div className="user-type-img-main ">
                      <img alt="img" src={customer} className="user-type-img" />
                    </div>
                    <h2 className="user-type-card-title">Customer</h2>
                    <h3 className="user-type-title">House or Corporate</h3>
                    <p
                      style={{
                        fontFamily: "Work Sans Regular",
                        fontSize: 16,
                        color: "#707070",
                        lineHeight: "normal",
                        marginTop: 24,
                      }}
                    >
                      Are you a homeowner looking to embrace sustainable living?
                      This registration is for individuals who are interested in
                      implementing eco-friendly solutions in their homes.
                      Whether you are looking to reduce your energy consumption,
                      explore renewable energy options, or make your home more
                      sustainable, our team is here to guide you every step of
                      the way.
                    </p>
                    <button
                      style={{ fontFamily: "Work Sans Medium", fontSize: 22 }}
                      onClick={() => navigate("/customersignup")}
                      className="user-get-started-btn"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="col-6 d-flex justify-content-center  mt-4 professional-user-card-space"
                style={{ marginBottom: "1.5rem" }}
              >
                <div className="user-type-card">
                  <div
                    className="d-flex justify-content-center flex-column text-center signup-container"
                    style={{ paddingTop: "4rem" }}
                  >
                    <div className="user-type-img-main ">
                      <img
                        alt="img"
                        src={professional}
                        className="user-type-img"
                      />
                    </div>
                    <h2 className="user-type-card-title">Professional</h2>
                    <h3 className="user-type-title">Vendor or Business</h3>
                    <p
                      style={{
                        fontFamily: "Work Sans Regular",
                        fontSize: 16,
                        color: "#707070",
                        lineHeight: "normal",
                        marginTop: 24,
                      }}
                    >
                      Are you a professional dedicated to advancing sustainable
                      living? This registration is for vendors, energy auditors,
                      contractors, and other professionals who offer services or
                      products that support sustainability. By registering as a
                      professional, you can connect with consumers seeking your
                      expertise and contribute to our mission of creating a
                      greener future.
                    </p>
                    <button
                      style={{ fontFamily: "Work Sans Medium", fontSize: 22 }}
                      onClick={() => navigate("/signup")}
                      className="user-get-started-btn"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100" style={{ position: "absolute", bottom: -1 }}>
          <img alt="img" src={BushImg} className="w-100" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UserTypes;
