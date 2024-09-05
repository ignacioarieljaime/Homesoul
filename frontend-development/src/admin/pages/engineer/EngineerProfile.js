import React, { useEffect, useRef, useState } from "react";
import Header from "../../component/Header";
import { Button, FormGroup, Input, Label } from "reactstrap";
import edit from "../../assets/svgs/profile/edit.svg";
import deletesvg from "../../assets/svgs/profile/deletesvg.svg";
import view from "../../../admin/assets/svgs/profile/view.svg";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  updateUserData,
} from "../../../redux/reducers/updateProfile";
import { userDelete } from "../../../redux/reducers/auth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { setSpinner } from "../../../redux/reducers/spinner";
import axios from "axios";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .required("Required")
    .min(10, "Mobile number must be exactly 10 digits")
    .max(10, "Mobile number must be exactly 10 digits"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address1: Yup.string().required("Address 1 is required"),
  address2: Yup.string().required("Address 2 is required"),
  documentType: Yup.string().required("Document type is required"),
});

const EngineerProfile = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.userData);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prevSelectedFile, setPrevSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [fieldDisable, setFieldDisable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [province, setProvince] = useState(null);

  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    fileInputRef.current.click();
  };

  const { userType } = useSelector((state) => state.auth);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file || prevSelectedFile);
      setFileError(false);
    } else {
      setFileError(true);
    }
  };
  const openFileInNewTab = () => {
    if (selectedFile) {
      let fileURL;
      if (typeof selectedFile === "string" && selectedFile.startsWith("http")) {
        fileURL = selectedFile;
      } else {
        fileURL = URL.createObjectURL(selectedFile);
      }
      window.open(fileURL, "_blank");
    }
  };

  const handleUpdate = async (values) => {
    if (fieldDisable) {
      setFieldDisable(false);
    } else {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phoneNo", values.phoneNumber);
      formData.append("emailID", values.email);
      formData.append("addressLine1", values.address1);
      formData.append("addressLine2", values.address2);
      formData.append("provinceId", values.provinceId);
      formData.append(
        "documentTypeId",
        userType == "1" ? values.documentType : null
      );
      if (typeof selectedFile === "string" && selectedFile.startsWith("http")) {
        const fetchedResult = await fetch(selectedFile);
        const blob = await fetchedResult.blob();
        const file = new File([blob], getImageName(selectedFile));
        formData.append("documentFile", file);
      } else {
        formData.append("documentFile", selectedFile);
      }

      dispatch(updateUserData(formData, () => navigate("/login")));
    }
  };

  function getImageName(url) {
    var parts = url.split("/");

    var filename = parts[parts.length - 1];

    if (filename.includes("?")) {
      filename = filename.split("?")[0];
    }

    return filename;
  }

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(44, 90, 180)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userDelete(handleNavigate));
        toast.success("Your account has been deleted.", {
          position: "top-right",
        });
      }
    });
  };

  const handleNavigate = () => {
    navigate("/signup");
  };
  useEffect(() => {
    setPrevSelectedFile(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    dispatch(getUserData(() => navigate("/login")));
  }, []);

  useEffect(() => {
    data?.documentUrl && setSelectedFile(data.documentUrl);
  }, [data]);

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
      <Header />
      <div
        style={{ boxShadow: "0px 3px 6px #00000029", borderRadius: "20px" }}
        className="w-100 bg-white py-3 px-4 mb-3"
      >
        <p
          className="m-0"
          style={{
            fontSize: "24px",
            fontFamily: "Work Sans",
            fontWeight: 600,
            color: "#2B2A29",
          }}
        >
          Profile
        </p>
        <p
          className="m-0"
          style={{
            fontSize: "16px",
            fontFamily: "Work Sans",
            color: "#2B2A29",
            fontWeight: 400,
          }}
        >
          Manage your profile details
        </p>
      </div>
      <div
        style={{ boxShadow: "0px 3px 6px #00000029", borderRadius: "20px" }}
        className="w-100 bg-white py-3 px-4 pe-sm-5 mb-5"
      >
        <p
          className="m-0"
          style={{
            fontSize: "24px",
            fontFamily: "Work Sans",
            fontWeight: 600,
            color: "#2B2A29",
          }}
        >
          {userType == "1" ? "Professional Details" : "Users Details"}
        </p>
        <p
          className="m-0"
          style={{
            fontSize: "16px",
            fontFamily: "Work Sans",
            color: "#AEADAD",
            fontWeight: 400,
          }}
        >
          Modified Details
        </p>
        <div
          className="d-flex justify-content-center"
          style={{ paddingTop: "40px" }}
        >
          <div className="w-100">
            <Formik
              initialValues={{
                firstName: data?.firstName,
                lastName: data?.lastName,
                phoneNumber: data?.phoneNo,
                email: data?.emailID,
                address1: data?.addressLine1,
                address2: data?.addressLine2,
                provinceId: data?.provinceId,
                documentType: "1",
              }}
              enableReinitialize={true}
              validationSchema={fieldDisable ? "" : validationSchema}
              onSubmit={(values, formikBag) => {
                handleUpdate(values);
              }}
            >
              {(errors, touched) => (
                <Form className="w-100 d-flex flex-column align-items-center ">
                  <div className=" py-2 w-100 row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xxl-3">
                    <div className="col mb-0 py-1 px-0 pe-0 pe-sm-5 ">
                      <FormGroup>
                        <Field name="firstName">
                          {({ field, meta }) => (
                            <FormGroup>
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                {...field}
                                disabled={fieldDisable}
                                className="update-profile-input"
                                style={{
                                  backgroundColor: "#F5F6F8",
                                  border:
                                    meta.touched && meta.error
                                      ? "1px solid red"
                                      : "1px solid #DFDFDF",
                                }}
                              />
                            </FormGroup>
                          )}
                        </Field>
                      </FormGroup>
                    </div>
                    <div className="col mb-0 py-1 px-0 pe-sm-5">
                      <FormGroup>
                        <Field name="lastName">
                          {({ field, meta }) => (
                            <FormGroup>
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input
                                {...field}
                                disabled={fieldDisable}
                                className="update-profile-input"
                                style={{
                                  backgroundColor: "#F5F6F8",
                                  border:
                                    meta.touched && meta.error
                                      ? "1px solid red"
                                      : "1px solid #DFDFDF",
                                }}
                              />
                            </FormGroup>
                          )}
                        </Field>
                      </FormGroup>
                    </div>
                    <div className="col mb-0 py-1 px-0 pe-sm-5">
                      <FormGroup>
                        <Field name="phoneNumber">
                          {({ field, meta }) => (
                            <FormGroup>
                              <Label htmlFor="phoneNumber">Phone Number</Label>
                              <Input
                                {...field}
                                disabled={fieldDisable}
                                className="update-profile-input"
                                style={{
                                  backgroundColor: "#F5F6F8",
                                  border:
                                    meta.touched && meta.error
                                      ? "1px solid red"
                                      : "1px solid #DFDFDF",
                                }}
                              />
                            </FormGroup>
                          )}
                        </Field>
                      </FormGroup>
                    </div>
                    <div className="col mb-0 py-1 px-0 pe-sm-5">
                      <FormGroup>
                        <Field name="email">
                          {({ field, meta }) => (
                            <FormGroup>
                              <Label htmlFor="email">
                                Email ID
                                {data?.isEmailVerified ? (
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      paddingLeft: "10px",
                                      color: "#6DBD45",
                                    }}
                                  >
                                    Verified
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      paddingLeft: "10px",
                                      color: "#C70C0C",
                                    }}
                                  >
                                    Unverified
                                  </span>
                                )}
                              </Label>
                              <Input
                                {...field}
                                className="update-profile-input"
                                disabled={fieldDisable}
                                style={{
                                  backgroundColor: "#F5F6F8",
                                  border:
                                    meta.touched && meta.error
                                      ? "1px solid red"
                                      : "1px solid #DFDFDF",
                                }}
                              />
                            </FormGroup>
                          )}
                        </Field>
                      </FormGroup>
                    </div>

                    <div className="col mb-0 py-1 px-0 pe-sm-5">
                      <FormGroup>
                        <Field name="address1">
                          {({ field, meta }) => (
                            <FormGroup>
                              <Label htmlFor="address1">Address 1</Label>
                              <Input
                                {...field}
                                disabled={fieldDisable}
                                className="update-profile-input"
                                style={{
                                  backgroundColor: "#F5F6F8",
                                  border:
                                    meta.touched && meta.error
                                      ? "1px solid red"
                                      : "1px solid #DFDFDF",
                                }}
                              />
                            </FormGroup>
                          )}
                        </Field>
                      </FormGroup>
                    </div>
                    <div className="col mb-0 py-1 px-0 pe-sm-5">
                      <FormGroup>
                        <Field name="address2">
                          {({ field, meta }) => (
                            <FormGroup>
                              <Label htmlFor="address2">Address 2</Label>
                              <Input
                                {...field}
                                disabled={fieldDisable}
                                className="update-profile-input"
                                style={{
                                  backgroundColor: "#F5F6F8",
                                  border:
                                    meta.touched && meta.error
                                      ? "1px solid red"
                                      : "1px solid #DFDFDF",
                                }}
                              />
                            </FormGroup>
                          )}
                        </Field>
                      </FormGroup>
                    </div>
                    <div className="col mb-0 py-1 px-0 pe-sm-5">
                      <FormGroup>
                        <Field name="provinceId">
                          {({ field, meta }) => (
                            <FormGroup>
                              <Label htmlFor="provinceId">Province</Label>
                              <Input
                                {...field}
                                placeholder="Postal Code"
                                disabled={fieldDisable}
                                className="update-profile-input"
                                type="select"
                                style={{
                                  backgroundColor: "#F5F6F8",
                                  border:
                                    meta.touched && meta.error
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
                            </FormGroup>
                          )}
                        </Field>
                      </FormGroup>
                    </div>
                    {userType == "1" && (
                      <>
                        <div className="col mb-0 py-1 px-0 pe-sm-5">
                          <FormGroup>
                            <Label
                              htmlFor="documentType"
                              style={{ textWrap: "nowrap" }}
                            >
                              Upload Documents{" "}
                              {selectedFile ? (
                                ""
                              ) : (
                                <span
                                  style={{
                                    fontSize: "14px",
                                    paddingLeft: "10px",
                                    color: "#C70C0C",
                                  }}
                                >
                                  Pending
                                </span>
                              )}
                            </Label>
                            <Field name="documentType">
                              {({ field, meta }) => (
                                <Input
                                  type="select"
                                  disabled={fieldDisable}
                                  {...field}
                                  className="update-profile-input"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border:
                                      meta.touched && meta.error
                                        ? "1px solid red"
                                        : "1px solid #DFDFDF",
                                  }}
                                  component="select"
                                >
                                  <option value="1">Canada ID Card</option>
                                </Input>
                              )}
                            </Field>
                          </FormGroup>
                        </div>
                        <div className="col mb-0 mt-2 py-1 px-0 pe-sm-5">
                          <FormGroup>
                            {windowWidth > 991 ? (
                              <Label htmlFor="fileInput"></Label>
                            ) : null}
                            <label
                              htmlFor="fileInput"
                              style={{
                                display: "flex",
                                backgroundColor: "#F5F6F8",
                                border: fileError
                                  ? "1px solid red"
                                  : "1px solid #DFDFDF",
                                borderRadius: "6px",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textAlign: "center",
                                marginBottom: 0,
                                cursor: "pointer",
                                fontFamily: "Work Sans",
                                fontWeight: 400,
                                paddingLeft: 12,
                              }}
                            >
                              {selectedFile ? (
                                <div
                                  style={{ overflowX: "scroll" }}
                                  className="scrollbar-hidden"
                                >
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      letterSpacing: "0px",
                                      color: "#2B2A29",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {typeof selectedFile === "string" &&
                                    selectedFile.startsWith("http")
                                      ? getImageName(selectedFile)
                                      : selectedFile.name}
                                  </p>
                                </div>
                              ) : (
                                "Upload File"
                              )}
                              <input
                                type="file"
                                id="fileInput"
                                disabled={fieldDisable}
                                style={{
                                  position: "absolute",
                                  opacity: 0,
                                  width: 0,
                                  height: 0,
                                  overflow: "hidden",
                                }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                multiple={false}
                              />
                              {selectedFile ? (
                                <div
                                  style={{ padding: "6px 12px" }}
                                  className="d-flex flex-row "
                                  onClick={openFileInNewTab}
                                >
                                  <img
                                    alt="img"
                                    style={{
                                      width: "17px",
                                      height: "23px",
                                      marginRight: 7,
                                    }}
                                    src={view}
                                  />
                                  <p
                                    style={{
                                      margin: 0,
                                      color: "#2C5AB4",
                                      fontFamily: "Roboto",
                                      fontWeight: 500,
                                    }}
                                  >
                                    View
                                  </p>
                                </div>
                              ) : (
                                <Button
                                  disabled={fieldDisable}
                                  onClick={handleButtonClick}
                                  style={{ backgroundColor: "#2C5AB4" }}
                                >
                                  Browse File
                                </Button>
                              )}
                            </label>
                          </FormGroup>
                        </div>
                      </>
                    )}
                  </div>
                  <p
                    className="w-100"
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: 400,
                      fontSize: "12px",
                      marginTop: "20px",
                      marginBottom: "28px",
                    }}
                  >
                    Note: Address will help our Auditor partner reach your place
                    easily
                  </p>
                  <div className="d-flex justify-content-between pe-sm-5 flex-wrap w-100">
                    <Button
                      style={{
                        backgroundColor: "#2C5AB4",
                        paddingRight: "52px",
                        paddingLeft: "20px",
                        fontFamily: "Work Sans",
                        fontSize: "18px",
                        fontWeight: 500,
                      }}
                      type="submit"
                    >
                      <img
                        alt="img"
                        style={{ paddingRight: "10px" }}
                        src={edit}
                      />
                      {fieldDisable ? "Edit Profile" : "Save Submit"}
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "transparent",
                        color: "#2C5AB4",
                        border: "none",
                        paddingRight: "0px",
                        fontFamily: "Work Sans",
                        fontSize: "18px",
                        fontWeight: 500,
                      }}
                      onClick={handleDelete}
                    >
                      <img
                        alt="img"
                        style={{ paddingRight: "10px" }}
                        src={deletesvg}
                      />
                      Delete Account
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

export default EngineerProfile;
