import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import success from "../../assets/json/Secessful.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUpSuccess = () => {
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
      <div className="sign-up-detail" style={{ padding: "150px 0 105px 0" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="enginner-detail-form" style={{ paddingTop: 0 }}>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center align-items-center flex-column text-center">
                <div className="success-animation d-flex justify-content-center align-items-center">
                  <Lottie animationData={success} />
                </div>
                <h2 className="mt-0 mb-4">Yay!</h2>
                <p className="m-0">
                  We Successfully created your{" "}
                  <span
                    style={{
                      fontFamily: "Work Sans Medium",
                      color: "#2C5AB4",
                      lineHeight: "normal",
                    }}
                  >
                    Professional
                  </span>{" "}
                  and we are loading your{" "}
                  <Link
                    replace={true}
                    to={`/dashboard`}
                  >
                    Dashboard
                  </Link>
                  .<br />
                  <p className="m-0" style={{ fontSize: 22 }}>
                    Check Email to{" "}
                    <span
                      style={{
                        fontFamily: "Work Sans Medium",
                        color: "#6DBD45",
                      }}
                    >
                      Verify your Account
                    </span>
                  </p>
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

export default SignUpSuccess;
