import React, { useMemo, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Header from "../../../component/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { faArrowUp, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { tableColumnSchema } from "../../../modules/tanstack_table/colums";
import { useDispatch, useSelector } from "react-redux";
import ReviewTable from "./ReviewTable";
import { setSpinner } from "../../../../redux/reducers/spinner";
import { setHome, setIsEdit } from "../../../../redux/reducers/audit";

const ReviewEcm = () => {
  const navigate = useNavigate();
  const columns = useMemo(() => tableColumnSchema, []);
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = useState([]);
  const {
    reviewTableData,
    auditData,
    userData,
    homeDetails,
    isEdit,
    propertyDetails,
  } = useSelector((state) => state.audit);

  const { id, categoryNumber } = useLocation().state;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleGenerate = async () => {
    let totalECP = 0;
    const extractedData = auditData.flatMap((category) => {
      return category.selectedAssemblies.map((assembly) => {
        totalECP += Number(assembly.ecPoints);
        return {
          assemblyId: assembly.id,
          cost: parseFloat(assembly.standardCost),
        };
      });
    });
    const postAuditData = {
      ...userData,
      ...homeDetails,
      ...propertyDetails,
      totalECP: totalECP,
      selectedAssembly: extractedData,
      isEdit: isEdit,
    };

    dispatch(setSpinner(true));

    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/audit/create-audit`,
        postAuditData,
        { headers }
      );
      toast.success(response.data?.responseMessage, {
        position: "top-right",
      });
      navigate("/dashboard/checkoption", {
        replace: true,
        state: response.data.responseData.auditId,
      });
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate("/login");
      } else {
        dispatch(setHome(error.response.data?.responseData || { auditId: 0 }));
        dispatch(setIsEdit(true));
        navigate("/dashboard/newaudithome", {
          replace: true,
          state: error.response.data?.responseData || 0,
        });
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
    dispatch(setSpinner(false));
  };

  const handleNavigate = async (categoryNumber) => {
    navigate(`/dashboard/audit-checklist`, {
      replace: true,
      state: { id: id, categoryNumber: categoryNumber },
    });
  };

  const table = useReactTable({
    data: reviewTableData[0]?.selectedAssemblies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  useEffect(() => {
    if (auditData.length === 0) {
      navigate("/dashboard", { state: id });
    }
  }, [auditData]);

  return (
    <div>
      <Header />
      <div className="d-flex flex-row justify-content-left mb-3 align-items-center  ">
        <p
          style={{
            fontSize: "20px",
            color: "#2B2A29",
            fontFamily: "Work Sans",
            fontWeight: 500,
          }}
          className="text-nowrap m-0 "
        >
          New Audit Flow
        </p>
        <div
          style={{ width: "67%", borderRadius: "10px" }}
          className="d-flex justify-content-center  align-items-center"
        >
          <p
            style={{
              textAlign: "center",
              color: "#F4AD7E",
              fontSize: "35px",
              fontFamily: "Work Sans",
              fontWeight: 500,
              marginBottom: 0,
            }}
          >
            Review all selected "ECM"
          </p>
        </div>
      </div>
      <div
        className="mb-5 w-100 bg-white overflow-scroll scrollbar-hidden "
        style={{
          paddingTop: "19px",
          paddingBottom: "19px",
          borderRadius: "15px",
        }}
      >
        <Table
          borderless
          className="mt-3 new-audit-table"
          style={{
            width: "97%",
            margin: "0 1.5%",
          }}
        >
          <thead
            className="d-flex flex-row"
            style={{
              backgroundColor: "#F5F6F8",
              borderRadius: "10px",
            }}
          >
            {table
              .getHeaderGroups()
              .map((headerGroup) =>
                headerGroup.headers.map((header) =>
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                )
              )}
            <tr style={{ width: "5%" }}>
              <td className=""></td>
            </tr>
          </thead>
          {reviewTableData.map((category, index) => (
            <React.Fragment key={index}>
              <div className="d-flex align-items-center justify-content-between  review-audit-title">
                <p className="m-0 p-0">
                  {String.fromCharCode(65 + index)}. {category.categoryName}
                </p>
                <div
                  style={{ cursor: "pointer" }}
                  className="d-flex flex-row align-items-center me-4"
                  onClick={() => handleNavigate(index)}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ backgroundColor: "transparent", color: "white" }}
                  />
                  <p
                    className="m-0 p-0"
                    style={{
                      backgroundColor: "transparent",
                      fontSize: "18px",
                      fontWeight: 400,
                      fontFamily: "Work Sans Regular",
                    }}
                  >
                    Edit
                  </p>
                </div>
              </div>
              <ReviewTable
                categoryName={category.categoryName}
                categoryIndex={index}
                data={category.selectedAssemblies}
              />
            </React.Fragment>
          ))}
        </Table>
        <div className="w-100 d-flex justify-content-between px-3 mt-4">
          <Button
            style={{
              backgroundColor: "transparent",
              border: "none",
              marginTop: "10px",
              fontSize: "18px",
              fontFamily: "Work Sans",
              fontWeight: "500",
              color: "#2C5AB4",
            }}
            onClick={(e) => {
              navigate(`/dashboard/audit-checklist`, {
                replace: true,
                state: { id: id, categoryNumber: categoryNumber },
              });
            }}
          >
            {"< "}Previous
          </Button>
          <Button
            style={{
              backgroundColor: "#2C5AB4",
              marginTop: "10px",
              fontSize: "22px",
              fontFamily: "Work Sans",
              fontWeight: "500",
              padding: "5px ",
              width: "37%",
            }}
            onClick={handleGenerate}
          >
            Generate Results
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              border: "none",
              marginTop: "10px",
              fontSize: "18px",
              fontFamily: "Work Sans",
              fontWeight: "500",
              color: "#2C5AB4",
            }}
            onClick={scrollToTop}
          >
            Back To Top
            <FontAwesomeIcon style={{ marginLeft: "7px" }} icon={faArrowUp} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewEcm;
