import { createSlice } from "@reduxjs/toolkit";

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    currentPage: 0,
    sortBy: "null",
    activeButton: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
  },
});
const { setActiveButton, setCurrentPage, setSortBy } = dashboardReducer.actions;

export const setDashboardFilters = (status, page, sortBy) => {
  return async (dispatch) => {
    dispatch(setActiveButton(status));
    dispatch(setCurrentPage(page));
    dispatch(setSortBy(sortBy));
  };
};

export default dashboardReducer.reducer;
