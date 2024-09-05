import { useState, useEffect } from "react";
import CheckBox from "../../component/CheckBox";
import CurrencyInput from "react-currency-input-field";

const CostCell = ({ row, table }) => {
  const [isUnselecting, setIsUnselecting] = useState(false);
  const { rowSelection } = table.getState();
  const [isNegative, setNegative] = useState(row.original.standardCost < 0);

  const handleChange = (value) => {
    if (row.getIsSelected()) {
      row.toggleSelected();
      setIsUnselecting(true);
    }
    let values = Number(value.replace(/[^0-9.-]/g, ""));
    if (values < 0) {
      setNegative(true);
    } else {
      setNegative(false);
    }
    if (values === null) {
      row.original = { ...row.original, standardCost: `${0}` };
    } else {
      row.original = { ...row.original, standardCost: `${values}` };
    }
  };

  useEffect(() => {
    if (isUnselecting) {
      row.toggleSelected();
      setIsUnselecting(false);
    }
  }, [rowSelection]);

  return (
    <tr
      key={row.id}
      className="text-center ecm-cost"
      style={{ width: "10%", minWidth: "130px" }}
    >
      <td
        className="w-100"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CurrencyInput
          className="form-control"
          style={{
            backgroundColor: "#F5F6F8",
            border: "1px solid #AEADAD",
            borderRadius: 10,
            color: isNegative ? "red" : "#2B2A29",
            fontFamily: "Work Sans Medium",
            fontSize: 16,
            textAlign: "center",
          }}
          defaultValue={row.original.standardCost}
          decimalsLimit={2}
          prefix="$"
          intlConfig={{ locale: "en-US", currency: "USD" }}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </td>
    </tr>
  );
};

export const tableColumnSchema = [
  {
    header: ({ column }) => (<>

      <tr
        key={column.id}
        className="ecm-description"
        style={{
          width: "60%",
          justifyContent: "start",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          fontFamily: "Work Sans SemiBold",
          fontSize: 18,
          color: "#2B2A29",
        }}
      >
        <td style={{ textAlign: "left", paddingLeft: "4%" }} className="">
          ECM Description
        </td>
      </tr><div style={{ backgroundColor: "#CBC7C7", width: 1, height: 35, alignSelf: "center" }} ></div></>
    ),
    cell: ({ row, table }) => (
      <CheckBox
        key={row.id}
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          onChange: row.getToggleSelectedHandler(),
        }}
        text={row.renderValue("assemblyTitle")}
        table={table}
        width="60%"
        className="ecm-description"

      />
    ),
    id: "assemblyTitle",
    accessorKey: "assemblyTitle",
  },
  {
    header: ({ column }) => (<> <tr key={column.id} style={{ width: "15%", minWidth: "130px" }} className="effective-rsi">
      <td
        className=""
        style={{
          fontFamily: "Work Sans SemiBold",
          fontSize: 18,
          color: "#2B2A29",
        }}
      >
        Effective
        <br />
        RSI
      </td>
    </tr>
      <div style={{ backgroundColor: "#CBC7C7", width: 1, height: 35, alignSelf: "center" }} ></div>
    </>

    ),
    cell: ({ row }) => {
      return (<><tr
        key={row.id}
        className="text-center effective-rsi"
        style={{ width: "15%", minWidth: "130px" }}
      >
        <td
          className="w-100"
          style={{
            fontFamily: "Work Sans Medium",
            fontSize: 16,
            color: "#2B2A29",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {row.renderValue("totalEffectiveRSI")}
        </td>
      </tr>
        <div style={{ backgroundColor: "#CBC7C7", width: 1, height: 35, alignSelf: "center" }} ></div></>

      );
    },
    id: "totalEffectiveRSI",
    accessorKey: "totalEffectiveRSI",
  },
  {
    header: ({ column }) => (<><tr key={column.id} style={{ width: "10%", minWidth: "130px" }} className="ecp-column">
      <td
        className=""
        style={{
          fontFamily: "Work Sans SemiBold",
          fontSize: 18,
          color: "#2B2A29",
        }}
      >
        ECP
      </td>
    </tr>
      <div style={{ backgroundColor: "#CBC7C7", width: 1, height: 35, alignSelf: "center" }} ></div>
    </>

    ),
    cell: ({ row }) => (<><tr
      key={row.id}
      className="text-center ecp-column"
      style={{ width: "10%", minWidth: "130px" }}
    >
      <td
        className="w-100"
        style={{
          fontFamily: "Work Sans Medium",
          fontSize: 16,
          color: "#2B2A29",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {row.renderValue("ecPoints")}
      </td>
    </tr>
      <div style={{ backgroundColor: "#CBC7C7", width: 1, height: 35, alignSelf: "center" }} ></div>
    </>

    ),
    id: "ecPoints",
    accessorKey: "ecPoints",
  },
  {
    header: ({ column }) => (<><tr key={column.id} style={{ width: "10%", minWidth: "130px" }} className="ecm-cost">
      <td
        className=""
        style={{
          fontFamily: "Work Sans SemiBold",
          fontSize: 18,
          color: "#2B2A29",
        }}
      >
        ECM Cost
      </td>
    </tr>
    </>

    ),
    cell: (prop) => <CostCell {...prop} />,
    id: "standardCost",
    accessorKey: "standardCost",
  },
];
