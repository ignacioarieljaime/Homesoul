import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../../component/Header";
import AuditProgress from "../../../component/newAudit/AuditProgress";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setHome } from "../../../../redux/reducers/audit";
import { setSpinner } from "../../../../redux/reducers/spinner";
import { getAssembly } from "../../../../redux/reducers/assembly";
import { toast } from "react-toastify";

const AuditHomeDetails = () => {
  const { homeDetails } = useSelector((state) => state.audit);
  const [homeDetailsValue, setHomeDetailsValue] = useState(homeDetails);
  const [province, setProvince] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [weatherStation, setWeatherStation] = useState(null);
  const [weatherStationId, setWeatherStationId] = useState(null);
  const [hdd, setHdd] = useState(null);
  const [nbc, setNbc] = useState(null);
  const [zone, setZone] = useState(null);
  const [nbcTierId, setNbcTierId] = useState(null);
  const [ecpoints, setEcPoints] = useState(null);
  const [unitId, setUnitId] = useState(homeDetails?.unit || null);
  const [newEcpPoints, setNewEcpoints] = useState(
    homeDetails?.ecpRequired || null
  );
  const { assemblyData } = useSelector((state) => state.assembly);
  const [houseTypeId, setHouseTypeId] = useState(homeDetails.houseTypeId || 0);
  const [volume, setVolume] = useState(homeDetails?.volume || null);
  const [credit, setCredit] = useState(homeDetails?.credit || null);
  const isRefresh = useSelector((state) => state?.audit?.isRefresh);

  const { state: id } = useLocation();
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project name is required"),
    addressLine2: Yup.string().required("Address is required"),
    pincode2: Yup.string().required("Zip is required"),
    projectProvinceId: Yup.string().required(),
    weatherStationId: Yup.string().required(),
    nbcPerspectiveTierId: Yup.string().required(),
    houseTypeId: Yup.string().required(),
    fdwrPercent: Yup.string()
      .matches(/^\d+(\.\d+)?$/)
      .required(),
    volume: Yup.string()
      .matches(/^\d+(\.\d+)?$/)
      .required(),
    unit: Yup.string().required(),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProvince = async () => {
    dispatch(setSpinner(true));
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-regions`
      );
      setProvince(result.data.responseData);
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };

  const handleSubmit = async (value) => {
    const data = {
      projectName: value.projectName,
      addressLine2: value.addressLine2,
      projectProvinceId: provinceId,
      pincode2: value.pincode2,
      weatherStationId: weatherStationId,
      hdd: hdd,
      nbcClimateZone: zone,
      nbcPerspectiveTierId: nbcTierId,
      houseTypeId: houseTypeId,
      fdwrPercent: value.fdwrPercent,
      volume: value.volume,
      credit: credit === "N/A" ? 0 : credit,
      ecpRequired: newEcpPoints === "N/A" ? 0 : newEcpPoints,
      unit: value.unit,
    };
    dispatch(setHome(data));
    dispatch(getAssembly(houseTypeId, zone, handleNavigate, id));
  };

  const handleNavigate = () => {
    navigate(`/dashboard/audit-checklist`, {
      replace: true,
      state: { id: id, categoryNumber: 0 },
    });
  };
  const getNbc = async () => {
    dispatch(setSpinner(true));

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-nbc`
      );
      setNbc(result.data.responseData);
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };

  const handleProvinceChange = async (event) => {
    const selectedId = event.target.value;
    setProvinceId(selectedId);
    dispatch(setSpinner(true));

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-weather-station/${selectedId}`
      );
      setWeatherStation(result.data.responseData);
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };
  const handleUnitChange = async (event) => {
    const selectedId = event.target.value;
    setUnitId(event.target.value);
    dispatch(setSpinner(true));

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-credit`,
        {
          params: {
            volume: volume,
            unit: selectedId,
            requiredEcp: ecpoints,
          },
        }
      );
      setNewEcpoints(
        result?.data?.responseData?.requiredEcp < 0
          ? "N/A"
          : result?.data?.responseData?.requiredEcp
      );
      setCredit(result?.data?.responseData?.credit);
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };

  const handleNbcChange = async (event) => {
    const selectedId = event.target.value;
    setNbcTierId(selectedId);
    dispatch(setSpinner(true));
    if (unitId && volume) {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/audit/get-ecPoints/${selectedId}`;
        const response = await axios.get(url);
        const ecPoints = response?.data?.responseData[0].ecPoints;
        setEcPoints(ecPoints);
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/audit/get-credit`,
          {
            params: {
              volume: volume,
              unit: unitId,
              requiredEcp: ecPoints,
            },
          }
        );
        setNewEcpoints(
          result?.data?.responseData?.requiredEcp < 0
            ? "N/A"
            : result?.data?.responseData?.requiredEcp
        );
        setCredit(result?.data?.responseData?.credit);
      } catch (error) {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    } else {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/audit/get-ecPoints/${selectedId}`;
        const response = await axios.get(url);
        const ecPoints = response.data.responseData[0].ecPoints;
        setEcPoints(ecPoints);
        setNewEcpoints(ecPoints);
      } catch (error) {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }

    dispatch(setSpinner(false));
  };

  const handleWeatherChange = async (event) => {
    const selectedId = event.target.value;
    const selectedWeatherStation = weatherStation?.find(
      (station) => station.id === parseInt(selectedId)
    );

    if (selectedWeatherStation) {
      setWeatherStationId(selectedWeatherStation.id);
      setHdd(selectedWeatherStation.hdd);
    }
    dispatch(setSpinner(true));

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-zone/${selectedId}`
      );
      setZone(result?.data?.responseData?.zone);
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };

  const handleVolumeChange = async (e) => {
    if (unitId && ecpoints) {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/audit/get-credit`,
          {
            params: {
              volume: e.target.value,
              unit: unitId,
              requiredEcp: ecpoints,
            },
          }
        );
        setNewEcpoints(
          result?.data?.responseData?.requiredEcp < 0
            ? "N/A"
            : result?.data?.responseData?.requiredEcp
        );
        setCredit(result?.data?.responseData?.credit);
      } catch (error) {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
  };

  useEffect(() => {
    if (isRefresh) {
      navigate("/dashboard", { state: id });
    } else {
      getProvince();
      getNbc();
    }
  }, []);

  useLayoutEffect(() => {
    const initializeForm = async () => {
      if (homeDetails.nbcPerspectiveTierId) {
        handleNbcChange({
          target: { value: homeDetails.nbcPerspectiveTierId },
        });
      }

      if (homeDetails.projectProvinceId) {
        await handleProvinceChange({
          target: { value: homeDetails.projectProvinceId },
        });
      }
    };
    initializeForm();
  }, [homeDetails]);

  React.useEffect(() => {
    if (homeDetails.weatherStationId && weatherStation) {
      handleWeatherChange({
        target: { value: homeDetails.weatherStationId },
      });
    }
  }, [weatherStation]);

  useEffect(() => {
    setHomeDetailsValue(homeDetails);
    setCredit(homeDetails?.credit);
    setUnitId(homeDetails?.unit);
    setVolume(homeDetails?.volume);
  }, [homeDetails]);

  return (
    <div>
      <Header />
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
          className="text-nowrap m-0 me-4"
        >
          New Audit Flow
        </p>
        <div
          style={{
            width: "53.5%",
            borderRadius: "10px",
            paddingBottom: "5px",
            height: "50px",
          }}
          className="bg-white d-flex align-items-center "
        >
          <AuditProgress
            nodes={assemblyData.length !== 0 ? assemblyData : null}
            activeNumber={3}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div
          style={{
            width: "85%",
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "20px",
          }}
          className="bg-white p-3 mb-5"
        >
          <div className="d-flex justify-content-center ">
            <p
              style={{
                fontSize: "30px",
                color: "#2B2A29",
                fontFamily: "Work Sans",
                fontWeight: 600,
                marginTop: "23px",
                marginBottom: "38px",
              }}
            >
              Project Details
            </p>
          </div>
          <div className="d-flex flex-column  justify-content-center ">
            <div
              style={{ paddingLeft: "9%" }}
              className="d-flex flex-column justify-content-center home-details-form"
            >
              <Formik
                initialValues={homeDetailsValue}
                validationSchema={validationSchema}
                validateOnMount
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ errors, touched }) => {
                  return (
                    <Form>
                      <div className="d-flex justify-content-center ">
                        <div className="audit-home-width">
                          <Row>
                            <Col style={{ marginBofirstttom: "15px" }} xl={4}>
                              <FormGroup>
                                <Label
                                  className="newaudit-label-text"
                                  htmlFor="projectName"
                                >
                                  Project Name
                                </Label>
                                <Field
                                  id="projectName"
                                  name="projectName"
                                  className="form-control update-profile-input new-audit-input"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border:
                                      touched.projectName && errors.projectName
                                        ? "1px solid red"
                                        : "1px solid #DFDFDF",
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl={4}>
                              <FormGroup>
                                <Label
                                  htmlFor="examplePassword"
                                  className="newaudit-label-text"
                                >
                                  Address
                                </Label>
                                <Field
                                  id="addressLine2"
                                  name="addressLine2"
                                  className="form-control update-profile-input new-audit-input"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border:
                                      touched.addressLine2 &&
                                      errors.addressLine2
                                        ? "1px solid red"
                                        : "1px solid #DFDFDF",
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl={4}>
                              <FormGroup>
                                <Label
                                  className="newaudit-label-text"
                                  htmlFor="examplePassword"
                                >
                                  Postal Code
                                </Label>
                                <Field
                                  id="pincode2"
                                  name="pincode2"
                                  className="form-control update-profile-input new-audit-input"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border:
                                      touched.pincode2 && errors.pincode2
                                        ? "1px solid red"
                                        : "1px solid #DFDFDF",
                                  }}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              className="audit-home-bottom"
                              style={{ marginBottom: "15px" }}
                              xl={3}
                            >
                              <FormGroup>
                                <Field>
                                  {({ field, meta, form }) => {
                                    return (
                                      <>
                                        <Label
                                          className="newaudit-label-text"
                                          htmlFor="exampleEmail"
                                        >
                                          Province{" "}
                                        </Label>
                                        <Input
                                          {...field}
                                          className="update-profile-input new-audit-input"
                                          style={{
                                            backgroundColor: "#F5F6F8",
                                            border:
                                              form.touched?.projectProvinceId &&
                                              form.errors?.projectProvinceId
                                                ? "1px solid red"
                                                : "1px solid #DFDFDF",
                                          }}
                                          id="exampleEmail"
                                          name="projectProvinceId"
                                          value={field.value.projectProvinceId}
                                          placeholder=""
                                          type="select"
                                          onChange={(e) => {
                                            handleProvinceChange(e);
                                            field.onChange(e);
                                          }}
                                        >
                                          <option value="">
                                            Select region
                                          </option>
                                          {province?.map((item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
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
                            <Col xl={3}>
                              <FormGroup>
                                <Field>
                                  {({ field, meta, form }) => {
                                    return (
                                      <>
                                        <Label
                                          className="newaudit-label-text "
                                          htmlFor="exampleEmail"
                                        >
                                          Weather Station{" "}
                                        </Label>
                                        <Input
                                          {...field}
                                          className="update-profile-input new-audit-input"
                                          style={{
                                            backgroundColor: "#F5F6F8",
                                            border:
                                              form.touched?.weatherStationId &&
                                              form.errors?.weatherStationId
                                                ? "1px solid red"
                                                : "1px solid #DFDFDF",
                                          }}
                                          id="exampleEmail"
                                          name="weatherStationId"
                                          placeholder=""
                                          type="select"
                                          onChange={(e) => {
                                            handleWeatherChange(e);
                                            field.onChange(e);
                                          }}
                                          value={field.value.weatherStationId}
                                        >
                                          <option value="">
                                            Select station
                                          </option>

                                          {weatherStation?.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.weatherStationTitle}
                                                </option>
                                              );
                                            }
                                          )}
                                        </Input>
                                      </>
                                    );
                                  }}
                                </Field>
                              </FormGroup>
                            </Col>
                            <Col xl={3}>
                              <FormGroup>
                                <Label
                                  className="newaudit-label-text"
                                  htmlFor="examplePassword"
                                >
                                  Hdd
                                </Label>
                                <Field
                                  className="form-control update-profile-input new-audit-input audit-home-full-width"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border: "1px solid #DFDFDF",
                                    width: "100%",
                                  }}
                                  id="examplePassword"
                                  name="hdd"
                                  placeholder=""
                                  type="text"
                                  value={hdd}
                                  disabled={true}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl={3}>
                              <FormGroup>
                                <Field>
                                  {({ field, meta }) => {
                                    return (
                                      <>
                                        <Label
                                          className="newaudit-label-text"
                                          htmlFor="examplePassword"
                                          style={{ textWrap: "nowrap" }}
                                        >
                                          NBC Climate Zone
                                        </Label>
                                        <Input
                                          {...field}
                                          className="new-audit-input audit-home-full-width"
                                          style={{
                                            backgroundColor: "#F5F6F8",
                                            border: "1px solid #DFDFDF",
                                            width: "100%",
                                          }}
                                          id="examplePassword"
                                          name="nbcClimateZone"
                                          placeholder=""
                                          type="text"
                                          value={zone}
                                          disabled={true}
                                        />
                                      </>
                                    );
                                  }}
                                </Field>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              style={{ marginBottom: "15px" }}
                              className="audit-home-bottom"
                              xl={4}
                            >
                              <FormGroup>
                                <Field>
                                  {({ field, meta, form }) => {
                                    return (
                                      <>
                                        <Label
                                          style={{
                                            fontSize: "16px",
                                            fontFamily: "Work Sans",
                                            fontWeight: 500,
                                            textWrap: "nowrap",
                                          }}
                                          className="newaudit-label-text"
                                          htmlFor="exampleEmail"
                                        >
                                          NBC Prescriptive Tier
                                        </Label>
                                        <Input
                                          {...field}
                                          className="update-profile-input new-audit-input"
                                          style={{
                                            backgroundColor: "#F5F6F8",
                                            border:
                                              form.touched
                                                ?.nbcPerspectiveTierId &&
                                              form.errors?.nbcPerspectiveTierId
                                                ? "1px solid red"
                                                : "1px solid #DFDFDF",
                                          }}
                                          id="exampleEmail"
                                          name="nbcPerspectiveTierId"
                                          placeholder=""
                                          type="select"
                                          onChange={(e) => {
                                            handleNbcChange(e);
                                            field.onChange(e);
                                          }}
                                          value={
                                            field.value.nbcPerspectiveTierId
                                          }
                                        >
                                          <option value="">Select Tier</option>

                                          {nbc?.map((item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.nbcTierTitle}
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
                            <Col xl={4}>
                              <FormGroup>
                                <Field>
                                  {({ field, meta, errors, form }) => {
                                    return (
                                      <>
                                        <Label
                                          className="newaudit-label-text"
                                          htmlFor="examplePassword"
                                        >
                                          House Type{" "}
                                        </Label>
                                        <Input
                                          {...field}
                                          className="update-profile-input new-audit-input"
                                          style={{
                                            backgroundColor: "#F5F6F8",
                                            border:
                                              form.touched?.houseTypeId &&
                                              form.errors?.houseTypeId
                                                ? "1px solid red"
                                                : "1px solid #DFDFDF",
                                          }}
                                          id="examplePassword"
                                          name="houseTypeId"
                                          placeholder=""
                                          type="select"
                                          value={field.value.houseTypeId}
                                          onChange={(e) => {
                                            setHouseTypeId(e.target.value);
                                            field.onChange(e);
                                          }}
                                        >
                                          <option value="">Select Type</option>

                                          <option value="1">Attached</option>
                                          <option value="2">Detached</option>
                                        </Input>
                                      </>
                                    );
                                  }}
                                </Field>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              style={{ marginBottom: "15px" }}
                              className="audit-home-bottom"
                              xl={4}
                            >
                              <FormGroup>
                                <Label
                                  style={{
                                    fontSize: "16px",
                                    fontFamily: "Work Sans",
                                    fontWeight: 500,
                                    textWrap: "nowrap",
                                  }}
                                  className="newaudit-label-text"
                                  htmlFor="exampleEmail"
                                >
                                  FDWR%{" "}
                                </Label>
                                <Field
                                  id="fdwrPercent"
                                  type="number"
                                  name="fdwrPercent"
                                  className="form-control update-profile-input new-audit-input"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border:
                                      touched.fdwrPercent && errors.fdwrPercent
                                        ? "1px solid red"
                                        : "1px solid #DFDFDF",
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl={4}>
                              <FormGroup>
                                <Label
                                  className="newaudit-label-text"
                                  htmlFor="examplePassword"
                                >
                                  Volume{" "}
                                </Label>
                                <Field>
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <Input
                                        {...field}
                                        {...rest}
                                        id="volume"
                                        type="number"
                                        name="volume"
                                        value={field.value.volume}
                                        onChange={(e) => {
                                          setVolume(e.target.value);
                                          handleVolumeChange(e);
                                          field.onChange(e);
                                        }}
                                        disabled={
                                          field.value.nbcPerspectiveTierId ===
                                          ""
                                            ? true
                                            : false
                                        }
                                        className="form-control update-profile-input new-audit-input"
                                        style={{
                                          backgroundColor: "#F5F6F8",
                                          border:
                                            touched.volume && errors.volume
                                              ? "1px solid red"
                                              : "1px solid #DFDFDF",
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </FormGroup>
                            </Col>
                            <Col xl={4}>
                              <FormGroup>
                                <Label
                                  className="newaudit-label-text"
                                  htmlFor="examplePassword"
                                >
                                  Select Unit{" "}
                                </Label>
                                <Field>
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <Input
                                        {...field}
                                        {...rest}
                                        id="unit"
                                        type="select"
                                        name="unit"
                                        value={field.value.unit}
                                        onChange={(e) => {
                                          handleUnitChange(e);
                                          field.onChange(e);
                                        }}
                                        disabled={
                                          field.value.nbcPerspectiveTierId ===
                                            "" || field.value.volume === ""
                                            ? true
                                            : false
                                        }
                                        className="form-control update-profile-input new-audit-input audit-home-full-width"
                                        style={{
                                          backgroundColor: "#F5F6F8",
                                          width: "40%",
                                          border:
                                            touched.unit && errors.unit
                                              ? "1px solid red"
                                              : "1px solid #DFDFDF",
                                        }}
                                      >
                                        <option value="">select</option>
                                        <option value="2">m3</option>
                                        <option value="1">ft3</option>
                                      </Input>
                                    );
                                  }}
                                </Field>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              style={{ marginBottom: "15px" }}
                              className="audit-home-bottom"
                              xl={4}
                            >
                              <FormGroup>
                                <Label
                                  style={{
                                    textWrap: "nowrap",
                                  }}
                                  className="newaudit-label-text"
                                  htmlFor="exampleEmail"
                                >
                                  Credit{" "}
                                </Label>
                                <Input
                                  className="new-audit-input audit-home-full-width"
                                  style={{
                                    backgroundColor: "#F5F6F8",
                                    border: "1px solid rgb(223, 223, 223)",
                                    width: "26%",
                                  }}
                                  id="exampleEmail"
                                  name="email"
                                  placeholder=""
                                  value={credit}
                                  disabled={true}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl={4}>
                              <FormGroup>
                                <Field>
                                  {({ field, form, ...rest }) => {
                                    return (
                                      <>
                                        {" "}
                                        <Label
                                          className="newaudit-label-text"
                                          htmlFor="examplePassword"
                                        >
                                          Required ECP
                                        </Label>
                                        <Input
                                          {...field}
                                          {...rest}
                                          style={{
                                            backgroundColor: "#F5F6F8",
                                            border: "1px solid #DFDFDF",
                                            width: "67%",
                                          }}
                                          id="examplePassword"
                                          name="ecpRequired"
                                          className="new-audit-input audit-home-full-width"
                                          placeholder=""
                                          type="text"
                                          value={newEcpPoints}
                                          disabled
                                        />
                                      </>
                                    );
                                  }}
                                </Field>
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <div
                        style={{ marginTop: 88 }}
                        className="d-flex justify-content-center"
                      >
                        <Button
                          className="new-audit-prev-btn"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            marginTop: "10px",
                            fontSize: "18px",
                            fontFamily: "Work Sans",
                            fontWeight: "500",
                            color: "#2C5AB4",
                            padding: "0px 100px",
                            textWrap: "nowrap",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/dashboard/newauditproperty", {
                              replace: true,
                              state: id,
                            });
                          }}
                        >
                          <span>{"< "}</span>Previous
                        </Button>
                        <Button
                          className="new-audit-next-btn"
                          // onClick={() => {
                          //   if (Object.keys(errors).length) {
                          //     document
                          //       .getElementsByName(Object.keys(errors)[0])[0]
                          //       .focus();
                          //   }
                          // }}
                          style={{
                            backgroundColor: "#2C5AB4",
                            marginTop: "10px",
                            fontSize: "22px",
                            fontFamily: "Work Sans",
                            fontWeight: "500",
                            padding: "5px 150px",
                          }}
                          type="submit"
                        >
                          Next
                        </Button>
                        <Button
                          className="new-audit-prev-btn-extra"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            marginTop: "10px",
                            fontSize: "18px",
                            fontFamily: "Work Sans",
                            fontWeight: "500",
                            color: "transparent",
                            padding: "0px 100px",
                            cursor: "default",
                          }}
                        >
                          {"< "}Previous
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditHomeDetails;
