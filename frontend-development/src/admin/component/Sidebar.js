import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../assets/images/logo.svg";
import SidebarLink from "./SidebarLink";
import dashboard from "../assets/svgs/nonActive/dashboard.svg";
import activeDashboard from "../assets/svgs/active/dashboard.svg";
import categories from "../assets/svgs/nonActive/category.svg";
import activeCategories from "../assets/svgs/active/category.svg";
import tutorial from "../assets/svgs/nonActive/tutorial.svg";
import activeTutorial from "../assets/svgs/active/tutorial.svg";
import profile from "../assets/svgs/nonActive/profile.svg";
import activeProfile from "../assets/svgs/active/profile.svg";
import logout from "../assets/svgs/nonActive/logout.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogOut } from "../../redux/reducers/auth";

const Sidebar = ({ isOpen, toggleSidebar, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const { userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  const handleLogout = () => {
    dispatch(userLogOut(handleNavigate));
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className={`nav-side-menu ${isOpen ? "open" : ""}`}>
      <div className="brand">
        <img className="logo-img" src={logo} alt="Brand Logo" />
      </div>
      <div className="logo-text-div">
        <p
          className="logo-text"
          style={{
            fontFamily: "Poppins",
          }}
        >
          HOMESOUL
        </p>
      </div>

      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon
          className="fa-2x"
          icon={isOpen ? faXmark : faBars}
        />
      </div>

      <div className="menu-list">
        <div id="menu-content" className="menu-content collapse out">
          <div className="logo-link-main-div">
            <div className="logo-link-main">
              <div>
                <SidebarLink
                  path={`/dashboard`}
                  linkLabel="Dashboard"
                  activeImg={activeDashboard}
                  img={dashboard}
                />
              </div>
              {userType == '2' ?null
              // <>
              //     {" "}
              //     <div className="link-margin">
              //       <SidebarLink
              //         path="/categories"
              //         linkLabel="Categories"
              //         secondaryLabel=""
              //         img={categories}
              //         activeImg={activeCategories}
              //       />
              //     </div>
              //     <div className="link-margin">
              //       <SidebarLink
              //         path="/tutorial"
              //         linkLabel="Tutorial"
              //         img={tutorial}
              //         activeImg={activeTutorial}
              //       />
              //     </div>
              //   </> 
                 : (
                <>
                  {" "}
                  <div className="link-margin">
                    <SidebarLink
                      path="/service"
                      linkLabel="Service Area"
                      secondaryLabel="Update Details"
                      img={categories}
                      activeImg={activeCategories}
                    />
                  </div>
                  {/* <div className="link-margin">
                    <SidebarLink
                      path="/my-plan"
                      linkLabel="My Plan"
                      img={tutorial}
                      activeImg={activeTutorial}
                    />
                  </div> */}
                </>
              )}
              <div className="link-margin">
                <SidebarLink
                  path="/profile"
                  linkLabel="Your Profile"
                  img={profile}
                  activeImg={activeProfile}
                />
              </div>
            </div>
            <div onClick={handleLogout} className="logout-div">
              <SidebarLink
                path="/"
                linkLabel="Logout"
                isLogout
                img={logout}
                activeImg={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
