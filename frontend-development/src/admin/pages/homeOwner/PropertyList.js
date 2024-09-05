import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import DashboardCard from "../../component/customerDashboard/DashboardCard";
import { setSpinner } from "../../../redux/reducers/spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserData } from "../../../redux/reducers/updateProfile";
import PaginationComp from "../../component/engdashboard/Pagination";
import { setDashboardFilters } from "../../../redux/reducers/dashboard";
import { useNavigate } from "react-router-dom";
import HomeListCard from "../../component/customerDashboard/HomeListCard";

const PropertyList = () => {
  const navigate = useNavigate();
  const [auditData, setAuditData] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [totalPage, setSetTotalPage] = useState(null);
  const userData = useSelector((state) => state.profile.userData);
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.dashboardFilter);
  const [pageCount, setPageCount] = useState(0);

  const handlePagination = (page) => {
    dispatch(setDashboardFilters(0, page, 0));
  };

  const handleGetAuditData = async () => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${baseUrl}/customer/get-properties`, {
        headers,
        params: { page: currentPage + 1 },
      });
      setPropertyData(response.data?.responseData.properties);
      setPageCount(response?.data?.responseData?.totalPage);
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
    dispatch(getUserData(() => navigate("/login")));
  }, []);

  useEffect(() => {
    handleGetAuditData();
  }, [currentPage]);

  useEffect(() => {
    setPageCount(auditData?.totalPage || 0);
  }, [auditData]);

  return (
    <div>
      <Header />
      <div></div>
      <div className="w-100 d-flex justify-content-end">
        <div
          style={{ width: "23%", justifyContent: "flex-end" }}
          className="customer-Assessment-button-div"
        >
          <Button
            style={{
              margin: "17% 0 6% 0",
              backgroundColor: "#2C5AB4",
              borderRadius: 10,
              fontFamily: "Work Sans Medium",
              fontSize: 22,
              color: "#FFF",
              width: "100%",
              padding: "5.5%",
            }}
            onClick={() => navigate("addHome")}
            className="customer-dashboard-button"
          >
            Register My Home
          </Button>
        </div>
      </div>

      <div
        style={{
          margin: "4% 0 4% 0",
          fontSize: 50,
          color: "#F4AD7E",
          paddingLeft: "1%",
        }}
      >
        <p className="m-0 w-100" style={{ fontWeight: "normal" }}>
          Hi {userData?.firstName},
        </p>
        <p className="m-0 w-100">
          {" "}
          We recommend to help you{" "}
          <span style={{ fontWeight: 600 }}> reduce Future energy goals</span>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {propertyData?.map((data, index) => {
          return <HomeListCard data={data} key={index} />;
        })}
      </div>
      <div className="w-100 d-flex justify-content-center pt-3!@">
        <PaginationComp
          initialPage={currentPage}
          pageCount={propertyData?.totalRecord == 0 ? 0 : pageCount}
          handleRequest={handlePagination}
        />
      </div>
    </div>
  );
};

export default PropertyList;
