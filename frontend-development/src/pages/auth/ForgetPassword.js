import React from "react";
import { Button } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import InputMessageIcon from "../../assets/svgs/InputMessage.svg";
import { useNavigate } from "react-router-dom";
import BushImg from "../../assets/images/bush.png";
import { Field, Form, Formik } from "formik";
import { emailInitialValues } from "../../modules/formik/initialValues";
import { emailValidationSchema } from "../../modules/formik/validationSchema";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSpinner } from "../../redux/reducers/spinner";

const ForgetPassword = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    try {
      dispatch(setSpinner(true));
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/forgot-password`,
        value
      );
      toast.success(response.data?.responseMessage, {
        position: "top-right",
      });
      dispatch(setSpinner(false));
      navigation("/checkemail");
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Navbar forgotPassword />
      <div className="reset-password" style={{ padding: "133px 0 106px 0" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="reset-password-box" style={{ padding: 42 }}>
            <div className="row">
              <div
                className="col-md-12 d-flex justify-content-center align-items-center flex-column text-center"
                style={{ gap: 29 }}
              >
                <h2 className="reset-heading m-0">Reset your password</h2>
                <p className="reset-subtext m-0">
                  Please enter your login email and we'll send you instructions
                  to reset your password.
                </p>
                <Formik
                  initialValues={emailInitialValues}
                  validationSchema={emailValidationSchema}
                  validateOnMount
                  onSubmit={handleSubmit}
                >
                  <Form className="w-100">
                    <Field name="email">
                      {({ field, form, ...rest }) => {
                        return (
                          <fieldset
                            className="reset-input-container"
                            style={{
                              border:
                                form.errors?.email && form.touched?.email
                                  ? "1px solid red"
                                  : "1px solid #dfdfdf",
                            }}
                          >
                            <img
                              src={InputMessageIcon}
                              style={{ height: 15 }}
                              alt="message-icon"
                            />
                            <input
                              {...field}
                              {...rest}
                              id="email"
                              placeholder="Your Email Address"
                              type="email"
                              tabIndex="3"
                              className="reset-input"
                            />
                          </fieldset>
                        );
                      }}
                    </Field>
                    <Field>
                      {({ field, form, ...rest }) => {
                        return (
                          <fieldset>
                            <Button
                              {...field}
                              {...rest}
                              className="verified-btn"
                              onClick={() => {
                                if (Object.keys(form.errors).length) {
                                  document
                                    .getElementsByName(
                                      Object.keys(form.errors)[0]
                                    )[0]
                                    .focus();
                                }
                              }}
                              type="submit"
                              style={{
                                fontFamily: "Work Sans Medium",
                                fontSize: 22,
                                color: "#fff",
                                width: "73%",
                                borderRadius: 10,
                                minHeight: 60,
                                marginTop: 46,
                              }}
                            >
                              Email Reset Link
                            </Button>
                          </fieldset>
                        );
                      }}
                    </Field>
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

export default ForgetPassword;
