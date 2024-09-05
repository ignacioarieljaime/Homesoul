import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../component/Header";
import { Table } from "react-bootstrap";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSpinner } from "../../../../redux/reducers/spinner";
import moment from "moment";
import { setHome } from "../../../../redux/reducers/audit";

const staticData = [
  {
    assemblyTitle: "R60",
    cost: "-",
  },
  {
    assemblyTitle: "R31",
    cost: "-",
  },
  {
    assemblyTitle: "R31",
    cost: "-",
  },
  {
    assemblyTitle:
      'AGW#02 - Drywall + R22 batt @ 16" o.c. + 7 / 16" OSB + Brick',
    cost: "1.4",
  },
  {
    assemblyTitle:
      'BGW#01 - 8" Concrete + R20 Full Height Blankets + no finish',
    cost: "0.6",
  },
  {
    assemblyTitle: "-",
    cost: "-",
  },
  {
    assemblyTitle: "N/A",
    cost: "-",
  },
  {
    assemblyTitle: "N/A",
    cost: "-",
  },
  {
    assemblyTitle: "U1.61 / ER25",
    cost: "1.8",
  },
  {
    assemblyTitle: "U2.8",
    cost: "-",
  },
  {
    assemblyTitle: "Level 1 (ACH 3.0)",
    cost: "0.0",
  },
  {
    assemblyTitle: "75% ≤ SRE < 84%",
    cost: "3.2",
  },
  {
    assemblyTitle:
      "Gas- or oil-fired Residential Storage-type Service Water Heater (EF ≥ 0.80 or UEF ≥ 0.83)",
    cost: "5.4",
  },

  {
    assemblyTitle: "N/A",
    cost: "-",
  },
  {
    assemblyTitle: "96% AFUE",
    cost: "0.4",
  },
  {
    assemblyTitle: "13 SEER",
    cost: "-",
  },
  {
    assemblyTitle: "42% Efficiency",
    cost: "2.4",
  },
];

const PlanOption = () => {
  const { state: auditId } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [optionsLength, setOptionsLength] = useState(null);

  const handleRequest = async () => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/audit/get-audit-result`,
        {
          auditId: auditId,
        },
        { headers }
      );
      setPlanData(response.data.responseData);
      setOptionsLength(response.data.responseData.options.length - 1);
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate("/login");
      } else {
        dispatch(setHome(error.response.data?.responseData || { auditId: 0 }));
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
        navigate("/dashboard/status", { state: auditId, replace: true });
      }
    }
    dispatch(setSpinner(false));
  };

  const currencyFormate = useCallback((value) => {
    let formateValue = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
    return formateValue;
  }, []);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    handleRequest();
  }, [auditId]);


  return (
    planData && (
      <div className="">
        <Header />
        <div className="d-flex justify-content-center flex-column mb-5 ">
          <p
            style={{
              fontSize: "30px",
              color: "#F4AD7E",
              fontFamily: "Work Sans",
              fontWeight: 600,
              marginTop: "-32px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Top 3 options as per least cost.
          </p>
          <div className="d-flex justify-content-center mt-2">
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "24px",
                textAlign: "center",
                width: "60%",
                color: "#2B2A29",
                fontFamily: "Work Sans",
                fontWeight: 500,
                lineHeight: "30px",
              }}
            >
              Prescriptive Optimization Tool Builder Option Package Generator
              Created By The Combined Effort From:
            </p>
          </div>

          <div
            className="plan-option-container"
            style={{
              borderRadius: "10px",
              backgroundColor: "#E3EEDD",
              padding: "30px",
              paddingBottom: "10px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              className="plan-option-sub-container"
            >
              <div
                style={{ width: "33.33%" }}
                className="plan-table-responsive"
              >
                <Table
                  style={{ backgroundColor: "#E3EEDD !important" }}
                  borderless
                  className="plan-table-upper m-0"
                >
                  <tbody>
                    <tr>
                      <td className="plan-option-table-main-text">
                        Project Name:
                      </td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.projectName}
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">Address:</td>
                      <td className="plan-option-table-below-text text-break">
                        {planData?.audit_data?.addressLine1}{" "}
                        {planData?.audit_data?.addressLine2}
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="plan-option-table-main-text">
                        Postal Code:
                      </td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.pincode1}
                      </td>
                    </tr> */}
                    <tr>
                      <td className="plan-option-table-main-text">Province:</td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.province}
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">
                        Weather Station:
                      </td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.weatherStation}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div style={{ width: "22%" }} className="plan-table-responsive">
                <Table
                  style={{ backgroundColor: "transparent" }}
                  borderless
                  className="plan-table-upper m-0"
                >
                  <tbody>
                    <tr>
                      <td className="plan-option-table-main-text">
                        NBC Climate Zone:
                      </td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.nbcClimateZone}
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">
                        NBC Prescriptive Tier:
                      </td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.nbcPrescriptiveTier}
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">
                        House Type:
                      </td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.houseType}
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">FDWR%:</td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.fdwrPercent}
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">
                        Created on:
                      </td>
                      <td className="plan-option-table-below-text">
                        {moment(planData?.audit_data?.createdOn).format(
                          "D/M/YYYY"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div style={{ width: "28%" }} className="plan-table-responsive">
                <Table
                  style={{ backgroundColor: "transparent" }}
                  borderless
                  className="plan-table-upper m-0"
                >
                  <tbody>
                    <tr>
                      <td className="plan-option-table-main-text">
                        Volume (ft³):
                      </td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.volume} (ft³)
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">Credit:</td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.credit}
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">HDD:</td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.hdd}
                      </td>
                    </tr>
                    <tr>
                      <td className="plan-option-table-main-text">
                        ECP Required:
                      </td>
                      <td className="plan-option-table-below-text">
                        {planData?.audit_data?.ecpRequired} (Including Credit)
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-auto">
            <Table borderless className="plan-table">
              <tbody>
                <tr>
                  <td></td>
                  <td style={{ width: "87%", paddingRight: "25px" }}>
                    <div className="d-flex gap-3 flex-row">
                      <div
                        style={{
                          width: "20%",
                          textAlign: "center",
                          fontSize: "16px",
                          fontFamily: "Work Sans",
                          fontWeight: 500,
                          alignContent: "center",
                          alignItems: "center",
                          paddingBottom: "0px",
                          paddingTop: "10px",
                          lineHeight: "20px",
                          minWidth: 214,
                        }}
                      >
                        <p>"OBC 2017 Reference A1 (Prescriptive)</p>
                      </div>
                      {planData?.options.map((option, index) => {
                        if (index !== 0) {
                          return (
                            <div style={{ width: "28%", minWidth: 300 }}>
                              <Button
                                style={{
                                  width: "100%",
                                  backgroundColor: "#2C5AB4",
                                  fontSize: "26px",
                                  fontFamily: "Work Sans",
                                  fontWeight: 600,
                                  padding: "10px",
                                  borderRadius: "9px",
                                }}
                              >
                                OPTIONS 0{index}
                              </Button>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ width: "87%", paddingRight: "25px" }}>
                    <div className="d-flex gap-3 flex-row">
                      <div
                        style={{
                          width: "20%",
                          minWidth: 214,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ width: "87%", paddingRight: "25px" }}>
                    <div className="d-flex gap-3 flex-row">
                      <div
                        style={{
                          width: "20%",
                          minWidth: 214,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
                {/* Description , ECP , Cost */}
                <tr>
                  <td></td>
                  <td style={{ width: "87%", paddingRight: "25px" }}>
                    <div className="d-flex gap-3 flex-row">
                      {planData?.options.map((option, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              width: index === 0 ? "20%" : "28%",
                              backgroundColor: "#E3EEDD",
                              borderRadius: "10px",
                              minWidth: index === 0 ? 214 : 300,
                              textWrap: index === 0 ? "nowrap" : "balance",
                            }}
                          >
                            <Table borderless>
                              <div
                                style={{
                                  paddingTop: "10px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      className="d-flex"
                                      style={{
                                        fontSize: "16px",
                                        fontFamily: "Work Sans",
                                        color: "#2B2A29",
                                        fontWeight: 600,
                                        textAlign: "right",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      Description
                                    </td>
                                    <td
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Work Sans",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      ECM Index: {option?.ecm_index} <br />{" "}
                                      {"\u00A0"}
                                    </td>
                                  </tr>

                                  <tr style={{ marginBottom: "20px" }}>
                                    <td
                                      style={{
                                        fontSize: "16px",
                                        fontFamily: "Work Sans",
                                        color: "#2B2A29",
                                        fontWeight: 600,
                                        textAlign: "right",
                                      }}
                                    >
                                      ECP
                                    </td>
                                    <td
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Work Sans",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      {option?.ecp}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{
                                        fontSize: "16px",
                                        fontFamily: "Work Sans",
                                        color: "#2B2A29",
                                        fontWeight: 600,
                                        textAlign: "right",
                                      }}
                                    >
                                      Cost
                                    </td>
                                    <td
                                      style={{
                                        fontSize: "24px",
                                        fontFamily: "Work Sans",
                                        color: "#1EAF67",
                                        paddingLeft: "10px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {currencyFormate(Number(option?.cost))}
                                    </td>
                                  </tr>
                                </tbody>
                              </div>
                            </Table>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
                {/* descrption line  */}
                <tr style={{ paddingTop: "100px" }}>
                  <td></td>
                  <td style={{ width: "87%", paddingRight: "25px" }}>
                    <div className="d-flex gap-3 flex-row">
                      <div
                        style={{
                          width: "20%",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          minWidth: 214,
                        }}
                      >
                        <div
                          style={{ padding: "10px" }}
                          className="d-flex flex-row "
                        >
                          <div
                            className="d-flex"
                            style={{
                              fontSize: "16px",
                              fontFamily: "Work Sans",
                              color: "#2B2A29",
                              fontWeight: 600,
                              textAlign: "right",
                              alignItems: "flex-start",
                              width: "60%",
                            }}
                          >
                            Description
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontFamily: "Work Sans",
                              color: "#2B2A29",
                              fontWeight: 600,
                              textAlign: "center",
                              alignItems: "flex-start",
                              width: "40%",
                            }}
                          >
                            ECP
                          </div>
                        </div>
                      </div>
                      {planData?.options.map((option, index) => {
                        if (index !== 0) {
                          return (
                            <div
                              style={{
                                width: "28%",
                                minWidth: 300,
                                backgroundColor: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              <div
                                style={{ padding: "10px" }}
                                className="d-flex flex-row "
                              >
                                <div
                                  className="d-flex"
                                  style={{
                                    fontSize: "16px",
                                    fontFamily: "Work Sans",
                                    color: "#2B2A29",
                                    fontWeight: 600,
                                    textAlign: "right",
                                    alignItems: "flex-start",
                                    width: "60%",
                                  }}
                                >
                                  Description
                                </div>
                                <div
                                  style={{
                                    fontSize: "16px",
                                    fontFamily: "Work Sans",
                                    color: "#2B2A29",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    alignItems: "flex-start",
                                    width: "20%",
                                  }}
                                >
                                  ECP
                                </div>
                                <div
                                  style={{
                                    fontSize: "16px",
                                    fontFamily: "Work Sans",
                                    color: "#2B2A29",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    alignItems: "flex-start",
                                    width: "20%",
                                  }}
                                >
                                  Cost
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </td>
                </tr>
                {/* BUILDING ENVELOPES */}
                <tr>
                  <td colSpan={2}>
                    <p
                      style={{
                        color: "#2B2A29",
                        fontSize: "18px",
                        fontFamily: "Work Sans",
                        fontWeight: "bold",
                      }}
                    >
                      BUILDING ENVELOPES
                    </p>
                  </td>
                </tr>
                {/* Building envelope table */}

                {planData?.categories.map((data, index) => {
                  let parentIndex = index;
                  return (
                    <tr key={index}>
                      <td style={{ verticalAlign: "middle" }}>
                        <p
                          style={{
                            fontSize: "14px",
                            paddingTop: "10px",
                            lineHeight: "normal",
                          }}
                          className="m-0 p-0"
                        >
                          {data?.category_title}
                        </p>
                      </td>
                      <td style={{ width: "87%", paddingRight: "25px" }}>
                        <div className="d-flex gap-3 flex-row">
                          <div
                            style={{
                              width: "20%",
                              minWidth: 214,
                              backgroundColor: "#E3EEDD",
                              borderTopLeftRadius:
                                parentIndex == 0 ? "10px" : "0px",
                              borderTopRightRadius:
                                parentIndex == 0 ? "10px" : "0px",
                              borderBottomLeftRadius:
                                parentIndex == planData?.categories.length - 1
                                  ? "10px"
                                  : "0px",
                              borderBottomRightRadius:
                                parentIndex == planData?.categories.length - 1
                                  ? "10px"
                                  : "0px",
                            }}
                          >
                            <div
                              style={{ padding: "10px" }}
                              className="d-flex flex-row "
                            >
                              <div
                                className="d-flex"
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Work Sans",
                                  color: "#2B2A29",
                                  fontWeight: 500,
                                  textAlign: "left",
                                  alignItems: "flex-start",
                                  width: "60%",
                                }}
                              >
                                {staticData[index]?.assemblyTitle}
                              </div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Work Sans",
                                  color: "#2B2A29",
                                  fontWeight: 500,
                                  textAlign: "center",
                                  alignItems: "flex-start",
                                  width: "40%",
                                }}
                              >
                                {staticData[index]?.cost}
                              </div>
                            </div>
                          </div>
                          {data?.assemblies.map((assembliesData, index) => {
                            if (index < optionsLength) {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    width: "28%",
                                    minWidth: 300,
                                    backgroundColor: "#E3EEDD",
                                    borderTopLeftRadius:
                                      parentIndex == 0 ? "10px" : "0px",
                                    borderTopRightRadius:
                                      parentIndex == 0 ? "10px" : "0px",
                                    borderBottomLeftRadius:
                                      parentIndex ==
                                      planData?.categories.length - 1
                                        ? "10px"
                                        : "0px",
                                    borderBottomRightRadius:
                                      parentIndex ==
                                      planData?.categories.length - 1
                                        ? "10px"
                                        : "0px",
                                  }}
                                >
                                  <div
                                    style={{ padding: "10px" }}
                                    className="d-flex flex-row "
                                  >
                                    <div
                                      className="d-flex plan-option-data"
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Work Sans",
                                        color: "#2B2A29",
                                        fontWeight: 500,
                                        alignItems: "flex-start",
                                        width: "60%",
                                      }}
                                    >
                                      {assembliesData?.assemblyTitle}
                                    </div>
                                    <div
                                      className="plan-option-data"
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Work Sans",
                                        color: "#2B2A29",
                                        fontWeight: 500,
                                        textAlign: "center",
                                        alignItems: "flex-start",
                                        width: "20%",
                                      }}
                                    >
                                      {assembliesData?.ecp}
                                    </div>
                                    <div
                                      className="plan-option-data"
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Work Sans SemiBold",
                                        color: "#2B2A29",
                                        textAlign: "center",
                                        alignItems: "flex-start",
                                        width: "20%",
                                      }}
                                    >
                                      {isNaN(Number(assembliesData?.cost))
                                        ? "-"
                                        : currencyFormate(
                                            Number(assembliesData?.cost)
                                          )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  );
};

export default PlanOption;
