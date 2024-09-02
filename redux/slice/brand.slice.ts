import { createSlice } from "@reduxjs/toolkit";
import { fetchBrandDropdownThunk } from "../thunk/brand.thunk";


const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh:false
};

export const brand = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchBrandDropdownThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchBrandDropdownThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchBrandDropdownThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = brand.actions;

export default brand.reducer;
