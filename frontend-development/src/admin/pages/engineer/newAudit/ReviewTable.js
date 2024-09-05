import React, { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import infoIcon from "../../../assets/svgs/checkOption/info.svg";
import infoActive from "../../../assets/svgs/checkOption/infoActive.svg";
import { tableColumnSchema } from "../../../modules/tanstack_table/colums";
import DataInfo from "./DataInfo";
import { useDispatch } from "react-redux";
import { setAudit } from "../../../../redux/reducers/audit";
import { updateAssemblyData } from "../../../../redux/reducers/assembly";
import { updatedTableColumnSchema } from "../../../modules/tanstack_table/columsUpadate";

const ReviewTable = ({ data, categoryIndex, categoryName }) => {
  const [showInfo, setShowInfo] = useState(null);
  const dispatch = useDispatch();
  const columns = useMemo(() => categoryIndex == 0 || categoryIndex == 1 ? tableColumnSchema : updatedTableColumnSchema, [categoryIndex]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  const hanldeSelection = () => {
    const selectData = table.getSelectedRowModel().flatRows.map((element) => {
      return element.original;
    });
    const auditObj = {
      categoryName: categoryName,
      selectedAssemblies: selectData,
    };
    dispatch(setAudit(auditObj, categoryIndex));
    dispatch(updateAssemblyData(selectData, categoryIndex));
  };

  useEffect(() => {
    hanldeSelection();
  }, [rowSelection]);

  useEffect(() => {
    const selectionObject = {};
    for (let i = 0; i < data.length; i++) {
      selectionObject[i] = true;
    }
    setRowSelection(selectionObject);
  }, []);

  return table.getRowModel().rows.map((row) => (
    <>
      <tbody key={row.original.id} className="mt-3 d-flex flex-row" style={{}}>
        {row
          .getVisibleCells()
          .map((cell) =>
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}

        <tr className="text-center" style={{ width: "5%" }}>
          <td style={{ cursor: "pointer" }}>
            <img
              src={showInfo === row.original?.id ? infoActive : infoIcon}
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
    </>
  ));
};

export default ReviewTable;
