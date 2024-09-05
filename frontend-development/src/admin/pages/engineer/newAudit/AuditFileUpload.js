import React from "react";
import Header from "../../../component/Header";
import UploadSvg from "../../../assets/svgs/upload-audit-file/upload_svg.svg";
import KeySvg from "../../../assets/svgs/upload-audit-file/key_svg.svg";
import { Button, FormGroup } from "reactstrap";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSpinner } from "../../../../redux/reducers/spinner";

const AuditFileUpload = () => {
  const fileInputRef = React.useRef();
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };
  const [fileName, setFileName] = React.useState("Upload File");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onDrop = React.useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      toast.warning("You can upload only .xls, .xlsx and .xlsm file", {
        position: "top-right",
      });
    } else {
      handleSubmit({ target: { files: acceptedFiles } });
    }
  }, []);

  const handleSubmit = async (event) => {
    const fileData = event.target.files[0];
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel.sheet.macroEnabled.12",
    ];
    if (allowedTypes.includes(fileData?.type)) {
      setFileName(fileData?.name || "Upload File");
      const formData = new FormData();
      formData.append("filestream", fileData);
      dispatch(setSpinner(true));
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL2}/Service/UploadFile`,
          formData,
          {
            headers,
          }
        );
        if (response.data?.status == 1 && response.data?.data) {
          navigate("/dashboard/audit-generate", {
            state: {
              fileContent: {
                fileUrl: response.data?.data?.fileName,
                fileName: fileData?.name,
                fileSize: fileData.size,
              },
            },
          });
        } else {
          toast.error(response.data?.errorMessage, {
            position: "top-right",
          });
        }
      } catch (error) {
        console.log(error);
      }
      dispatch(setSpinner(false));
    } else {
      toast.warning("You can upload only .xls, .xlsx and .xlsm file", {
        position: "top-right",
      });
    }
  };

  return (
    <div style={{ marginBottom: 100 }}>
      <Header />
      <div className="d-flex justify-content-center" style={{ marginTop: 73 }}>
        <div className="audit-file-upload-card">
          <div className="d-flex justify-content-center flex-column text-center">
            <div>
              <p
                style={{
                  fontFamily: "Work Sans SemiBold",
                  fontSize: 40,
                  lineHeight: "normal",
                  color: "#2B2A29",
                  marginBottom: 48,
                }}
              >
                Upload Your Audit File
              </p>
            </div>
            <Dropzone
              onDrop={onDrop}
              noClick={true}
              accept={{
                "application/vnd.ms-excel": [".xls"],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  [".xlsx"],
                "application/vnd.ms-excel.sheet.macroEnabled.12": [".xlsm"],
              }}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "audit-upload-box" })}>
                  <div className="d-flex justify-content-center flex-column align-items-center ">
                    <div style={{ marginBottom: 13 }}>
                      <img src={UploadSvg} alt="upload_image" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "Work Sans SemiBold",
                          fontSize: 20,
                          color: "#2B2A29",
                          lineHeight: "normal",
                          marginBottom: 34,
                        }}
                      >
                        Drag and drop .xls, .xlsx and .xlsm audit file
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "Work Sans Medium",
                          fontSize: 18,
                          color: "#AEADAD",
                          lineHeight: "normal",
                          marginBottom: 34,
                        }}
                      >
                        Or
                      </p>
                    </div>
                    <div style={{ width: "100%" }}>
                      <FormGroup noMargin style={{ marginBottom: "35px" }}>
                        <label
                          htmlFor="fileInput"
                          style={{
                            display: "flex",
                            backgroundColor: "#F5F6F8",
                            border: "1px solid #DFDFDF",
                            borderRadius: "10px",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textAlign: "center",
                            marginBottom: 0,
                            cursor: "pointer",
                            fontFamily: "Work Sans Medium",
                            paddingLeft: 16,
                            height: 50,
                            fontSize: 16,
                          }}
                        >
                          {fileName}
                          <input
                            {...getInputProps()}
                            type="file"
                            ref={fileInputRef}
                            id="fileInput"
                            accept=".xls,.xlsx,.xlsm"
                            onChange={handleSubmit}
                            style={{
                              position: "absolute",
                              opacity: 0,
                              width: 0,
                              height: 0,
                              overflow: "hidden",
                            }}
                          />
                          <Button
                            className="browse-file-button"
                            style={{
                              backgroundColor: "#2C5AB4",
                              minHeight: 50,
                              width: "33.6%",
                              fontFamily: "Work Sans Medium",
                              fontSize: 18,
                              textWrap: "nowrap",
                              borderRadius: 10,
                            }}
                            onClick={handleFileUploadClick}
                          >
                            Browse File
                          </Button>
                        </label>
                      </FormGroup>
                    </div>
                    <div className="d-flex" style={{ gap: 6 }}>
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
                  </div>
                </div>
              )}
            </Dropzone>

            <div>
              <p
                style={{
                  fontFamily: "Work Sans",
                  fontSize: 16,
                  color: "#D34B57",
                  lineHeight: "normal",
                  marginTop: 25,
                  marginBottom: 0,
                }}
              >
                Note:- You can upload only .xls, .xlsx and .xlsm file
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditFileUpload;
