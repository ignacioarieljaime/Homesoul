import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "reactstrap";
import DateInCard from "./DateInCard";
import { useNavigate } from "react-router-dom";
let statusColors = {
  Completed: "#6DBD45",
  New: "#4C8BF5",
  Accepted: "#46A941",
  "On Going": "#F4AD7E",
  Rejected: "#FC0A4C",
};

const DashboardCard = ({ details }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: "20px",
        cursor: "pointer",
      }}
      className="w-100 bg-white px-2 py-1"
      onClick={() => {
        navigate("/dashboard/status", { state: details.id });
      }}
    >
      <div className="position-relative dashboard-table">
        <div
          className="position-absolute"
          style={{
            fontSize: "14px",
            fontFamily: "Work Sans",
            top: "10px",
            right: "20px",
          }}
        >
          Status:
          <span
            style={{
              color: statusColors[details.auditStatusName],
              fontWeight: "500",
              paddingLeft: "5px",
            }}
          >
            {details.auditStatusName}
          </span>
        </div>
        <Table borderless className=" w-75 dashboard-card-audit-report">
          <tbody>
            <tr>
              <td
                className="dashboard-card-header"
                style={{ textWrap: "nowrap" }}
              >
                Customer Name:
              </td>
              <td className="dashboard-card-text">
                {details.firstName} {details.lastName}
              </td>
            </tr>
            <tr>
              <td className="dashboard-card-header">Address:</td>
              <td className="dashboard-card-text">
                {details.addressLine1} {details.addressLine2}
              </td>
            </tr>
            <tr>
              <td className="dashboard-card-header">Date:</td>
              <td className="dashboard-card-text">
                <div
                  className="dashboard-date"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // flexWrap: "wrap",
                    gap: "2px",
                  }}
                >
                  {details?.auditStatusLog.map((date, index) => {
                    if (details?.auditStatusId == 5) {
                      if (
                        date?.auditStatusId == 1 ||
                        date?.auditStatusId == 5
                      ) {
                        return (
                          <DateInCard
                            key={index}
                            auditStatusName={date.auditStatusName}
                            date={date.auditStatusLogDate}
                            last={index === details.auditStatusLog.length - 1}
                          />
                        );
                      }
                    } else {
                      return (
                        <DateInCard
                          key={index}
                          auditStatusName={date.auditStatusName}
                          date={date.auditStatusLogDate}
                          last={index === details.auditStatusLog.length - 1}
                        />
                      );
                    }
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td className="dashboard-card-header">Service:</td>
              <td className="dashboard-card-text">
                {details?.auditAssemblySelection?.map((element, index) => {
                  if (index === 3) {
                    return `+${details.auditAssemblySelection.length - 3} More`;
                  } else if (index > 3) {
                    return null;
                  } else {
                    return `${element?.categoryName},`;
                  }
                })}
              </td>
            </tr>
          </tbody>
        </Table>
        <div
          className="position-absolute"
          style={{
            bottom: "0px",
            right: "20px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            color="#2C5AB4"
            icon={faCircleChevronRight}
            className="fa-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
