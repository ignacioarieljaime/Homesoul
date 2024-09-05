import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import MessageBox from "../../assets/svgs/MessageBox.svg";

const VerificationEmail = () => {
  return (
    <>
      <Navbar forgotPassword />
      <div className="reset-password" style={{ padding: "133px 0 244px 0" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="reset-password-box">
            <div className="row">
              <div
                className="col-md-12 d-flex justify-content-center align-items-center flex-column text-center py-4"
                style={{ gap: 26 }}
              >
                <div className="message-icon-container">
                  <img src={MessageBox} alt="message" />
                </div>
                <div
                  style={{
                    fontFamily: "Work Sans SemiBold",
                    fontSize: 26,
                    color: "#2B2A29",
                    textAlign: "center",
                  }}
                >
                  <p className="m-0">Check your Email</p>
                </div>
                <div style={{ width: "70%" }}>
                  <p
                    style={{
                      width: "100%",
                      color: "#2B2A29",
                      fontSize: 18,
                      fontFamily: "Work Sans Regular",
                      lineHeight: "normal",
                    }}
                  >
                    An email has been sent to you with a link to reset the
                    password for your account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerificationEmail;
