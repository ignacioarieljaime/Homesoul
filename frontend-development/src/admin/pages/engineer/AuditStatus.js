import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { Table } from "react-bootstrap";
import { Button, Input } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { setSpinner } from "../../../redux/reducers/spinner";
import StepProgress from "../../component/engdashboard/StepProgress";
import {
  resetAudit,
  setHome,
  setIsEdit,
  setIsRefresh,
  setProperty,
  setUser,
} from "../../../redux/reducers/audit";
import StepProgressReject from "../../component/engdashboard/StepProgressReject";

let statusColors = {
  Completed: "#6DBD45",
  New: "#4C8BF5",
  Accepted: "#46A941",
  "On Going": "#F4AD7E",
  Rejected: "#FC0A4C",
};
const AuditStatus = () => {
  const [isReject, setIsReject] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState("");
  const [isEmptyReason, setIsEmptyReason] = React.useState(false);
  const { state: id } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auditData, setAuditData] = useState(null);
  const [auditStatusLog, setStatusLog] = useState(null);

  const sendResponse = async (auditStatusId) => {
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/audit/accept-reject`,
        { auditId: id, auditStatusId: auditStatusId, reason: rejectReason },
        { headers }
      );
      toast.success(response.data?.responseMessage, { position: "top-right" });
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate("/login");
      } else {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
  };

  const handleClick = async (auditStatusId) => {
    try {
      if (auditStatusId === 2) {
        await sendResponse(auditStatusId);
        window.location.reload();
      } else {
        if (isReject) {
          if (rejectReason.trim().length !== 0) {
            await sendResponse(auditStatusId);
            navigate(-1);
          } else {
            setIsEmptyReason(true);
          }
        } else {
          setIsReject(true);
        }
      }
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
  };
  const handleGetHomeDetails = async () => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-home-details`,
        { headers, params: { auditId: id } }
      );
      dispatch(setHome(response.data?.responseData));
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate("/login");
      } else {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
    dispatch(setSpinner(false));
  };
  const handleGetPropertyDetails = async () => {
    dispatch(setSpinner(true));

    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-property-details`,
        { headers, params: { auditId: id } }
      );
      dispatch(setProperty(response.data?.responseData));
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate("/login");
      } else {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
    dispatch(setSpinner(false));
  };
  const handleStartAudit = async (value) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/audit/start-audit`,
        { auditId: id, isEdit: value },
        { headers }
      );
      const data = {
        firstName: response?.data?.responseData.firstName,
        lastName: response?.data?.responseData.lastName,
        emailId: response?.data?.responseData.emailId,
        phone: response?.data?.responseData.phone,
        addressLine1: response?.data?.responseData.addressLine1,
        userProvinceId: response?.data?.responseData.userProvinceId,
        auditId: response?.data?.responseData.auditId,
      };
      dispatch(setUser(data));
      dispatch(setIsRefresh(false));
      navigate("/dashboard/newaudit", { state: id });
      toast.success(response.data?.responseMessage, { position: "top-right" });
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate("/login");
      } else {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
    dispatch(setSpinner(false));
  };

  const handleGetAuditData = async () => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-audit-details/${id}`,
        {
          headers,
        }
      );
      setAuditData(response.data?.responseData?.audit_data);
      setStatusLog(response.data?.responseData?.audit_status_log);
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate("/login");
      } else {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
    dispatch(setSpinner(false));
  };

  useEffect(() => {
    handleGetAuditData();
  }, []);

  return (
    auditData && (
      <div>
        <Header />
        <div
          style={{ boxShadow: "0px 3px 6px #00000029", borderRadius: "20px" }}
          className="w-100 bg-white py-4 px-3 mb-5"
        >
          <h1
            style={{
              color: "#F4AD7E",
              textAlign: "center",
              fontSize: "40px",
              fontFamily: "Work Sans",
              fontWeight: 600,
            }}
          >
            Audits Status Detail
          </h1>
          <div className="position-relative dashboard-table d-flex justify-content-center ">
            <div
              className="position-absolute"
              style={{
                fontSize: "14px",
                fontFamily: "Work Sans",
                top: "14px",
                right: "20px",
              }}
            >
              Status:
              <span
                style={{
                  color: statusColors[auditData.auditStatusName],
                  fontWeight: "500",
                  paddingLeft: "5px",
                }}
              >
                {auditData.auditStatusName}
              </span>
            </div>
            <Table borderless style={{ width: "98%", padding: "5px 15px" }}>
              <tbody>
                <tr>
                  <td className="status-table-header">Customer Name:</td>
                  <td className="status-table-text">
                    {auditData.firstName} {auditData.lastName}
                  </td>
                </tr>
                <tr>
                  <td className="status-table-header">Address:</td>
                  <td className="status-table-text">
                    {auditData.addressLine1} {auditData.addressLine2}
                  </td>
                </tr>
                <tr>
                  <td className="status-table-header">Requested Date:</td>
                  <td className="status-table-text">
                    {moment(auditData?.requestedAt).format(
                      "D MMM YYYY | HH.mm A"
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#2B2A29",
                        padding: "37px 15px",
                        margin: "10px 0px",
                        border: "1px solid #2B2A29",
                        borderRadius: "20px",
                      }}
                    >
                      <div className="">
                        {auditData.auditStatusId === 5 ? (
                          <StepProgressReject auditStatusLog={auditStatusLog} />
                        ) : (
                          <StepProgress auditStatusLog={auditStatusLog} />
                        )}
                      </div>{" "}
                    </div>
                  </td>
                </tr>
                <tr>
                  {auditData.auditStatusId === 4 ||
                  auditData.auditStatusId === 2 ||
                  auditData.auditStatusId === 3 ||
                  auditData.auditStatusId === 1 ? null : (
                    <td className="status-table-header"></td>
                  )}
                  {auditData.auditStatusId === 4 ? (
                    <td
                      colSpan={2}
                      className="status-table-text"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Button
                        style={{
                          marginTop: "40px",
                          marginBottom: "50px",
                          backgroundColor: "#2C5AB4",
                          width: "25%",
                          fontSize: "22px",
                          fontFamily: "Work Sans",
                          fontWeight: 500,
                          padding: "8px 25.9px",
                          borderRadius: "10px",
                          marginInline: "3%",
                        }}
                        onClick={async () => {
                          dispatch(resetAudit());
                          dispatch(setIsEdit(true));
                          await handleGetHomeDetails();
                          await handleGetPropertyDetails();
                          handleStartAudit(true);
                        }}
                      >
                        Edit Audit
                      </Button>
                      <Button
                        style={{
                          marginTop: "40px",
                          marginBottom: "50px",
                          backgroundColor: "#2C5AB4",
                          width: "25%",
                          fontSize: "22px",
                          fontFamily: "Work Sans",
                          fontWeight: 500,
                          padding: "8px",
                          borderRadius: "10px",
                          marginInline: "3%",
                        }}
                        onClick={() => {
                          navigate(`/dashboard/planoption`, { state: id });
                        }}
                      >
                        View Reports
                      </Button>
                    </td>
                  ) : auditData.auditStatusId === 2 ||
                    auditData.auditStatusId === 3 ? (
                    <td colSpan={2} className="status-table-text">
                      <div className="w-100 d-flex justify-content-center ">
                        <Button
                          style={{
                            backgroundColor: "#2C5AB4",
                            width: "200px",
                            fontSize: "15px",
                            fontFamily: "Work Sans",
                            fontWeight: 500,
                          }}
                          onClick={async () => {
                            dispatch(resetAudit());
                            dispatch(setIsEdit(false));
                            handleStartAudit(false);
                            await handleGetPropertyDetails();
                          }}
                        >
                          Start Audit
                        </Button>
                      </div>
                    </td>
                  ) : auditData.auditStatusId ===
                    5 ? null : auditData.auditStatusId === 1 ? (
                    <td className="status-table-text" colSpan={2}>
                      <div className="w-100 d-flex justify-content-center flex-row gap-4">
                        <Button
                          style={{
                            backgroundColor: "#2C5AB4",
                            width: "200px",
                            fontSize: "15px",
                            fontFamily: "Work Sans",
                            fontWeight: 500,
                          }}
                          onClick={() => handleClick(2)}
                        >
                          Accept
                        </Button>
                        <Button
                          outline
                          style={{
                            width: "200px",
                            backgroundColor: "#FFFFFF",
                            borderColor: "#2C5AB4",
                            color: "#2C5AB4",
                            fontSize: "15px",
                            fontFamily: "Work Sans",
                            fontWeight: 500,
                          }}
                          onClick={() => handleClick(5)}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  ) : null}
                </tr>
                {auditData.auditStatusId === 5 ? null : isReject ? (
                  <tr>
                    <td className="status-table-header">Reject Reason:</td>
                    <td className="status-table-text">
                      <Input
                        className="status-reject-textArea"
                        style={{ borderColor: isEmptyReason ? "red" : "" }}
                        type="textarea"
                        name="text"
                        maxLength={100}
                        value={rejectReason}
                        placeholder="Minimum 100 Characters"
                        onChange={(e) => {
                          setRejectReason(e.target.value);
                          setIsEmptyReason(false);
                        }}
                      />
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  );
};

export default AuditStatus;
