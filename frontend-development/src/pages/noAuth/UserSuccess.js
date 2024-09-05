import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Lottie from "lottie-react";
import Footer from "../../components/footer/Footer";
import success from "../../assets/json/Secessful.json";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserSuccess = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="sign-up-detail" style={{ padding: "150px 0 136px 0" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="enginner-detail-form"
            style={{ padding: "15px 45px 36px 45px" }}
          >
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center align-items-center flex-column text-center">
                <div className="success-animation d-flex justify-content-center align-items-center">
                  <Lottie animationData={success} />
                </div>
                <h2 className="mt-0 mb-4">Yay!</h2>
                <p
                  className="mb-4"
                  style={{ paddingInline: 10, lineHeight: "normal" }}
                >
                  We Successfully created your{" "}
                  <span
                    className="m-0"
                    style={{
                      fontFamily: "Work Sans Medium",
                      color: "#2C5AB4",
                      fontSize: 25,
                      lineHeight: "normal",
                    }}
                  >
                    User account
                  </span>{" "}
                  and we are loading your{" "}
                  <Link
                    replace={true}
                    to={`/dashboard`}
                  >
                    Dashboard
                  </Link>
                  .<br />
                </p>
                <p
                  className="m-0"
                  style={{ lineHeight: "normal", fontSize: 22 }}
                >
                  Check Email to{" "}
                  <span
                    style={{
                      fontFamily: "Work Sans Medium",
                      color: "#6DBD45",
                      lineHeight: "normal",
                    }}
                  >
                    Verify your Account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserSuccess;
