import React from "react";

const MenuButton = ({
  mainText,
  subText,
  isActive,
  badge,
  beforeActive,
  textColor,
  last,
  onClick,
}) => {
  return (
    <div
      style={{
        backgroundColor: isActive ? "#2C5AB4" : "transparent",
        borderRadius: "15px",
        padding: "10px 0px",
        cursor:"pointer"
      }}
      className="dashboard-menu-link"
      onClick={onClick}
    >
      <div
        style={{
          borderRight:
            isActive || last || beforeActive ? "none" : "2px solid #707070",
        }}
        className="d-flex flex-column px-4  justify-content-center dashboard-menu-link-sub"
      >
        <p
          style={{
            fontFamily: "Work Sans",
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "21px",
          }}
          className="text-white m-0 text-center"
        >
          <span style={{ position: "relative" }}>
            {" "}
            {mainText}{" "}
            {badge && (
              <span
                style={{
                  backgroundColor: "#1EAF67",
                  height: "7px",
                  width: "7px",
                  borderRadius: "100%",
                  position: "absolute",
                  right: -10,
                  top: 2,
                }}
              >
                {" "}
              </span>
            )}
          </span>
        </p>
        <p
          style={{
            fontFamily: "Work Sans",
            color: textColor ? textColor : "white",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "17px",
          }}
          className="m-0 text-center "
        >
          {subText}
        </p>
      </div>
    </div>
  );
};

export default MenuButton;
