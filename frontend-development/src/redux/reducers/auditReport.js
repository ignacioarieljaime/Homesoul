import { createSlice } from "@reduxjs/toolkit";
import { setSpinner } from "./spinner";
import axios from "axios";
import { toast } from "react-toastify";

const auditReportReducer = createSlice({
  name: "auditReport",
  initialState: {
    reportData: [],
  },
  reducers: {
    setReportData: (state, action) => {
      state.reportData = action.payload;
    },
  },
});
const { setReportData } = auditReportReducer.actions;

export const setAuditReport = (status, page, sortBy, navigate) => {
  return async (dispatch) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/audit/get-requests`,
        {
          params: { page: page, status: status, sortBy: sortBy },
          headers: headers,
        }
      );
      dispatch(setReportData(response.data.responseData));
    } catch (error) {
      if (error.response.request.status === 401) {
        window.location.reload();
        localStorage.removeItem("userAuthToken");
        navigate();
      } else {
        toast.error(error.response.data?.responseMessage, {
          position: "top-right",
        });
      }
    }
    dispatch(setSpinner(false));
  };
};

export default auditReportReducer.reducer;
