import Lottie from "lottie-react";
import React from "react";
import Header from "../../../component/Header";
import success from "../../../../assets/json/Secessful.json";
import AdvancedReportSvg from "../../../assets/svgs/audit-type/advanced_report.svg";
import DownloadSvg from "../../../assets/svgs/advanced-check-option/download-svg.svg";
import { Button } from "reactstrap";
import { useLocation } from "react-router-dom";

const AdvancedCheckOption = () => {
  const fileContent = useLocation().state?.fileContent;

  return (
    fileContent && (
      <div style={{ marginBottom: 100 }}>
        <Header />
        <div className="d-flex justify-content-center ">
          <div
            style={{
              width: "100%",
              boxShadow: "0px 3px 6px #00000029",
              borderRadius: "20px",
              maxWidth: 674,
              marginTop: 201,
              padding: "0px 11% 3.4%",
            }}
            className="bg-white  mb-5 d-flex justify-content-center "
          >
            <div
              style={{ width: "100%" }}
              className="d-flex justify-content-center align-items-center  flex-column "
            >
              <div
                style={{ height: "206px", width: "207px" }}
                className="d-flex justify-content-center align-items-center"
              >
                <Lottie animationData={success} />
              </div>

              <div style={{ marginTop: 36 }}>
                <img
                  src={AdvancedReportSvg}
                  alt="advances-img"
                  style={{ width: 83, height: 81 }}
                />
              </div>
              <div
                style={{
                  fontFamily: "Work Sans",
                  fontSize: 22,
                  lineHeight: "normal",
                  textAlign: "center",
                  color: "#2B2A29",
                  marginTop: 11,
                }}
              >
                <p className="m-0">
                  We Successfully generated your
                  <span
                    style={{
                      fontFamily: "Work Sans Medium",
                      fontSize: 22,
                      color: "#1EAF67",
                    }}
                  >
                    Advanced Report{" "}
                  </span>
                  based on your uploaded Audit file.
                </p>
              </div>
              <div className="w-100" style={{ marginTop: 43 }}>
                <a href={fileContent?.fileUrl}>
                  <Button
                    style={{
                      backgroundColor: "#2C5AB4",
                      borderRadius: 10,
                      fontFamily: "Work Sans Medium",
                      fontSize: 22,
                      width: "100%",
                      padding: "8px 0",
                    }}
                  >
                    <img src={DownloadSvg} alt="download_image" /> Download The
                    Report
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AdvancedCheckOption;
