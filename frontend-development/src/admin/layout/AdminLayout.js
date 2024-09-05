import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { useSelector } from "react-redux";
import TopLeftGraphics from "../assets/svgs/graphis/top-left.svg";
import TopRightGraphics from "../assets/svgs/graphis/top-right.svg";
import BottomLeftGraphics from "../assets/svgs/graphis/bottom-left.svg";
import BottomRightGraphics from "../assets/svgs/graphis/bottom-right.svg";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { token, userType } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || userType === null) {
      navigate("/login", { replace: true });
    }
  }, [token, userType]);

  return (
    <div className="admin-layout">
      <Sidebar
        toggleSidebar={toggleSidebar}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div
        className="outlet-margin d-flex justify-content-center position-relative "
        style={{ backgroundColor: userType == 2 ? "#F5F6F8" : "#f4fcf0" }}
      >
        <div
          className="position-fixed w-100 start-0 plant-image-div"
          style={{ height: "100dvh" }}
        >
          {userType == 2 ? null : (
            <>
              <img
                src={TopLeftGraphics}
                style={{ opacity: "0.35", zIndex: "1", width: "12.9%" }}
                className="position-absolute top-0 left-graphics"
                alt="plant"
              />
              <img
                src={TopRightGraphics}
                style={{ opacity: "0.35", zIndex: "1", width: "12.9%" }}
                className="position-absolute top-0 end-0"
                alt="plant"
              />
              <img
                src={BottomLeftGraphics}
                style={{ opacity: "0.35", zIndex: "1", width: "12.9%" }}
                className="position-absolute bottom-0 left-graphics"
                alt="plant"
              />
              <img
                src={BottomRightGraphics}
                style={{ opacity: "0.35", zIndex: "1", width: "12.9%" }}
                className="position-absolute  bottom-0 end-0"
                alt="plant"
              />
            </>
          )}
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className="content-outlet-div"
          style={{ zIndex: 2 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
