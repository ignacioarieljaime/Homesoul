import React from "react";
import Header from "../../../component/Header";
import AnalysisSvg from "../../../assets/svgs/audit-type/audit_analysis.svg";
import BasicReportSvg from "../../../assets/svgs/audit-type/basic_report.svg";
import AdvancedReportSvg from "../../../assets/svgs/audit-type/advanced_report.svg";
import { useNavigate } from "react-router-dom";
import { setIsRefresh } from "../../../../redux/reducers/audit";
import { useDispatch } from "react-redux";

const AuditType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div style={{ marginBottom: 100 }}>
      <Header />
      <div
        className="d-flex justify-content-center"
        style={{ marginBottom: 34 }}
      >
        <img src={AnalysisSvg} alt="analysis_logo" />
      </div>

      <div
        className="d-flex justify-content-center"
        style={{ marginBottom: "9.8%" }}
      >
        <p
          className="m-0 audit-analysis-text"
          style={{
            fontFamily: "Work Sans Medium",
            fontSize: 24,
            lineHeight: "normal",
            textAlign: "center",
            color: "#2B2A29",
          }}
        >
          "Choose between Basic Reports for concise summaries or Advanced
          Reports for in-depth analysis."
        </p>
      </div>
      <div
        className="d-flex justify-content-center audit-type-container "
        style={{ gap: 124 }}
      >
        <div className="audit-type-card audit-type-card-space">
          <div
            className="d-flex justify-content-center flex-column text-center signup-container"
            style={{ paddingTop: "3.5rem" }}
          >
            <div className="audit-type-img-main ">
              <img
                alt="img"
                src={BasicReportSvg}
                className="audit-type-image"
              />
            </div>

            <div>
              <p
                style={{
                  fontFamily: "Work Sans SemiBold",
                  fontSize: 36,
                  lineHeight: "normal",
                  color: "#2B2A29",
                  marginTop: 5,
                }}
              >
                Basic Report
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Work Sans Regular",
                  fontSize: 18,
                  lineHeight: "normal",
                  color: "#AEADAD",
                }}
              >
                A basic report provides essential information in a concise
                format, catering to a general audience's need for quick
                comprehension.
              </p>
            </div>

            <button
              style={{ fontFamily: "Work Sans Medium", fontSize: 22 }}
              className="audit-type-proceed-btn"
              onClick={() => {
                dispatch(setIsRefresh(false));
                navigate("/dashboard/newaudit");
              }}
            >
              Proceed
            </button>
          </div>
        </div>
        <div className="audit-type-card audit-type-card-space">
          <div
            className="d-flex justify-content-center flex-column text-center signup-container"
            style={{ paddingTop: "4rem" }}
          >
            <div className="audit-type-img-main ">
              <img
                alt="img"
                src={AdvancedReportSvg}
                className="audit-type-image"
              />
            </div>

            <div>
              <p
                style={{
                  fontFamily: "Work Sans SemiBold",
                  fontSize: 36,
                  lineHeight: "normal",
                  color: "#2B2A29",
                  marginTop: 5,
                }}
              >
                Advanced Report
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Work Sans Regular",
                  fontSize: 18,
                  lineHeight: "normal",
                  color: "#AEADAD",
                  marginBottom: 26,
                }}
              >
                An advanced report delves deeply into a topic, offering detailed
                analysis and insights, often aimed at specialized audiences
                requiring in-depth understanding.
              </p>
            </div>
            <button
              style={{ fontFamily: "Work Sans Medium", fontSize: 22 }}
              className="audit-type-proceed-btn"
              onClick={() => navigate("/dashboard/audit-upload")}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditType;
