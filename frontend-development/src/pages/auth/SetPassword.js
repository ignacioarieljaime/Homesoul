import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import CloseEye from "../../assets/svgs/close-eye.svg";
import OpenEye from "../../assets/svgs/open-eye.svg";
import BushImg from "../../assets/images/bush.png";
import { Field, Form, Formik } from "formik";
import { passwordsInitialValues } from "../../modules/formik/initialValues";
import { passwordsValidationSchema } from "../../modules/formik/validationSchema";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSpinner } from "../../redux/reducers/spinner";

const SetPassword = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  let urlToken = searchParams.get("token");
  useEffect(() => {
    if (!urlToken) {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (value) => {
    try {
      dispatch(setSpinner(true));
      let postData = { ...value, token: urlToken };
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/reset-password`,
        postData
      );
      toast.success(response.data?.responseMessage, {
        position: "top-right",
      });
      dispatch(setSpinner(false));
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Navbar forgotPassword />
      <div className="reset-password" style={{ padding: "133px 0 117px 0" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="reset-password-box" style={{ paddingBottom: 36 }}>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center align-items-center flex-column text-center gap-3 py-1">
                <div
                  style={{
                    fontFamily: "Work Sans SemiBold",
                    fontSize: 26,
                    color: "#2B2A29",
                  }}
                >
                  <p className="m-0">Create New password</p>
                </div>
                <div style={{ width: "70%" }}>
                  <p
                    style={{
                      fontFamily: "Work Sans Regular",
                      fontSize: 16,
                      color: "#707070",
                      lineHeight: "normal",
                      width: "100%",
                    }}
                    className="m-0"
                  >
                    Your New Passwords must be different from previous used
                    passwords
                  </p>
                </div>
                <Formik
                  initialValues={passwordsInitialValues}
                  validationSchema={passwordsValidationSchema}
                  validateOnMount
                  onSubmit={handleSubmit}
                >
                  <Form className="w-100 h-100">
                    <Field name="password">
                      {({ field, form, ...rest }) => {
                        return (
                          <fieldset
                            className="reset-input-container"
                            style={{
                              paddingRight: 20,
                              marginBottom: "8%",
                              border:
                                form.errors?.password && form.touched?.password
                                  ? "1px solid red"
                                  : "1px solid #dfdfdf",
                            }}
                          >
                            <input
                              {...field}
                              {...rest}
                              id="password"
                              placeholder="Password"
                              type={visible1 ? "text" : "password"}
                              tabIndex="3"
                              className="reset-input"
                            />
                            <img
                              src={visible1 ? OpenEye : CloseEye}
                              style={{ height: 20 }}
                              alt="message-icon"
                              onClick={() => setVisible1((prev) => !prev)}
                            />
                          </fieldset>
                        );
                      }}
                    </Field>
                    <Field name="confirmPassword">
                      {({ field, form, ...rest }) => {
                        return (
                          <fieldset
                            className="reset-input-container"
                            style={{
                              paddingRight: 20,
                              marginBottom: "4.5%",
                              border:
                                form.errors?.confirmPassword &&
                                  form.touched?.confirmPassword
                                  ? "1px solid red"
                                  : "1px solid #dfdfdf",
                            }}
                          >
                            <input
                              {...field}
                              {...rest}
                              id="confirmPassword"
                              placeholder="Confirm Password"
                              type={visible2 ? "text" : "password"}
                              tabIndex="3"
                              className="reset-input"
                            />
                            <img
                              src={visible2 ? OpenEye : CloseEye}
                              style={{ height: 20 }}
                              alt="message-icon"
                              onClick={() => setVisible2((prev) => !prev)}
                            />
                          </fieldset>
                        );
                      }}
                    </Field>

                    <div className="mb-2">
                      <p
                        style={{
                          fontFamily: "Work Sans Regular",
                          color: "#707070",
                          fontSize: 16,
                        }}
                        className="m-0"
                      >
                        Both Password Must match
                      </p>
                    </div>
                    <Field>
                      {({ field, form, ...rest }) => {
                        return (
                          <Button
                            {...field}
                            {...rest}
                            type="submit"
                            className="verified-btn mt-2"
                            onClick={() => {
                              if (Object.keys(form.errors).length) {
                                document
                                  .getElementsByName(
                                    Object.keys(form.errors)[0]
                                  )[0]
                                  .focus();
                              }
                            }}
                            style={{
                              fontFamily: "Work Sans Medium",
                              fontSize: 22,
                              color: "#fff",
                              width: "73%",
                              borderRadius: 10,
                              minHeight: 60,
                            }}
                          >
                            Reset Password
                          </Button>
                        );
                      }}
                    </Field>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SetPassword;
