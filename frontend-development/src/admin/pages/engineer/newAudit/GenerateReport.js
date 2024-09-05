import React from "react";
import { filesize } from "filesize";
import Header from "../../../component/Header";
import DeleteSvg from "../../../assets/svgs/audit-generate/delete.svg";
import GenerateSvg from "../../../assets/svgs/audit-generate/audit_generate.svg";
import KeySvg from "../../../assets/svgs/upload-audit-file/key_svg.svg";
import { Button, Progress } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";

const GenerateReport = () => {
  const navigate = useNavigate();
  const fileContent = useLocation().state?.fileContent;
  const handleGenerate = () => {
    navigate("/dashboard/audit-advanced-checkoption", {
      state: { fileContent },
    });
  };
  return (
    fileContent && (
      <div style={{ marginBottom: 100 }}>
        <Header />
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: 73 }}
        >
          <div className="audit-generate-card">
            <div className="d-flex justify-content-center flex-column text-center">
              <div>
                <p
                  style={{
                    fontFamily: "Work Sans SemiBold",
                    fontSize: 40,
                    color: "#2B2A29",
                    lineHeight: "normal",
                    marginBottom: 38,
                  }}
                >
                  Uploaded File
                </p>
              </div>
              <div
                className="d-flex flex-column"
                style={{ gap: 12, marginBottom: 32 }}
              >
                <div className="audit-generate-status">
                  <div className="d-flex justify-content-between ">
                    <div className="d-flex" style={{ gap: 18 }}>
                      <div>
                        <img src={GenerateSvg} alt="img" />
                      </div>
                      <div className="d-flex flex-column">
                        <div
                          style={{
                            fontFamily: "Work Sans Medium",
                            fontSize: 14,
                            color: "#2B2A29",
                          }}
                        >
                          {fileContent?.fileName}
                        </div>
                        <div
                          style={{
                            fontFamily: "Work Sans Regular",
                            fontSize: 14,
                            textAlign: "left",
                          }}
                        >
                          <span style={{ color: "#AEADAD" }}>
                            {filesize(fileContent?.fileSize || 0)} |
                          </span>
                          <span style={{ color: "#1EAF67" }}> 100%</span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/dashboard/audit-upload", { replace: true })
                      }
                    >
                      <img src={DeleteSvg} alt="delete_image" />
                    </div>
                  </div>
                  <div>
                    <Progress
                      value={100}
                      style={{ height: 4, backgroundColor: "#E8E8E8" }}
                      barStyle={{ backgroundColor: "#1EAF67" }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-center "
                style={{ gap: 6 }}
              >
                <img src={KeySvg} alt="key-img" />
                <p
                  className="mb-0"
                  style={{
                    fontFamily: "Work Sans Regular",
                    color: "#AEADAD",
                    lineHeight: "normal",
                    fontSize: 13,
                  }}
                >
                  "Rest assured, your data is in safe hands with us."
                </p>
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "#2C5AB4",
                    borderRadius: 10,
                    fontFamily: "Work Sans Medium",
                    fontSize: 22,
                    padding: "10px 32px",
                    marginTop: 18,
                  }}
                  onClick={handleGenerate}
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default GenerateReport;
