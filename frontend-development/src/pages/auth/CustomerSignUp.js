import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import BushImg from "../../assets/images/bush.png";
import { customerInitialValues } from "../../modules/formik/initialValues";
import { customerValidationSchema } from "../../modules/formik/validationSchema";
import { useDispatch } from "react-redux";
import { userSignUp } from "../../redux/reducers/auth";
import MessageSvg from "../../assets/svgs/InputMessage.svg";
import { Input } from "reactstrap";
import { setSpinner } from "../../redux/reducers/spinner";
import { toast } from "react-toastify";
import axios from "axios";

const CustomerSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [province, setProvince] = useState(null);

  const handleSubmit = async (value) => {
    const data = {
      userType: 2,
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNo: value.phoneNo,
      emailID: value.emailID,
      password: value.password,
      addressLine1: value.addressLine1,
      addressLine2: value.addressLine2,
      confirmPassword: value.confirmPassword,
      provinceId: value.pincode,
      energyAudit: value?.energyAudit ? 1 : 0,
      consultation: value?.consultation ? 1 : 0,
      investment: value?.investment ? 1 : 0,
      agreement: false,
    };

    dispatch(userSignUp(data, handleNavigate));
  };

  const handleNavigate = () => {
    navigate("/usersuccess", { replace: true });
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
      <div className="sign-up-detail" style={{ padding: "30px 0 55px 0" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="enginner-detail-form">
            <div className="row">
              <div className="col-md-12">
                <Formik
                  initialValues={customerInitialValues}
                  validationSchema={customerValidationSchema}
                  validateOnMount
                  onSubmit={handleSubmit}
                >
                  <Form id="contact" action="" method="post">
                    <h3>Customer Details</h3>
                    <h4>Create an account to see your recommendations</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <fieldset>
                          <label htmlFor="firstName">First Name</label>
                          <Field name="firstName">
                            {({ field, form, ...rest }) => {
                              return (
                                <input
                                  {...field}
                                  {...rest}
                                  id="firstName"
                                  type="text"
                                  tabIndex="1"
                                  style={{
                                    border:
                                      form.errors?.firstName &&
                                      form.touched?.firstName
                                        ? "1px solid red"
                                        : "1px solid #dfdfdf",
                                  }}
                                />
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
                            {({ field, form, ...rest }) => {
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
                                  type="tel"
                                  tabIndex="4"
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
                              type="text"
                              tabIndex="7"
                              className="signup-input"
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
                              type="text"
                              tabIndex="8"
                              className="signup-input"
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
                      <label htmlFor="pinCode">Province</label>
                      <Field name="pincode">
                        {({ field, form, ...rest }) => {
                          return (
                            <Input
                              {...field}
                              {...rest}
                              id="pinCode"
                              placeholder="Postal code"
                              className="signup-input"
                              type="select"
                              tabIndex="8"
                              style={{
                                border:
                                  form.errors?.pincode && form.touched?.pincode
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
                        <Field name="energyAudit">
                          {({ field, form, ...rest }) => {
                            return (
                              <Input
                                {...field}
                                {...rest}
                                type="checkbox"
                                style={{
                                  height: 20,
                                  marginTop: 26,
                                  width: 20,
                                  padding: 0,
                                  border:
                                    form.errors?.energyAudit &&
                                    form.touched?.energyAudit
                                      ? "1px solid red"
                                      : "",
                                }}
                              />
                            );
                          }}
                        </Field>

                        <label
                          htmlFor="emailConsent"
                          className="mb-0"
                          style={{ fontFamily: "Work Sans Regular" }}
                        >
                          Requesting an Energy Audit
                        </label>
                      </div>
                    </fieldset>

                    <fieldset>
                      <div className="privacy-policy">
                        <Field name="consultation">
                          {({ field, form, ...rest }) => {
                            return (
                              <Input
                                {...field}
                                {...rest}
                                type="checkbox"
                                style={{
                                  height: 20,
                                  marginTop: 26,
                                  width: 20,
                                  padding: 0,
                                  border:
                                    form.errors?.consultation &&
                                    form.touched?.consultation
                                      ? "1px solid red"
                                      : "",
                                }}
                              />
                            );
                          }}
                        </Field>

                        <label
                          htmlFor="emailConsent"
                          className="mb-0"
                          style={{ fontFamily: "Work Sans Regular" }}
                        >
                          Requesting a Consultation
                        </label>
                      </div>
                    </fieldset>

                    <fieldset>
                      <div className="privacy-policy">
                        <Field name="investment">
                          {({ field, form, ...rest }) => {
                            return (
                              <Input
                                {...field}
                                {...rest}
                                type="checkbox"
                                style={{
                                  height: 20,
                                  marginTop: 26,
                                  width: 20,
                                  padding: 0,
                                  border:
                                    form.errors?.investment &&
                                    form.touched?.investment
                                      ? "1px solid red"
                                      : "",
                                }}
                              />
                            );
                          }}
                        </Field>

                        <label
                          htmlFor="emailConsent"
                          className="mb-0"
                          style={{ fontFamily: "Work Sans Regular" }}
                        >
                          Seeking Investment
                        </label>
                      </div>
                    </fieldset>

                    <fieldset>
                      <div className="privacy-policy">
                        <Field name="agreement">
                          {({ field, form, ...rest }) => {
                            return (
                              <Input
                                {...field}
                                {...rest}
                                type="checkbox"
                                style={{
                                  height: 20,
                                  marginTop: 26,
                                  width: 20,
                                  padding: 0,
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
                              className="connect-form-btn signup"
                              name="submit"
                              type="submit"
                              id="contact-submit"
                              data-submit="...Sending"
                              onClick={() => {
                                if (Object.keys(form.errors).length) {
                                  document
                                    .getElementsByName(
                                      Object.keys(form.errors)[0]
                                    )[0]
                                    .focus();
                                }
                              }}
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

export default CustomerSignUp;
