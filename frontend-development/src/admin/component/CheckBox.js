import React from "react";
import { Input } from "reactstrap";

function CheckBox({ text, className, ...rest }) {
  return (
    <>
      <tr
        onClick={rest.onChange}
        className={className}
        style={{
          width: rest.width,
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          justifyContent: "start",
          cursor: "pointer",
        }}
      >
        <td className="d-flex flex-row">
          <Input
            type="checkbox"
            {...rest}
            value={0}
            style={{ marginRight: 10, cursor: "pointer" }}
          />
          <p style={{ fontFamily: "Work Sans Medium", fontSize: 18, color: "#2B2A29" }}>{text}</p>
        </td>
      </tr>
      <div style={{ backgroundColor: "#CBC7C7", width: 1, height: 35,alignSelf:"center" }} ></div>
    </>
  );
}

export default CheckBox;
