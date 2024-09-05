import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import MenuButton from "../../component/engdashboard/MenuButton";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import toggleSvg from "../../assets/svgs/dashboard/toggle.svg";
import filterSvg from "../../assets/svgs/dashboard/filter.svg";
import DashboardCard from "../../component/engdashboard/DashboardCard";
import PaginationComp from "../../component/engdashboard/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setAuditReport } from "../../../redux/reducers/auditReport";
import { setSpinner } from "../../../redux/reducers/spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { setDashboardFilters } from "../../../redux/reducers/dashboard";
import { useNavigate } from "react-router-dom";

const EngineerDashboard = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { reportData } = useSelector((state) => state.auditReport);
  const { currentPage, sortBy, activeButton } = useSelector(
    (state) => state.dashboardFilter
  );
  const [pageCount, setPageCount] = useState(0);
  const [count, setCount] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (mainText) => {
    dispatch(setDashboardFilters(mainText, 0, "null"));
  };
  const handleRequestReport = () => {
    if (activeButton === 0) {
      dispatch(
        setAuditReport(null, currentPage + 1, sortBy.toString().toLowerCase(), () =>
          navigate("/login")
        )
      );
    } else {
      dispatch(
        setAuditReport(
          activeButton,
          currentPage + 1,
          sortBy.toString().toLowerCase(),
          () => navigate("/login")
        )
      );
    }
  };

  const handlePagination = (page) => {
    dispatch(setDashboardFilters(activeButton, page, sortBy));
  };

  const handleSortByDay = (sortBy) => {
    dispatch(setDashboardFilters(activeButton, currentPage, sortBy));
    handleRequestCount(sortBy.toString().toLowerCase())
  };
  const handleRequestCount = async (sortBy) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-request-count`,
        {
          params: { sortBy: sortBy },
          headers: headers,
        }
      );
      setCount(response.data?.responseData);
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
    handleRequestReport();
  }, [activeButton, currentPage, sortBy]);
  useEffect(() => {
    setPageCount(reportData.totalPage || 0);
  }, [reportData]);
  useEffect(() => {
    handleRequestCount();
  }, [activeButton]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return reportData.length === 0 ? null : (
    <div>
      <div style={{margin:"27px 0 21px 0"}}>
        <Header button={true} isImage />
      </div>
      <div className="dashboard-main-outer">
        <div className="dashboard-main-link d-flex gap-1  ">
          <MenuButton
            mainText="Total"
            subText={count?.total}
            isActive={activeButton === 0}
            onClick={() => handleButtonClick(0)}
          />
          <MenuButton
            mainText="New"
            subText={count?.new}
            badge={count?.new == 0 ? false : true}
            isActive={activeButton === 1}
            onClick={() => handleButtonClick(1)}
          />
          <MenuButton
            mainText="Accepted"
            subText={count?.accepted}
            isActive={activeButton === 2}
            onClick={() => handleButtonClick(2)}
          />
          <MenuButton
            mainText="On Going"
            subText={count?.onGoing}
            isActive={activeButton === 3}
            onClick={() => handleButtonClick(3)}
          />
          <MenuButton
            mainText="Completed"
            subText={count?.completed}
            isActive={activeButton === 4}
            onClick={() => handleButtonClick(4)}
          />
          <MenuButton
            mainText="Rejected"
            subText={count?.rejected}
            textColor="#FF88A9"
            isActive={activeButton === 5}
            onClick={() => handleButtonClick(5)}
            last
          />
        </div>
        <div className="dashboard-dropdown">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              className="bg-white text-nowrap "
              style={{ color: "#2B2A29", fontSize: "16px" }}
            >
              <span style={{ paddingRight: "10px" }}>
                <img style={{ height: "15px" }} src={filterSvg} />
              </span>
              <span style={{ color: "#707070" }}>Sort By:</span>
              <span style={{ color: "#2B2A29", paddingLeft: "10px" }}>
                {sortBy == "null"||0 ? "Default" : sortBy}
              </span>
              <span style={{ paddingLeft: "10px" }}>
                <img src={toggleSvg} />
              </span>
            </DropdownToggle>
            <DropdownMenu className="bg-white w-100 text-center">
              <DropdownItem onClick={() => handleSortByDay("null")}>
                ---Select---
              </DropdownItem>
              <DropdownItem onClick={() => handleSortByDay("Today")}>
                Today
              </DropdownItem>
              <DropdownItem onClick={() => handleSortByDay("This Week")}>
                This Week
              </DropdownItem>
              <DropdownItem onClick={() => handleSortByDay("This Month")}>
                This Month
              </DropdownItem>
              <DropdownItem onClick={() => handleSortByDay("This Year")}>
                This Year
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="d-flex flex-column gap-3 pt-4">
        {reportData.requests.length === 0 ? (
          <p className="text-center">No Records Found</p>
        ) : (
          reportData?.requests?.map((element) => (
            <DashboardCard key={element.id} details={element} />
          ))
        )}
      </div>
      <div className="w-100 d-flex justify-content-center pt-3!@">
        <PaginationComp
          initialPage={currentPage}
          pageCount={reportData?.totalRecord == 0 ? 0 : pageCount}
          handleRequest={handlePagination}
        />
      </div>
    </div>
  );
};

export default EngineerDashboard;
