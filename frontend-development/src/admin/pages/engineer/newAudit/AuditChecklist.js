import React, { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import infoIcon from "../../../assets/svgs/checkOption/info.svg";
import infoActive from "../../../assets/svgs/checkOption/infoActive.svg";
import { Button, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../../component/Header";
import AuditProgress from "../../../component/newAudit/AuditProgress";
import DataInfo from "./DataInfo";
import { tableColumnSchema } from "../../../modules/tanstack_table/colums";
import { useDispatch, useSelector } from "react-redux";
import { setAudit, setReviewAudit } from "../../../../redux/reducers/audit";
import { updateAssemblyData } from "../../../../redux/reducers/assembly";
import { updatedTableColumnSchema } from "../../../modules/tanstack_table/columsUpadate";

const AuditChecklist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(null);
  const [buttonDisable, setDisable] = useState(true);
  const [rowSelection, setRowSelection] = useState([]);
  const { id,categoryNumber } = useLocation().state;
 
  const columns = useMemo(() => categoryNumber == 0 || categoryNumber == 1 ? tableColumnSchema : updatedTableColumnSchema, [categoryNumber]);
  const { assemblyData } = useSelector((state) => state.assembly);
  const { auditData } = useSelector((state) => state.audit);


  const handleNext = () => {
    const selectData = table.getSelectedRowModel().flatRows.map((element) => {
      return element.original;
    });
    const auditObj = {
      categoryName: assemblyData[categoryNumber].categoryName,
      selectedAssemblies: selectData,
    };

    dispatch(setAudit(auditObj, categoryNumber));
    dispatch(updateAssemblyData(selectData, categoryNumber));
    table.resetRowSelection();
    if (categoryNumber < assemblyData.length - 1) {
      navigate(
        `/dashboard/audit-checklist`,
        { replace: true, state: { id: id, categoryNumber: categoryNumber+1 } }
      );
    } else {
      dispatch(setReviewAudit());
      navigate(
        "/dashboard/reviewecm",
        { replace: true, state: { id: id, categoryNumber: categoryNumber } }
      );
    }
  };

  const handlePrevious = () => {
    table.resetRowSelection();
    if (categoryNumber !== 0) {
      navigate(
        `/dashboard/audit-checklist`,
        { replace: true, state: { id: id, categoryNumber: categoryNumber-1 } }
      );
    } else {
      navigate("/dashboard/newaudithome", { replace: true, state: id });
    }
  };
  const rowChecked = () => {
    if (auditData[categoryNumber]?.selectedAssemblies?.length !== 0) {
      let obj = {};
      auditData[categoryNumber]?.selectedAssemblies?.forEach((auditData) => {
        table.getRowModel().rows.forEach((row) => {
          if (row.original.id === auditData.id) {
            obj[row.id] = true;
          }
        });
      });
      table.setRowSelection(obj);
    }
  };

  useEffect(() => {
    if (table.getSelectedRowModel().flatRows.length === 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [rowSelection]);
  useEffect(() => {
    if (assemblyData.length === 0) {
      navigate("/dashboard", { state: id });
    }
  }, [assemblyData]);

  useEffect(() => {
    rowChecked();
  }, [categoryNumber]);

  const table = useReactTable({
    data:
      assemblyData.length === 0 ? [] : assemblyData[categoryNumber].assemblies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

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
          className="text-nowrap m-0 me-4 "
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
            nodes={assemblyData !== 0 ? assemblyData : null}
            activeNumber={categoryNumber + 3}
          />
        </div>
      </div>
      <div
        className="mt-4  mb-5 w-100 bg-white d-flex flex-column align-items-center"
        style={{
          paddingTop: "19px",
          paddingBottom: "19px",
          borderRadius: "15px",
        }}
      >
        <div className="d-flex align-items-center new-audit-title">
          <p className="m-0 p-0">
            {String.fromCharCode(65 + categoryNumber)}.{" "}
            {assemblyData[categoryNumber]?.categoryName}
          </p>
        </div>
        <div
          className="table-responsive"
          style={{
            width: "97%",
          }}
        >
          <Table borderless className="mt-3 new-audit-table">
            <thead
              className="d-flex flex-row"
              style={{
                backgroundColor: "#F5F6F8",
                borderRadius: "10px",
                padding: categoryNumber > 1 ? "14px 0" : 0
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
              <tr className="text-center" style={{ width: "5%" }}>
                <td >
                  <img 
                  style={{opacity:0}}
                    src={
                      infoIcon
                    }
                    alt="info"
                  />
                </td>
              </tr>
            </thead>

            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tbody
                  key={row.original.id}
                  className="mt-3 d-flex flex-row"
                  style={{}}
                >
                  {row
                    .getVisibleCells()
                    .map((cell) =>
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}

                  <tr className="text-center" style={{ width: "5%" }}>
                    <td style={{ cursor: "pointer" }}>
                      <img
                        src={
                          showInfo === row.original?.id ? infoActive : infoIcon
                        }
                        alt="info"
                        onClick={() => setShowInfo(row.original?.id)}
                      />
                    </td>
                  </tr>
                </tbody>
                {showInfo === row.original?.id && (
                  <DataInfo
                    title={row.original.subTitle}
                    data={row.original.assemblyElement}
                    setShowInfo={setShowInfo}
                    totalEffectiveRSI={row.original.totalEffectiveRSI}
                    totalEffectiveRValue={row.original.totalEffectiveRValue}
                  />
                )}
              </React.Fragment>
            ))}
          </Table>
        </div>
        <div className="mt-4">
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
            }}
            onClick={handlePrevious}
          >
            {"< "}Previous
          </Button>
          <Button
            disabled={!buttonDisable}
            className="new-audit-next-btn"
            style={{
              backgroundColor: "#2C5AB4",
              marginTop: "10px",
              fontSize: "22px",
              fontFamily: "Work Sans",
              fontWeight: "500",
              padding: "5px 150px",
            }}
            onClick={handleNext}
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
      </div>
    </div>
  );
};

export default AuditChecklist;
