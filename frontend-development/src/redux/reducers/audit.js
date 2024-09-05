import { createSlice } from "@reduxjs/toolkit";

const auditReducer = createSlice({
  name: "audit",
  initialState: {
    auditData: [],
    reviewTableData: [],
    isEdit: false,
    userData: {
      firstName: "",
      lastName: "",
      emailId: "",
      phone: "",
      addressLine1: "",
      userProvinceId: "",
      auditId: 0,
    },
    propertyDetails: {
      title: "",
      address: "",
      city: "",
      propertyProvinceId: "",
      postalCode: "",
      type: "",
    },
    homeDetails: {
      projectName: "",
      addressLine2: "",
      projectProvinceId: "",
      pincode2: "",
      weatherStationId: "",
      hdd: "",
      nbcClimateZone: "",
      nbcPerspectiveTierId: "",
      houseTypeId: "",
      fdwrPercent: "",
      volume: "",
      unit: "",
      credit: "",
      ecpRequired: "",
    },
    isRefresh: true,
  },
  reducers: {
    setEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setAuditData: (state, action) => {
      state.auditData = action.payload;
    },
    setReviewTableData: (state, action) => {
      state.reviewTableData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setHomeData: (state, action) => {
      state.homeDetails = action.payload;
    },
    setPropertyData: (state, action) => {
      state.propertyDetails = action.payload;
    },
    setRefresh: (state, action) => {
      state.isRefresh = action.payload;
    },
  },
});
const {
  setAuditData,
  setEdit,
  setReviewTableData,
  setUserData,
  setHomeData,
  setPropertyData,
  setRefresh,
} = auditReducer.actions;

export const setAudit = (data, position) => {
  return async (dispatch, getState) => {
    let { auditData } = getState().audit;
    let newData = [...auditData];
    newData[position] = data;
    dispatch(setAuditData(newData));
  };
};
export const setWholeAuditData = (data) => {
  return async (dispatch) => {
    dispatch(setAuditData(data));
  };
};
export const setReviewAudit = () => {
  return async (dispatch, getState) => {
    let { auditData } = getState().audit;
    dispatch(setReviewTableData(auditData));
  };
};
export const setUser = (data) => {
  return async (dispatch, getState) => {
    const userData = getState().audit.userData;
    const newData = { ...userData, ...data };
    dispatch(setUserData(newData));
  };
};
export const setProperty = (data) => {
  return async (dispatch, getState) => {
    const propertyData = getState().audit.propertyDetails;
    const newData = { ...propertyData, ...data };
    dispatch(setPropertyData(newData));
  };
};
export const setHome = (data) => {
  return async (dispatch, getState) => {
    const homeDetails = getState().audit.homeDetails;
    const newData = { ...homeDetails, ...data };
    dispatch(setHomeData(newData));
  };
};
export const setIsRefresh = (value) => {
  return async (dispatch) => {
    dispatch(setRefresh(value));
  };
};
export const setIsEdit = (value) => {
  return async (dispatch) => {
    dispatch(setEdit(value));
  };
};

export const resetAudit = () => {
  return async (dispatch) => {
    dispatch(setAuditData([]));
    dispatch(setReviewTableData([]));
    dispatch(setRefresh(true));
    dispatch(setEdit(false));
    dispatch(
      setUserData({
        firstName: "",
        lastName: "",
        emailId: "",
        phone: "",
        addressLine1: "",
        userProvinceId: "",
        auditId: 0,
      })
    );
    dispatch(
      setPropertyData({
        title: "",
        address: "",
        city: "",
        propertyProvinceId: "",
        postalCode: "",
        type: "",
      })
    );
    dispatch(
      setHomeData({
        projectName: "",
        addressLine2: "",
        provinceId: "",
        pincode2: "",
        weatherStationId: "",
        hdd: "",
        nbcClimateZone: "",
        nbcPerspectiveTierId: "",
        houseTypeId: "",
        fdwrPercent: "",
        volume: "",
        credit: "",
        ecpRequired: "",
      })
    );
  };
};

export default auditReducer.reducer;
