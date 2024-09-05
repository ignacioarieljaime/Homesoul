import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setSpinner } from "./spinner";
import { toast } from "react-toastify";
import { setWholeAuditData } from "./audit";

const assemblyReducer = createSlice({
  name: "assembly",
  initialState: {
    assemblyData: [],
  },
  reducers: {
    setAssembly: (state, action) => {
      state.assemblyData = action.payload;
    },
    updateAssembly: (state, action) => {
      state.assemblyData = action.payload;
    },
  },
});
const { setAssembly } = assemblyReducer.actions;

export const getAssembly = (homeType, zone, navigate, auditId) => {
  return async (dispatch, getState) => {
    const { isEdit, auditData } = getState().audit
    dispatch(setSpinner(true));
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-assembly`, { params: { homeType: homeType, zone: zone, isEdit: isEdit, auditId: auditId } }
      );
      if (isEdit) {

        let assemblies = response.data?.responseData?.finalAssemblies
        let selectedAssemblies = response.data?.responseData?.selectedAssembliesList


        selectedAssemblies.forEach(modification => {
          modification.selectedAssemblies.forEach(selectedAssembly => {
            let categoryId, assemblyId, cost;

            assemblies.forEach(category => {
              category.assemblies.forEach(assembly => {
                if (assembly.id === selectedAssembly.id) {
                  categoryId = category.categoryName;
                  assemblyId = assembly.id;
                }
              });
            });

            cost = selectedAssembly.cost;

            assemblies.forEach(category => {
              if (category.categoryName === categoryId) {
                category.assemblies.forEach(assembly => {
                  if (assembly.id === assemblyId) {
                    assembly.standardCost = cost;
                  }
                });
              }
            });
          });
        });
      }

      dispatch(setAssembly(response.data?.responseData?.finalAssemblies));
      if (isEdit && auditData.length === 0) {
        dispatch(setWholeAuditData(response.data?.responseData?.selectedAssembliesList))
      }
      navigate()
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }

    dispatch(setSpinner(false));
  };
};

export const updateAssemblyData = (data, index) => {
  return async (dispatch, getState) => {
    const { assemblyData } = getState().assembly;

    let newAssemblyData = assemblyData[index].assemblies;
    data.map((value) => {
      newAssemblyData = newAssemblyData.map((element) => {
        if (element.id === value.id) {
          return value;
        } else {
          return element;
        }
      });
    });

    let newObj = [...assemblyData]
    newObj[index] = { ...newObj[index], assemblies: newAssemblyData };

    dispatch(setAssembly(newObj));
  };
};

export default assemblyReducer.reducer;
