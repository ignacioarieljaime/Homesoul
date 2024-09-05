import React from "react";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import moment from "moment";

let statusColors = {
  Completed: "#6DBD45",
  New: "#4C8BF5",
  Accepted: "#46A941",
  "On Going": "#F4AD7E",
  Rejected: "#FC0A4C",
};
const DashboardCard = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: "20px",
        cursor: "pointer",
        padding: 19
      }}
      className="w-100 bg-white"
      onClick={data.auditStatusId === 4 ? () => navigate(`/dashboard/planoption`, { state: data.id }) : null}

      
    >
  <div className="position-relative d-flex flex-column">
    <div style={{ fontWeight: "600", fontSize: 30, color: "#2B2A29", marginBottom: 19 }}>{data?.requestTitle}</div>
    <div
      className="customer-status"
      style={{
        fontSize: "14px",
        fontFamily: "Work Sans",
        top: "10px",
        right: "20px",
        position:"absolute"
      }}
    >
      Status:
      <span
        style={{
          color: statusColors[data.auditStatusName],
          fontWeight: "500",
          paddingLeft: "5px",
        }}
      >
        {data.auditStatusName}
      </span>
    </div>
    <div style={{ fontWeight: "300", fontSize: 22, color: "#2B2A29", marginBottom: 49 }}>
      {data?.reasonForRejection}
    </div>
    <div className="d-flex" style={{ gap: 76 }}>

      <div>
        <p style={{ fontWeight: "500", fontSize: 18, color: "#2B2A29" }} className="m-0">Requested At</p>
        <p style={{ fontWeight: "300", fontSize: 18, color: "#2B2A29" }} className="m-0">{moment(data?.requestedAt).format("D MMM YYYY | HH.mm A")}</p>
      </div>

    </div>
    {data.auditStatusId === 4 ? <div
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
    </div> : null}

  </div>
    </div >
  );
};

export default DashboardCard;
