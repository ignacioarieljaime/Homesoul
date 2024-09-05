import { createSlice } from "@reduxjs/toolkit";

const spinnerReducer = createSlice({
  name: "spinner",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
const { setLoading } = spinnerReducer.actions;

export const setSpinner = (value) => {
  return async (dispatch) => {
    dispatch(setLoading(value));
  };
};

export default spinnerReducer.reducer;
