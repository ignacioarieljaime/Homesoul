import React, { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { Field, Form, Formik } from "formik";
import { Button, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { setSpinner } from "../../../../redux/reducers/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  provinceId: Yup.string().required("Required"),
});

const ServiceArea = () => {
  const [pincodeList, setPincodeList] = useState([]);
  const [province, setProvince] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/save-auditor-pincode`,
        values,
        { headers }
      );
      resetForm();
      toast.success(response.data.responseMessage, {
        position: "top-right",
      });
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
    await handleGetPinCodeList();
  };

  const handleGetPinCodeList = async () => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/get-auditor-pincode`,
        { headers }
      );
      setPincodeList(response.data?.responseData);
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

  useEffect(() => {
    handleGetPinCodeList();
  }, []);

  const handleDelete = async (id) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/user/delete-pincode`,
        {
          data: { id },
          headers,
        }
      );
      handleGetPinCodeList();
      toast.success("Successfully Deleted", {
        position: "top-right",
      });
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

  return (
    <div className="d-flex justify-content-center flex-column">
      <Header />
      <div className="d-flex align-items-center  flex-column justify-content-center">
        <div style={{ width: "60%" }} className="service-main-outer">
          <div className="d-flex gap-4 w-100">
            <Formik
              initialValues={{
                provinceId: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="flex-wrap d-flex justify-content-center gap-4 w-100 ">
                  <Field name="provinceId">
                    {({ field, form, ...rest }) => {
                      return (
                        <Input
                          {...field}
                          {...rest}
                          id="provinceId"
                          type="select"
                          placeholder="Enter Postal Code"
                          className="form-control mb-0  update-profile-input new-audit-input"
                          style={{
                            minWidth: "150px",
                            flex: 1,
                            backgroundColor: "#F5F6F8",
                            border:
                              touched.provinceId && errors.provinceId
                                ? "1px solid red"
                                : "1px solid #DFDFDF",
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

                  <Button
                    className=""
                    style={{
                      backgroundColor: "#2C5AB4",
                      fontSize: "22px",
                      fontFamily: "Work Sans",
                      fontWeight: "500",
                      textWrap: "nowrap",
                    }}
                    type="submit"
                  >
                    Add Province
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div style={{ width: "60%" }}>
          {pincodeList.length > 0 ? (
            <div className="mt-5 d-flex">
              <div
                className="w-25 text-center pt-3"
                style={{ fontFamily: "Work Sans SemiBold", fontSize: 14 }}
              >
                Province:
              </div>
              <div className="w-75">
                {pincodeList.map((pincode, index) => (
                  <div
                    style={{
                      boxShadow: "0px 3px 6px #00000029",
                      padding: "2%",
                      width: "50%",
                      minWidth: "fit-content",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      borderRadius: 10,
                    }}
                    className="bg-white mt-2 text-center px-3 gap-2 "
                    key={pincode.id}
                  >
                    <div>{pincode.regionTitle}</div>
                    <div
                      onClick={() => handleDelete(pincode.id)}
                      className="d-flex align-items-center "
                      style={{ cursor: "pointer", height: "15px" }}
                    >
                      <FontAwesomeIcon
                        style={{ height: "15px" }}
                        icon={faTrash}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p
              style={{
                textAlign: "center",
              }}
              className="mt-5"
            >
              No Postal Code added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceArea;
