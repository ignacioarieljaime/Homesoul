import React from "react";
import moment from "moment";

const DateInCard = ({ last, date, auditStatusName }) => {
  return (
    <div
      style={{ borderRight: last ? "none" : "2px solid #AEADAD", minWidth: 160 }}
      className="d-flex flex-column px-4 gap-1 justify-content-center dashboard-card-link"
    >
      <p
        style={{
          fontFamily: "Work Sans",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "15px",
          color: "#2B2A29",
        }}
        className="m-0 text-center"
      >
        {auditStatusName} <br />
        {moment(date).format("D MMM YYYY")}
      </p>
      <p
        style={{
          fontFamily: "Work Sans",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "17px",
          color: "#707070",
        }}
        className="m-0 text-center "
      >
        {moment(date).format("HH.mm A")}
      </p>
    </div>
  );
};

export default DateInCard;
