import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Input, Label } from "reactstrap";
import { Button } from "react-bootstrap";
import loginSvg from "../../assets/svgs/login.svg";
import { Link, useNavigate } from "react-router-dom";
import BushImg from "../../assets/images/bush.png";
import LockSvg from "../../assets/svgs/lock.svg";
import MessageSvg from "../../assets/svgs/InputMessage.svg";
import { Field, Form, Formik } from "formik";
import { loginInitialValues } from "../../modules/formik/initialValues";
import { loginValidationSchema } from "../../modules/formik/validationSchema";
import { useDispatch } from "react-redux";
import { userLogIn } from "../../redux/reducers/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (value) => {
    dispatch(userLogIn(value, handleNavigate));
  };
  const handleNavigate = () => {
    navigate(`/dashboard`, { replace: true });
  };

  return (
    <>
      <Navbar />
      <section
        className="top-spacing login userTypes-main pb-0"
        style={{ position: "relative" }}
      >
        <div className="login-container">
          <div className="row m-0">
            <div className="col-4 col-md-12 custom text-container ">
              <div className="login-form-content d-flex flex-column">
                <div>
                  <h3>Start with</h3>
                  <h4 className="m-0"> Homesoul</h4>
                </div>
                <p style={{ marginTop: 57 }}>
                  We're glad to see you again! Whether you're a homeowner
                  seeking sustainable solutions or a professional dedicated to
                  advancing eco-friendly practices, your journey towards a
                  greener future continues here.
                </p>
              </div>
            </div>
            <div
              className="col-4 col-md-12 custom"
              style={{ paddingBottom: 104 }}
            >
              <Formik
                initialValues={loginInitialValues}
                validationSchema={loginValidationSchema}
                validateOnMount
                onSubmit={handleSubmit}
              >
                <Form id="contact" action="" method="post">
                  <div className="enginner-detail-form d-flex flex-column">
                    <h3 className="login-title m-0">Login</h3>
                    <fieldset className="mt-4">
                      <Label
                        style={{
                          fontFamily: "Work Sans Medium",
                          fontSize: 16,
                          color: "#2B2A29",
                          paddingLeft: 7,
                        }}
                        htmlFor="email"
                      >
                        Email
                      </Label>
                      <Field name="email">
                        {({ field, form, ...rest }) => {
                          return (
                            <div
                              className="login-input-container m-0"
                              style={{
                                border:
                                  form.errors?.email && form.touched?.email
                                    ? "1px solid red"
                                    : "1px solid #dfdfdf",
                              }}
                            >
                              <span className="mb-1">
                                <img src={MessageSvg} alt="message-icon" />
                              </span>
                              <Input
                                {...field}
                                {...rest}
                                id="email"
                                placeholder="Email Address"
                                type="text"
                                tabIndex="3"
                                className="login-email-input"
                              />
                            </div>
                          );
                        }}
                      </Field>
                    </fieldset>
                    <fieldset className="mt-4">
                      <Label
                        style={{
                          fontFamily: "Work Sans Medium",
                          fontSize: 16,
                          color: "#2B2A29",
                          paddingLeft: 7,
                        }}
                        htmlFor="email"
                      >
                        Password
                      </Label>
                      <Field name="password">
                        {({ field, form, ...rest }) => {
                          return (
                            <div
                              className="login-input-container m-0"
                              style={{
                                border:
                                  form.errors?.password &&
                                  form.touched?.password
                                    ? "1px solid red"
                                    : "1px solid #dfdfdf",
                              }}
                            >
                              <span className="mb-1">
                                <img src={LockSvg} alt="lock-icon" />
                              </span>
                              <Input
                                {...field}
                                {...rest}
                                id="password"
                                placeholder="Enter Password"
                                type="password"
                                tabIndex="3"
                                className="login-email-input"
                              />
                            </div>
                          );
                        }}
                      </Field>
                    </fieldset>
                    <div
                      className="login-forgot-password"
                      style={{
                        fontFamily: "Work Sans Medium",
                        fontSize: 16,
                        color: "#2C5AB4",
                        margin: "20px 0 23px 0",
                      }}
                    >
                      <Link to={"/forgetPassword"}>Forgot Password</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Field>
                        {({ field, form, ...rest }) => {
                          return (
                            <Button
                              {...field}
                              {...rest}
                              type="submit"
                              onClick={() => {
                                if (Object.keys(form.errors).length) {
                                  document
                                    .getElementsByName(
                                      Object.keys(form.errors)[0]
                                    )[0]
                                    .focus();
                                }
                              }}
                              className="login-submit-button"
                              style={{
                                fontFamily: "Work Sans Medium",
                                fontSize: 22,
                                color: "#fff",
                                width: "73%",
                                borderRadius: 10,
                                minHeight: 60,
                              }}
                            >
                              Login
                            </Button>
                          );
                        }}
                      </Field>
                    </div>
                    <p
                      className="checking-signup-text mb-0"
                      style={{
                        fontFamily: "Work Sans Regular",
                        color: "#2B2A29",
                        fontSize: 16,
                        marginTop: 16,
                      }}
                    >
                      Don't have an account?{" "}
                      <Link to={"/user-type"} style={{ color: "#6DBD45" }}>
                        Get Started
                      </Link>
                    </p>
                  </div>
                </Form>
              </Formik>
            </div>
            <div
              className="col-4 col-md-12 custom p-0"
              style={{ display: "flex", alignItems: "flex-end" }}
            >
              <img
                src={loginSvg}
                alt="img"
                style={{
                  position: "relative",
                  top: 1,
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-100" style={{ position: "absolute", bottom: -1 }}>
          <img src={BushImg} className="w-100" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
