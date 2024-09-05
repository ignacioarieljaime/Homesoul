import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";

const DataInfo = ({
  title,
  data,
  setShowInfo,
  totalEffectiveRSI,
  totalEffectiveRValue,
}) => {
  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
      <div
        className="mt-3 d-flex justify-content-center flex-column align-items-center custom-table-bg align-self-center"
        style={{
          backgroundColor: "#F5F6F8",
          width: "95%",
          borderRadius: "20px",
          paddingTop: "26px",
          paddingBottom: "24px",
        }}
      >
        <div
          className="d-flex flex-row justify-content-center"
          style={{ width: "97%" }}
        >
          <p
            className="p-0 text-center"
            style={{
              fontSize: "20px",
              fontWeight: "500",
              alignSelf: "center",
              margin: "0 auto",
            }}
          >
            {title}
          </p>
          <FontAwesomeIcon
            className="close_icon"
            style={{
              position: "relative",
              alignSelf: "flex-end",
              height: "22px",
              width: "22px",
              color: "#2C5AB4",
              cursor: "pointer",
            }}
            icon={faCircleXmark}
            onClick={() => setShowInfo(null)}
          />
        </div>
        <Table
          borderless
          className="mt-3 new-audit-data-table"
          style={{
            width: "90%",
            backgroundColor: "#F5F6F8",
          }}
        >
          <thead
            className="d-flex flex-row mt-2"
            style={{
              backgroundColor: "#F5F6F8",
              borderTop: "1px solid #CBC7C7",
              borderBottom: "1px solid #CBC7C7",
            }}
          >
            <tr
              className=""
              style={{
                width: "25%",
                justifyContent: "start",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              <td className="text-start">Element</td>
            </tr>
            <tr style={{ width: "55%", justifyContent: "start" }}>
              <td className="text-start">Details</td>
            </tr>
            <tr style={{ width: "10%" }}>
              <td className="">Table</td>
            </tr>
            <tr style={{ width: "15%" }}>
              <td className="">Effective RSI</td>
            </tr>
          </thead>
          {data.map((element, index) => (
            <tbody
              key={element.id}
              className="mt-3 d-flex flex-row"
              style={{
                borderBottom:
                  index === data?.length - 1 ? "1px solid #CBC7C7" : "",
              }}
            >
              <tr
                className=""
                style={{
                  width: "25%",
                  justifyContent: "start",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              >
                <td className="">{element.elementTitle}</td>
              </tr>
              <tr className="justify-content-start" style={{ width: "55%" }}>
                <td className="text-start">{element.elementDetails}</td>
              </tr>
              <tr style={{ width: "10%" }}>
                <td className="">{element.table}</td>
              </tr>
              <tr style={{ width: "15%" }}>
                <td className="">{element.effectiveRSI}</td>
              </tr>
            </tbody>
          ))}
          <tfoot className="mt-3 d-flex flex-row" style={{}}>
            <tr
              className=""
              style={{
                width: "25%",
                justifyContent: "start",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              <td className=""></td>
            </tr>
            <tr
              className="d-flex flex-column justify-content-start align-items-start"
              style={{ width: "55%" }}
            >
              <td className="">Total Effective RSI</td>
              <td className="">Total Effective R Value</td>
            </tr>
            <tr style={{ width: "10%" }}>
              <td className=""></td>
            </tr>
            <tr
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ width: "15%" }}
            >
              <td className="">{totalEffectiveRSI}</td>
              <td className="">{totalEffectiveRValue}</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
};

export default DataInfo;
