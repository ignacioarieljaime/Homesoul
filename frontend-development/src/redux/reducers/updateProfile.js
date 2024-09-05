import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setSpinner } from "./spinner";

const updateProfileReducer = createSlice({
  name: "profile",
  initialState: {
    userData: null,
  },
  reducers: {
    setData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

const { setData } = updateProfileReducer.actions;

export const getUserData = (navigate) => {
  return async (dispatch) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile`,
        { headers }
      );
      dispatch(setData(response.data?.responseData?.data));
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

export const updateUserData = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/profile/update`,
        data,
        { headers }
      );
      toast.success(response.data.responseMessage, {
        position: "top-right",
      });
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

export default updateProfileReducer.reducer;
