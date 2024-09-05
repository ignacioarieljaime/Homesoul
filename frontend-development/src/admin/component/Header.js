import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import headerSvg from "../assets/svgs/header/header-logo.svg";
import {
  resetAudit,
  setIsEdit,
  setIsRefresh,
} from "../../redux/reducers/audit";
import { useDispatch } from "react-redux";

const Header = ({ button, isImage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="w-100 d-flex justify-content-center align-items-center header-main-div">
      {!isImage && <img className="me-4" alt="img" src={headerSvg} />}
      <p
        style={{
          fontFamily: "Work Sans",
          fontSize: "20px",
          margin: 0,
          lineHeight: "22px",
          textAlign: "center",
        }}
        className={`${button && "header-text"}`}
      >
        <span style={{ fontWeight: 600 }}>Welcome to Homesoul:</span> Top Energy
        Saving Ways for You
      </p>
      {button && (
        <Button
          onClick={() => {
            dispatch(setIsEdit(false));
            dispatch(resetAudit());
            navigate("/dashboard/audit-type");
          }}
          style={{
            right: 0,
            backgroundColor: "#2C5AB4",
            borderColor: "#2C5AB4",
            fontFamily: "Work Sans",
            fontSize: "16px",
            paddingTop: "10px",
            paddingBottom: "10px",
            borderRadius: "10px",
          }}
          className="header-button"
        >
          {" "}
          + Create New Audit
        </Button>
      )}
    </div>
  );
};

export default Header;
