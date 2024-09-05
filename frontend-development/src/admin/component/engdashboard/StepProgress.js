import React from "react";
import moment from "moment";

const StepProgress = ({ auditStatusLog }) => {
  return (
    <ul className="list-unstyled multi-steps">
      <li className={auditStatusLog.length === 1 && auditStatusLog[0].auditStatusId !== 4 ? "is-active" : ""}>
        <div style={{ marginTop: "21px" }}>
          <p style={{ color: "#6DBD45", fontSize: "14px" }} className="my-1">
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
            {moment(auditStatusLog[0].auditStatusLogDate).format("D MMM YYYY")}
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
      <li
        className={
          auditStatusLog[auditStatusLog.length - 1]?.auditStatusId === 2
            ? "is-active"
            : ""
        }
      >
        <div style={{ marginTop: "21px" }}>
          <p style={{ color: "#6DBD45", fontSize: "14px" }} className="my-1">
            Accept
          </p>
          {auditStatusLog.map((audit) => {
            if (audit?.auditStatusId === 2) {
              return (
                <React.Fragment key={audit.auditStatusId}>
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Work sans",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                    className="m-0"
                  >
                    {moment(audit.auditStatusLogDate).format("D MMM YYYY")}
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
                    {moment(audit.auditStatusLogDate).format("HH.mm A")}
                  </p>
                </React.Fragment>
              );
            } else {
              return null;
            }
          })}
        </div>
      </li>
      <li
        className={
          auditStatusLog[auditStatusLog.length - 1]?.auditStatusId === 3
            ? "is-active"
            : ""
        }
      >
        <div style={{ marginTop: "21px" }}>
          <p style={{ color: "#6DBD45", fontSize: "14px" }} className="my-1">
            On Going
          </p>
          {auditStatusLog.map((audit) => {
            if (audit?.auditStatusId === 3) {
              return (
                <React.Fragment key={audit.auditStatusId}>
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Work sans",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                    className="m-0"
                  >
                    {moment(audit.auditStatusLogDate).format("D MMM YYYY")}
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
                    {moment(audit.auditStatusLogDate).format("HH.mm A")}
                  </p>
                </React.Fragment>
              );
            } else {
              return null;
            }
          })}
        </div>
      </li>
      <li
      >
        <div style={{ marginTop: "21px" }}>
          <p style={{ color: "#6DBD45", fontSize: "14px" }} className="my-1">
            Completed
          </p>
          {auditStatusLog.map((audit) => {
            if (audit?.auditStatusId === 4) {
              return (
                <React.Fragment key={audit.auditStatusId}>
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Work sans",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                    className="m-0"
                  >
                    {moment(audit.auditStatusLogDate).format("D MMM YYYY")}
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
                    {moment(audit.auditStatusLogDate).format("HH.mm A")}
                  </p>
                </React.Fragment>
              );
            } else {
              return null;
            }
          })}
        </div>
      </li>
      <li
         className={
          auditStatusLog[auditStatusLog.length - 1]?.auditStatusId === 4
            ? "is-active"
            : ""
        }
      >
        <div style={{ marginTop: "21px" }}>
          <p style={{ color: "#6DBD45", fontSize: "14px" }} className="my-1">
            Report Generated
          </p>
          {auditStatusLog.map((audit) => {
            if (audit?.auditStatusId === 6) {
              return (
                <React.Fragment key={audit.auditStatusId}>
                  <p
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Work sans",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                    className="m-0"
                  >
                    {moment(audit.auditStatusLogDate).format("D MMM YYYY")}
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
                    {moment(audit.auditStatusLogDate).format("HH.mm A")}
                  </p>
                </React.Fragment>
              );
            } else {
              return null;
            }
          })}
        </div>
      </li>
    </ul>
  );
};

export default StepProgress;
