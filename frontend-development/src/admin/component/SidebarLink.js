import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({
  path,
  img,
  activeImg,
  imgClass,
  linkClass,
  linkLabel,
  secondaryLabel,
  isLogout,
}) => {
  const [activeLink, setActiveLink] = useState(false);

  const location = useLocation();

  function getValueFromUrl(url) {
    var parts = url.split("/");

    return parts[1];
  }

  useEffect(() => {
    setActiveLink(location.pathname.includes(getValueFromUrl(path)));
  }, [location, path]);

  const handleClick = (event) => {
    if (isLogout) {
      event.preventDefault(); 
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <img
        style={{ height: "20px", width: "15px", marginTop: "2px" }}
        className={imgClass}
        src={activeLink ? activeImg : img}
        alt="img"
      />
      {isLogout === undefined ? (
        <NavLink
          className={
            activeLink ? "active-sidebar-link" : "pending-sidebar-link"
          }
          to={path}
          onClick={handleClick}
        >
          {linkLabel}
          <div
            style={{
              fontSize: "12px",
              color: "#FF9F9F",
              paddingTop: "0px",
              lineHeight: "7px",
            }}
          >
            {secondaryLabel}
          </div>
        </NavLink>
      ) : (
        <div style={{ cursor: "pointer" }} className="pending-sidebar-link">
          {linkLabel}
          <div
            style={{
              fontSize: "12px",
              color: "#FF9F9F",
              paddingTop: "0px",
              lineHeight: "7px",
            }}
          >
            {secondaryLabel}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
