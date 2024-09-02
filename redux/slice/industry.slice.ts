import { createSlice } from "@reduxjs/toolkit";
import { fetchIndustryDropdownThunk } from "../thunk/industry.thunk";


const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh:false
};

export const industry = createSlice({
  name: "industry",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchIndustryDropdownThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchIndustryDropdownThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchIndustryDropdownThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = industry.actions;

export default industry.reducer;
