/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import BushImg from "../../assets/images/bush.png";
import { Formik, Form, Field } from "formik";
import { professionalValidationSchema } from "../../modules/formik/validationSchema";
import { professionalInitialValues } from "../../modules/formik/initialValues";
import { useDispatch } from "react-redux";
import { userSignUp } from "../../redux/reducers/auth";
import MessageSvg from "../../assets/svgs/InputMessage.svg";
import { Input } from "reactstrap";
import { setSpinner } from "../../redux/reducers/spinner";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [province, setProvince] = useState(null);

  const handleSubmit = (value) => {
    dispatch(userSignUp(value, handleNavigate));
  };

  const handleNavigate = () => {
    navigate("/signupsuccess");
  };

  const getProvince = async () => {
    dispatch(setSpinner(true));
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-regions`
      );
      setProvince(result?.data?.responseData);
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };

  useEffect(() => {
    getProvince();
  }, []);

  return (
    <>
      <Navbar />
      <div className="sign-up-detail" style={{ padding: "30px 0 47px 0" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="enginner-detail-form">
            <div className="row">
              <div className="col-md-12">
                <Formik
                  initialValues={professionalInitialValues}
                  validationSchema={professionalValidationSchema}
                  validateOnMount
                  onSubmit={handleSubmit}
                >
                  <Form id="contact" action="" method="post">
                    <h3>Professional Details</h3>
                    <h4>Create an account to see your recommendations</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <fieldset>
                          <label htmlFor="firstName">First Name</label>

                          <Field name="firstName">
                            {({ field, form, ...rest }) => {
                              return (
                                <>
                                  <input
                                    {...field}
                                    {...rest}
                                    type="text"
                                    tabIndex="1"
                                    id="firstName"
                                    style={{
                                      border:
                                        form.errors?.firstName &&
                                        form.touched?.firstName
                                          ? "1px solid red"
                                          : "1px solid #dfdfdf",
                                    }}
                                  />
                                </>
                              );
                            }}
                          </Field>
                        </fieldset>
                      </div>
                      <div className="col-md-6">
                        <fieldset>
                          <label htmlFor="lastName">Last Name</label>
                          <Field name="lastName">
                            {({ field, form, ...rest }) => {
                              return (
                                <input
                                  {...field}
                                  {...rest}
                                  id="lastName"
                                  type="text"
                                  tabIndex="2"
                                  style={{
                                    border:
                                      form.errors?.lastName &&
                                      form.touched?.lastName
                                        ? "1px solid red"
                                        : "1px solid #dfdfdf",
                                  }}
                                />
                              );
                            }}
                          </Field>
                        </fieldset>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <fieldset style={{ position: "relative" }}>
                          <label htmlFor="email">Email ID</label>
                          <Field name="emailID">
                            {({ field, form, meta, ...rest }) => {
                              return (
                                <>
                                  {field.value === "" && !isFocused && (
                                    <span
                                      style={{
                                        position: "absolute",
                                        bottom: 14,
                                        left: 20,
                                      }}
                                    >
                                      <img
                                        src={MessageSvg}
                                        style={{ height: 10.5, width: 16 }}
                                        alt="email"
                                      />
                                    </span>
                                  )}
                                  <input
                                    {...field}
                                    {...rest}
                                    id="email"
                                    type="text"
                                    tabIndex="3"
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={(e) => {
                                      setIsFocused(false);
                                      field.onBlur(e);
                                    }}
                                    style={{
                                      border:
                                        form.errors?.emailID &&
                                        form.touched?.emailID
                                          ? "1px solid red"
                                          : "1px solid #dfdfdf",
                                    }}
                                  />
                                </>
                              );
                            }}
                          </Field>
                        </fieldset>
                      </div>
                      <div className="col-md-6">
                        <fieldset>
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <Field name="phoneNo">
                            {({ field, form, ...rest }) => {
                              return (
                                <input
                                  {...field}
                                  {...rest}
                                  id="phoneNumber"
                                  placeholder="0000 00 00 00"
                                  type="tel"
                                  tabIndex="4"
                                  className="signup-input"
                                  style={{
                                    border:
                                      form.errors?.phoneNo &&
                                      form.touched?.phoneNo
                                        ? "1px solid red"
                                        : "1px solid #dfdfdf",
                                  }}
                                />
                              );
                            }}
                          </Field>
                        </fieldset>
                      </div>
                    </div>
                    <fieldset>
                      <label htmlFor="password">Password</label>
                      <Field name="password">
                        {({ field, form, ...rest }) => {
                          return (
                            <input
                              {...field}
                              {...rest}
                              id="password"
                              placeholder="Password"
                              type="password"
                              tabIndex="5"
                              className="signup-input"
                              style={{
                                border:
                                  form.errors?.password &&
                                  form.touched?.password
                                    ? "1px solid red"
                                    : "1px solid #dfdfdf",
                              }}
                            />
                          );
                        }}
                      </Field>
                    </fieldset>
                    <fieldset>
                      <label htmlFor="confirm">Confirm Password</label>
                      <Field name="confirmPassword">
                        {({ field, form, ...rest }) => {
                          return (
                            <input
                              {...field}
                              {...rest}
                              id="confirm"
                              placeholder="Confirm Password"
                              type="password"
                              tabIndex="6"
                              className="signup-input"
                              style={{
                                border:
                                  form.errors?.confirmPassword &&
                                  form.touched?.confirmPassword
                                    ? "1px solid red"
                                    : "1px solid #dfdfdf",
                              }}
                            />
                          );
                        }}
                      </Field>
                    </fieldset>
                    <fieldset>
                      <label htmlFor="address1">Address 1</label>
                      <Field name="addressLine1">
                        {({ field, form, ...rest }) => {
                          return (
                            <input
                              {...field}
                              {...rest}
                              id="address1"
                              placeholder="Flat / Plot / Apartment"
                              className="signup-input"
                              type="text"
                              tabIndex="7"
                              style={{
                                border:
                                  form.errors?.addressLine1 &&
                                  form.touched?.addressLine1
                                    ? "1px solid red"
                                    : "1px solid #dfdfdf",
                              }}
                            />
                          );
                        }}
                      </Field>
                    </fieldset>
                    <fieldset>
                      <label htmlFor="address2">Address 2</label>
                      <Field name="addressLine2">
                        {({ field, form, ...rest }) => {
                          return (
                            <input
                              {...field}
                              {...rest}
                              id="address2"
                              placeholder="Streets / Road / State"
                              className="signup-input"
                              type="text"
                              tabIndex="8"
                              style={{
                                border:
                                  form.errors?.addressLine2 &&
                                  form.touched?.addressLine2
                                    ? "1px solid red"
                                    : "1px solid #dfdfdf",
                              }}
                            />
                          );
                        }}
                      </Field>
                    </fieldset>
                    <fieldset>
                      <label htmlFor="provinceId">Province</label>
                      <Field name="provinceId">
                        {({ field, form, ...rest }) => {
                          return (
                            <Input
                              {...field}
                              {...rest}
                              id="provinceId"
                              placeholder="Postal code"
                              className="signup-input"
                              type="select"
                              tabIndex="8"
                              style={{
                                border:
                                  form.errors?.provinceId &&
                                  form.touched?.provinceId
                                    ? "1px solid red"
                                    : "1px solid #dfdfdf",
                              }}
                            >
                              <option value="">Select Province</option>
                              {province?.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.regionTitle}
                                  </option>
                                );
                              })}
                            </Input>
                          );
                        }}
                      </Field>
                    </fieldset>
                    <fieldset>
                      <div className="privacy-policy">
                        <div>
                          <Field name="agreement">
                            {({ field, form, ...rest }) => {
                              return (
                                <Input
                                  {...field}
                                  {...rest}
                                  type="checkbox"
                                  style={{
                                    height: 20,
                                    padding: 0,
                                    marginTop: 26,
                                    border:
                                      form.errors?.agreement &&
                                      form.touched?.agreement
                                        ? "1px solid red"
                                        : "",
                                  }}
                                />
                              );
                            }}
                          </Field>
                        </div>
                        <label
                          htmlFor="emailConsent"
                          className="mb-0"
                          style={{ fontFamily: "Work Sans Regular" }}
                        >
                          I Understand that I will receive email communications
                          from HomeSoul. I can unsubscribe at any time. <br />
                          Read our
                          <a
                            href=""
                            style={{
                              color: "#2C5AB4",
                              fontFamily: "Work Sans Medium",
                            }}
                          >
                            {" "}
                            Privacy policy
                          </a>
                        </label>
                      </div>
                    </fieldset>
                    <fieldset>
                      <Field>
                        {({ field, form, ...rest }) => {
                          return (
                            <button
                              {...field}
                              {...rest}
                              // onClick={() => {
                              //   if (Object.keys(form.errors).length) {
                              //     document
                              //       .getElementsByName(
                              //         Object.keys(form.errors)[0]
                              //       )[0]
                              //       .focus();
                              //   }
                              // }}
                              className="connect-form-btn signup"
                              type="submit"
                              id="contact-submit"
                              data-submit="...Sending"
                            >
                              Sign Up
                            </button>
                          );
                        }}
                      </Field>
                    </fieldset>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100" style={{ position: "absolute", bottom: -1 }}>
          <img src={BushImg} className="w-100" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
