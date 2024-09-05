import moment from "moment";
import React from "react";

const StepProgressReject = ({ auditStatusLog }) => {
  return (
    <div>
      <ul className="list-unstyled multi-steps-reject">
        <li className="">
          <div style={{ marginTop: "21px" }}>
            <p style={{ color: "#FC0A4C", fontSize: "14px" }} className="my-1">
              Requested Date
            </p>
            <p
              style={{
                color: "#FFFFFF",
                fontFamily: "Work sans",
                fontSize: "12px",
                fontWeight: 500,
              }}
              className="m-0"
            >
              {moment(auditStatusLog[0].auditStatusLogDate).format(
                "D MMM YYYY"
              )}
            </p>
            <p
              style={{
                color: "#FFFFFF",
                fontFamily: "Work sans",
                fontSize: "12px",
                fontWeight: 300,
              }}
              className="m-0"
            >
              {moment(auditStatusLog[0].auditStatusLogDate).format("HH.mm A")}{" "}
            </p>
          </div>
        </li>
        <li className="">
          <div style={{ marginTop: "21px" }}>
            <p style={{ color: "#FC0A4C", fontSize: "14px" }} className="my-1">
              Rejected
            </p>
            <p
              style={{
                color: "#FFFFFF",
                fontFamily: "Work sans",
                fontSize: "12px",
                fontWeight: 500,
              }}
              className="m-0"
            >
              {moment(auditStatusLog[auditStatusLog.length-1].auditStatusLogDate).format(
                "D MMM YYYY"
              )}
            </p>
            <p
              style={{
                color: "#FFFFFF",
                fontFamily: "Work sans",
                fontSize: "12px",
                fontWeight: 300,
              }}
              className="m-0"
            >
              {moment(auditStatusLog[auditStatusLog.length-1].auditStatusLogDate).format("HH.mm A")}{" "}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default StepProgressReject;
