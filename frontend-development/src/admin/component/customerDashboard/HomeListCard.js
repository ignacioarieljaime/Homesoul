import React from "react";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const HomeListCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: "20px",
        cursor: "pointer",
        padding: 19,
      }}
      className="w-100 bg-white"
      onClick={() => navigate("propertyAssessment", { state: data?.id })}
    >
      <div className="position-relative d-flex flex-column">
        <div
          style={{
            fontWeight: "600",
            fontSize: 30,
            color: "#2B2A29",
            marginBottom: 19,
          }}
        >
          {data?.title}
        </div>
        <div
          className="customer-status"
          style={{
            fontSize: "14px",
            fontFamily: "Work Sans",
            top: "10px",
            right: "20px",
            position: "absolute",
          }}
        >
          {data?.city},
          <span
            style={{
              fontWeight: "500",
              paddingLeft: "5px",
            }}
          >
            {data?.provinceName}
          </span>
        </div>
        <div
          style={{
            fontWeight: "300",
            fontSize: 22,
            color: "#2B2A29",
            marginBottom: 19,
          }}
        >
          {data?.type}
        </div>
        <div className="d-flex" style={{ gap: 76 }}>
          <div>
            <p
              style={{ fontWeight: "500", fontSize: 18, color: "#2B2A29" }}
              className="m-0"
            >
              {data?.address}
            </p>
            <p
              style={{ fontWeight: "300", fontSize: 18, color: "#2B2A29" }}
              className="m-0"
            ></p>
          </div>
        </div>

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

export default HomeListCard;
