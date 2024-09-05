import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Lottie from "lottie-react";
import success from "../../assets/json/Secessful.json";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verified = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  let urlToken = searchParams.get("token");

  const verifyEmail = async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/verify-account`,
        {
          token: urlToken,
        }
      );
      toast.success(response.data?.responseMessage, {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="sign-up-detail verified-space"
        style={{ padding: "150px 0 113px 0" }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="enginner-detail-form"
            style={{ padding: "3px 32px 32px 32px" }}
          >
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center align-items-center flex-column text-center">
                <div className="success-animation d-flex justify-content-center align-items-center">
                  <Lottie animationData={success} />
                </div>

                <a className="verified-link" href="#">
                  Already Verified Lets Start
                </a>
                <Button
                  onClick={() => {
                    navigate(
                      `/dashboard`,
                      { replace: true }
                    );
                  }}
                  className="verified-btn"
                  style={{
                    fontFamily: "Work Sans Medium",
                    fontSize: 22,
                    minHeight: 60,
                    width: "68%",
                    color: "#F4FCF0",
                  }}
                >
                  Let's Start
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Verified;
