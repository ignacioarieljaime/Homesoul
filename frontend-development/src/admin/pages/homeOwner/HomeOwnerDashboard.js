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
import { useLocation, useNavigate } from "react-router-dom";

const HomeOwnerDashboard = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [auditData, setAuditData] = useState(null);
  const userData = useSelector((state) => state.profile.userData);
  const dispatch = useDispatch();
  const toggle = () => setModal(!modal);
  const { currentPage } = useSelector((state) => state.dashboardFilter);
  const [pageCount, setPageCount] = useState(0);

  const location = useLocation();
  const { state } = location;

  const handlePagination = (page) => {
    dispatch(setDashboardFilters(0, page, 0));
  };
  const handleSubmit = async () => {
    toggle();
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/audit/create-audit-request`,
        {
          propertyId: state,
        },
        { headers }
      );
      toast.success(response.data.responseMessage, {
        position: "top-right",
      });
      handleGetAuditData();
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

  const handleGetAuditData = async () => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(
        `${baseUrl}/audit/get-customer-audit-requests`,
        { headers, params: { page: currentPage + 1, propertyId: state } }
      );
      setAuditData(response.data?.responseData);
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
      <div>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{ background: "#fff", borderRadius: 10 }}
        >
          <ModalHeader
            style={{ color: "#333", fontFamily: "Work Sans Regular" }}
            toggle={toggle}
          >
            Audit Conformation
          </ModalHeader>
          <ModalBody
            style={{
              fontFamily: "Work Sans SemiBold",
              color: "#2B2A29",
              fontSize: 22,
              textAlign: "center",
            }}
          >
            Are you sure you want to submit?
          </ModalBody>

          <ModalFooter>
            <Button
              style={{ backgroundColor: "#2C5AB4" }}
              onClick={handleSubmit}
            >
              YES
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              NO
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #1EAF67",
          borderRadius: 20,
          padding: "2.2%",
        }}
        className="d-flex customer-Assessment-container"
      >
        <div style={{ height: 63, width: 72 }}>icon</div>
        <div style={{ width: "54%", margin: "1% 14% 1% 4%" }}>
          <p
            style={{
              fontFamily: "Work Sans SemiBold",
              fontSize: 26,
              color: "#2B2A29",
              marginBottom: 27,
            }}
          >
            Take our simple questionnaire.
          </p>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: 22,
              lineHeight: "normal",
              color: "#2B2A29",
              fontWeight: 300,
              margin: 0,
            }}
          >
            Let us create a personalized home modernization plan and make sure
            you get the support you need every step of the way.
          </p>
        </div>
        <div
          style={{ width: "23%" }}
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
            onClick={toggle}
            className="customer-dashboard-button"
          >
            Take Assessment
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
        {auditData
          ? auditData?.requests.map((audit) => (
              <DashboardCard key={audit.id} data={audit} />
            ))
          : null}
      </div>
      <div className="w-100 d-flex justify-content-center pt-3!@">
        <PaginationComp
          initialPage={currentPage}
          pageCount={auditData?.totalRecord == 0 ? 0 : pageCount}
          handleRequest={handlePagination}
        />
      </div>
    </div>
  );
};

export default HomeOwnerDashboard;
