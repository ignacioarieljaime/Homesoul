import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/Header";
import { setSpinner } from "../../../redux/reducers/spinner";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddHomeDetails = () => {
  const [province, setProvince] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/customer/create-property`,
        values,
        { headers }
      );
      toast.success(response.data.responseMessage, {
        position: "top-right",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate("/login");
      } else {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
    dispatch(setSpinner(false));
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
    provinceId: Yup.string().required("province is required"),
    postalCode: Yup.string().required("postal code is required"),
    type: Yup.string().required("property type is required"),
  });

  return (
    <div>
      <div style={{ margin: "27px 0 21px 0" }}>
        <Header isImage />
      </div>
      <div className="d-flex justify-content-center">
        <p
          style={{
            fontSize: "23px",
            display: "flex",
            color: "#2B2A29",
            fontFamily: "Work Sans",
            fontWeight: 500,
            alignItems: "center",
          }}
          className="text-nowrap m-0 "
        >
          Add Home Details
        </p>
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
              initialValues={{
                title: "",
                address: "",
                city: "",
                provinceId: "",
                postalCode: "",
                type: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
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
                                  htmlFor="provinceId"
                                >
                                  Province
                                </Label>
                                <Input
                                  {...field}
                                  className="update-profile-input new-audit-input"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border:
                                      form.touched?.provinceId &&
                                      form.errors?.provinceId
                                        ? "1px solid red"
                                        : "1px solid #DFDFDF",
                                  }}
                                  id="provinceId"
                                  name="provinceId"
                                  type="select"
                                  value={field.value.provinceId}
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
                  <div className="d-flex flex-row gap-5">
                    <Button
                      onClick={() => navigate("/dashboard")}
                      style={{
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        border: "none",
                        color: "#2C5AB4",
                        marginTop: "20px",
                        fontSize: "22px",
                        fontFamily: "Work Sans Medium",
                        padding: 7,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
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
                      Add Details
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

export default AddHomeDetails;
