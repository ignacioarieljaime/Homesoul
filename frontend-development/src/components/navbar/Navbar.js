import React from "react";
import logo from "../../assets/svgs/main-logo.png";
import UserLogin from "../../assets/svgs/user-login.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ forgotPassword }) => {
  const navigate = useNavigate();

  const handleScroll = (section) => {
    navigate("/", { state: { scrollTo: section } });
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-xl navbar-light bg-white">
          <div
            className="container newContainer"
            style={{ padding: "0 10px 0 0" }}
          >
            <a className="navbar-brand" href="/">
              <img src={logo} alt="..." className="navLogo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div
                className={
                  forgotPassword
                    ? "navbar-nav ms-lg-auto"
                    : "navbar-nav mx-lg-auto"
                }
              >
                <a
                  className="nav-item nav-link"
                  style={{
                    fontSize: forgotPassword ? "22px" : "18px",
                    color: forgotPassword ? "#2B2A29" : "inherit",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll("about-us");
                  }}
                  // href="/#about-us"
                  aria-current="page"
                >
                  About Us
                </a>
                <a
                  className="nav-item nav-link"
                  style={{
                    fontSize: forgotPassword ? "22px" : "18px",
                    color: forgotPassword ? "#2B2A29" : "inherit",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll("contact-us");
                  }}
                  // href="#contact-us"
                >
                  Contact Us
                </a>
                <a
                  className="nav-item nav-link"
                  style={{
                    fontSize: forgotPassword ? "22px" : "18px",
                    color: forgotPassword ? "#2B2A29" : "inherit",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll("our-solutions");
                  }}
                  // href="#"
                >
                  Our Solutions
                </a>
                {forgotPassword ? null : (
                  <a
                    className="nav-item nav-link"
                    style={{ marginRight: 0 }}
                    href="#"
                  >
                    Blog
                  </a>
                )}
              </div>

              <div className="d-flex align-items-lg-center mt-3 mb-2 mt-lg-0">
                <a
                  href="/user-type"
                  className="btn btn-sm btn-primary w-full w-lg-auto get-started-btn"
                >
                  Get Started
                </a>
              </div>
              <div className="d-flex align-items-center mt-3 mb-2 mt-lg-0 ">
                {forgotPassword ? (
                  <>
                    <span className="login-btn2 ">
                      <img src={UserLogin} alt="user-login" />
                    </span>
                    <Link
                      to={"/login"}
                      className="mb-0  "
                      style={{
                        color: "#000000",
                        fontFamily: "Work Sans Medium",
                        fontSize: 22,
                        marginLeft: 6,
                        textDecoration: "none",
                      }}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="btn btn-sm btn-primary w-full w-lg-auto login-btn"
                  >
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
