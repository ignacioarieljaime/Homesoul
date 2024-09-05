import React from "react";

const AuditProgress = ({ activeNumber, nodes }) => {
  return (
    <ul className="list-unstyled multi-steps-audit">
      <li className={`${activeNumber == 1 ? "is-active-audit" : ""}`}></li>
      <li className={`${activeNumber == 2 ? "is-active-audit" : ""}`}></li>
      <li className={`${activeNumber == 3 ? "is-active-audit" : ""}`}></li>
      {nodes?.map((element, index) => (
        <li
          key={index}
          className={`${activeNumber == index + 4 ? "is-active-audit" : ""}`}
        ></li>
      ))}
    </ul>
  );
};

export default AuditProgress;
