import React from "react";
import Header from "../../../component/Header";
import Lottie from "lottie-react";
import success from "../../../../assets/json/Secessful.json";
import { Button } from "reactstrap";
import download from "../../../assets/svgs/checkOption/download.png";
import { useNavigate, useLocation } from "react-router-dom";
import { resetAudit } from "../../../../redux/reducers/audit";
import { useDispatch } from "react-redux";

const Checkoption = () => {
  const navigate = useNavigate();
  const { state: auditId } = useLocation();
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center ">
        <div
          style={{
            width: "60%",
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "20px",
          }}
          className="bg-white p-3 mb-5 d-flex justify-content-center "
        >
          <div
            style={{ width: "58%" }}
            className="d-flex justify-content-center align-items-center  flex-column "
          >
            <div
              style={{ height: "166px", width: "207px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Lottie animationData={success} />
            </div>

            <p
              style={{
                fontFamily: "Work sans",
                fontSize: "22px",
                fontWeight: 500,
                textAlign: "center",
                margin: 0,
                lineHeight: "normal",
              }}
            >
              We Successfully generated your energy conservation points result
              reports based on your Audit.
            </p>
            <div
              style={{
                color: "#2C5AB4",
                backgroundColor: "transparent",
                border: "1px solid #2C5AB4",
                borderRadius: "10px",
                letterWSpacing: "0px",
                fontSize: "18px",
                fontFamily: "Work Sans",
                fontWeight: 500,
                padding: "11px",
                marginTop: "24px",
              }}
            >
              <img
                style={{
                  height: "23px",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
                src={download}
              />
              Coming soon
            </div>
            <p
              style={{
                marginTop: "40px",
                color: "#F4AD7E",
                fontSize: "26px",
                fontFamily: "Work Sans",
                fontWeight: 500,
                textAlign: "center",
                letterWSpacing: "0px",
                lineHeight: "30px",
                marginBottom: 0,
              }}
            >
              Please Check Top 3 least cost options as per report.
            </p>
            <Button
              style={{
                marginTop: "40px",
                marginBottom: "50px",
                backgroundColor: "#2C5AB4",
                width: "90%",
                fontSize: "22px",
                fontFamily: "Work Sans",
                fontWeight: 500,
                padding: "8px",
                borderRadius: "10px",
              }}
              onClick={() => {
                navigate(`/dashboard/planoption`, { state: auditId });
                dispatch(resetAudit());
              }}
            >
              Check Option's
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkoption;
