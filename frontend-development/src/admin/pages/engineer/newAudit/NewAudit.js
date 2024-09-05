import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Header from "../../../component/Header";
import AuditProgress from "../../../component/newAudit/AuditProgress";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../redux/reducers/audit";
import { setSpinner } from "../../../../redux/reducers/spinner";
import { toast } from "react-toastify";
import axios from "axios";

const NewAudit = () => {
  const { state: id } = useLocation();
  const dispatch = useDispatch();
  const { assemblyData } = useSelector((state) => state.assembly);
  const initialValues = useSelector((state) => state?.audit?.userData);
  const isRefresh = useSelector((state) => state?.audit?.isRefresh);
  const [province, setProvince] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isRefresh) {
      navigate("/dashboard", { state: id });
    }
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    emailId: Yup.string()
      .matches(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        "Enter valid email"
      )
      .required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must contain only digits")
      .required("Required")
      .min(10, "Mobile number must be exactly 10 digits")
      .max(10, "Mobile number must be exactly 10 digits"),
    addressLine1: Yup.string().required("addressLine1 is required"),
    userProvinceId: Yup.string().required("Zip Code is required"),
  });

  const handleSubmit = (values) => {
    dispatch(setUser(values));
    navigate("/dashboard/newauditproperty", { replace: true, state: id });
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
    <div>
      <div style={{ margin: "27px 0 21px 0" }}>
        <Header isImage />
      </div>
      <div className="d-flex flex-row justify-content-left new-audit-progress-bar">
        <p
          style={{
            fontSize: "23px",
            display: "flex",
            color: "#2B2A29",
            fontFamily: "Work Sans",
            fontWeight: 500,
            alignItems: "center",
          }}
          className="text-nowrap m-0 me-4 "
        >
          New Audit Flow
        </p>
        <div
          style={{
            width: "62%",
            borderRadius: "10px",
            paddingBottom: "5px",
            height: "50px",
          }}
          className="bg-white d-flex align-items-center "
        >
          <AuditProgress
            nodes={assemblyData.length !== 0 ? assemblyData : null}
            activeNumber={1}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div
          style={{
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "20px",
            padding: "52px",
            width: "40.5%",
            marginTop: "22px",
          }}
          className="bg-white mb-5 new-audit-width"
        >
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnMount
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ errors, touched, ...rest }) => (
                <Form>
                  <Row>
                    <Col lg={6}>
                      <FormGroup>
                        <Label className="newaudit-label-text" for="firstName">
                          First Name
                        </Label>
                        <Field
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="form-control update-profile-input new-audit-input"
                          style={{
                            backgroundColor: "#F5F6F8",

                            border:
                              touched.firstName && errors.firstName
                                ? "1px solid red"
                                : "1px solid #DFDFDF",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Label className="newaudit-label-text" for="lastName">
                          Last Name
                        </Label>
                        <Field
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="form-control update-profile-input new-audit-input"
                          style={{
                            backgroundColor: "#F5F6F8",
                            border:
                              touched.lastName && errors.lastName
                                ? "1px solid red"
                                : "1px solid #DFDFDF",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <FormGroup>
                        <Label className="newaudit-label-text" for="email">
                          Email ID
                        </Label>
                        <Field
                          type="email"
                          name="emailId"
                          id="emailId"
                          className="form-control update-profile-input new-audit-input"
                          style={{
                            backgroundColor: "#F5F6F8",
                            border:
                              touched.emailId && errors.emailId
                                ? "1px solid red"
                                : "1px solid #DFDFDF",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Label className="newaudit-label-text" for="phone">
                          Phone Number
                        </Label>
                        <Field
                          type="text"
                          name="phone"
                          id="phone"
                          className="form-control update-profile-input new-audit-input"
                          style={{
                            backgroundColor: "#F5F6F8",
                            border:
                              touched.phone && errors.phone
                                ? "1px solid red"
                                : "1px solid #DFDFDF",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label className="newaudit-label-text" for="addressLine1">
                      Address
                    </Label>
                    <Field
                      type="text"
                      name="addressLine1"
                      id="addressLine1"
                      className="form-control update-profile-input new-audit-input"
                      style={{
                        backgroundColor: "#F5F6F8",
                        border:
                          touched.addressLine1 && errors.addressLine1
                            ? "1px solid red"
                            : "1px solid #DFDFDF",
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field>
                      {({ field, meta, errors, form }) => {
                        return (
                          <>
                            <Label
                              className="newaudit-label-text"
                              htmlFor="userProvinceId"
                            >
                              Province
                            </Label>
                            <Input
                              {...field}
                              className="update-profile-input new-audit-input"
                              style={{
                                backgroundColor: "#F5F6F8",
                                border:
                                  form?.errors?.userProvinceId &&
                                  form?.touched?.userProvinceId
                                    ? "1px solid red"
                                    : "1px solid #DFDFDF",
                              }}
                              id="userProvinceId"
                              name="userProvinceId"
                              type="select"
                              value={field.value.userProvinceId}
                              onChange={(e) => {
                                field.onChange(e);
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
                          </>
                        );
                      }}
                    </Field>
                  </FormGroup>

                  <Button
                    onClick={() => {
                      if (Object.keys(errors).length) {
                        document
                          .getElementsByName(Object.keys(errors)[0])[0]
                          .focus();
                      }
                    }}
                    type="submit"
                    style={{
                      width: "100%",
                      backgroundColor: "#2C5AB4",
                      marginTop: "20px",
                      fontSize: "22px",
                      fontFamily: "Work Sans Medium",
                      padding: 7,
                    }}
                  >
                    Next
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAudit;
