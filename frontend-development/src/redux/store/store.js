import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import spinnerReducer from "../reducers/spinner";
import assemblyReducer from "../reducers/assembly";
import auditReducer from "../reducers/audit";
import auditReportReducer from "../reducers/auditReport";
import dashboardReducer from "../reducers/dashboard";

import { thunk } from "redux-thunk";
import updateProfile from "../reducers/updateProfile";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    spinner: spinnerReducer,
    profile: updateProfile,
    assembly: assemblyReducer,
    audit: auditReducer,
    auditReport: auditReportReducer,
    dashboardFilter: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(),
});
