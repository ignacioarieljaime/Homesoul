import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setSpinner } from "./spinner";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    token:
      localStorage.getItem("userAuthToken") !== "null"
        ? localStorage.getItem("userAuthToken")
        : null,
    userType:
      localStorage.getItem("userType") !== "null"
        ? localStorage.getItem("userType")
        : null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});
const { setToken, setUserType } = authReducer.actions;

export const userSignUp = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setSpinner(true));
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/signup`,
        data
      );
      localStorage.setItem("userAuthToken", response.data?.responseData?.token);
      localStorage.setItem("userType", response.data?.responseData?.userType);
      dispatch(setToken(response.data?.responseData?.token));
      dispatch(setUserType(response.data?.responseData?.userType));
      toast.success(response.data.responseMessage, {
        position: "top-right",
      });
      navigate();
    } catch (error) {
      toast.error(error.response.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };
};

export const userLogIn = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setSpinner(true));
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        data
      );
      localStorage.setItem("userType", response.data?.responseData?.userType);

      localStorage.setItem(
        "userAuthToken",
        response.data?.responseData?.login_access_token
      );
      dispatch(setToken(response.data?.responseData?.login_access_token));
      dispatch(setUserType(response.data?.responseData?.userType));
      toast.success(response.data.responseMessage, {
        position: "top-right",
      });
      navigate();
    } catch (error) {
      toast.error(error.response?.data?.responseMessage, {
        position: "top-right",
      });
    }
    dispatch(setSpinner(false));
  };
};
export const userLogOut = (navigate) => {
  return async (dispatch) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/logout`,
        { headers }
      );

      localStorage.removeItem("userAuthToken");
      localStorage.removeItem("userType");

      dispatch(setToken(null));
      dispatch(setUserType(null));
      toast.success(response.data.responseMessage, {
        position: "top-right",
      });
      navigate();
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
};

export const userDelete = (navigate) => {
  return async (dispatch) => {
    dispatch(setSpinner(true));
    try {
      const token = localStorage.getItem("userAuthToken");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/user/delete`,
        { headers }
      );

      localStorage.removeItem("userAuthToken");

      dispatch(setToken(null));
      navigate();
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
};

export default authReducer.reducer;
