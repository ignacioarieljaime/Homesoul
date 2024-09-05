import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Header from "../../../component/Header";
import AuditProgress from "../../../component/newAudit/AuditProgress";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHome, setProperty, setUser } from "../../../../redux/reducers/audit";
import { setSpinner } from "../../../../redux/reducers/spinner";
import axios from "axios";
import { toast } from "react-toastify";

const AuditPropertyDetails = () => {
  const [province, setProvince] = useState(null);

  const { state: id } = useLocation();
  const dispatch = useDispatch();
  const { assemblyData } = useSelector((state) => state.assembly);
  const initialValues = useSelector((state) => state?.audit?.propertyDetails);
  const isRefresh = useSelector((state) => state?.audit?.isRefresh);

  const navigate = useNavigate();

  useEffect(() => {
    if (isRefresh) {
      navigate("/dashboard", { state: id });
    }
  }, []);

  const handleSubmit = (values) => {
    dispatch(setHome({ addressLine2: values.address }));
    dispatch(setProperty(values));
    navigate("/dashboard/newaudithome", { replace: true, state: id });
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

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Property Title is required"),
    address: Yup.string().required("Property Address is required"),
    city: Yup.string().required("city is required"),
    propertyProvinceId: Yup.string().required("province is required"),
    postalCode: Yup.string().required("postal code is required"),
    type: Yup.string().required("property type is required"),
  });

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
            activeNumber={2}
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
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, ...rest }) => (
                <Form>
                  <Row>
                    <Col lg={6}>
                      <FormGroup>
                        <Label className="newaudit-label-text" for="title">
                          Property Title
                        </Label>
                        <Field
                          type="text"
                          name="title"
                          id="title"
                          className="form-control update-profile-input new-audit-input"
                          style={{
                            backgroundColor: "#F5F6F8",
                            border:
                              touched.title && errors.title
                                ? "1px solid red"
                                : "1px solid #DFDFDF",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Label className="newaudit-label-text" for="address">
                          Property Address
                        </Label>
                        <Field
                          type="text"
                          name="address"
                          id="address"
                          className="form-control update-profile-input new-audit-input"
                          style={{
                            backgroundColor: "#F5F6F8",
                            border:
                              touched.address && errors.address
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
                        <Label className="newaudit-label-text" for="city">
                          City
                        </Label>
                        <Field
                          type="text"
                          name="city"
                          id="city"
                          className="form-control update-profile-input new-audit-input"
                          style={{
                            backgroundColor: "#F5F6F8",
                            border:
                              touched.city && errors.city
                                ? "1px solid red"
                                : "1px solid #DFDFDF",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup>
                        <Field>
                          {({ field, meta, errors, form }) => {
                            return (
                              <>
                                <Label
                                  className="newaudit-label-text"
                                  htmlFor="propertyProvinceId"
                                >
                                  Province
                                </Label>
                                <Input
                                  {...field}
                                  className="update-profile-input new-audit-input"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border:
                                      form.touched?.propertyProvinceId &&
                                      form.errors?.propertyProvinceId
                                        ? "1px solid red"
                                        : "1px solid #DFDFDF",
                                  }}
                                  id="propertyProvinceId"
                                  name="propertyProvinceId"
                                  type="select"
                                  value={field.value.propertyProvinceId}
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
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label className="newaudit-label-text" for="postalCode">
                      Postal Code
                    </Label>
                    <Field
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      className="form-control update-profile-input new-audit-input"
                      style={{
                        backgroundColor: "#F5F6F8",
                        border:
                          touched.postalCode && errors.postalCode
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
                              htmlFor="type"
                            >
                              Property Type
                            </Label>
                            <Input
                              {...field}
                              className="update-profile-input new-audit-input"
                              style={{
                                backgroundColor: "#F5F6F8",
                                border:
                                  form.touched?.type && form.errors?.type
                                    ? "1px solid red"
                                    : "1px solid #DFDFDF",
                              }}
                              id="type"
                              name="type"
                              type="select"
                              value={field.value.type}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            >
                              <option value="">Select Property Type</option>
                              <option value="1">Commercial</option>
                              <option value="2">Residential</option>
                            </Input>
                          </>
                        );
                      }}
                    </Field>
                  </FormGroup>

                  <div
                    style={{ marginTop: 20 }}
                    className="d-flex justify-content-center w-100"
                  >
                    <Button
                      className="w-50"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        marginTop: "10px",
                        fontSize: "18px",
                        fontFamily: "Work Sans",
                        fontWeight: "500",
                        color: "#2C5AB4",
                        textWrap: "nowrap",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/dashboard/newaudit", {
                          replace: true,
                          state: id,
                        });
                      }}
                    >
                      <span style={{ marginRight: "10px" }}>{"< "}</span>
                      Previous
                    </Button>
                    <Button
                      className="w-50"
                      style={{
                        backgroundColor: "#2C5AB4",
                        marginTop: "10px",
                        fontSize: "22px",
                        fontFamily: "Work Sans",
                        fontWeight: "500",
                        padding: "5px",
                      }}
                      type="submit"
                    >
                      Next
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditPropertyDetails;
