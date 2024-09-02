import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryByIdDropdownThunk, fetchProductCategoryDropdownThunk } from "../thunk/category.thunk";


const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false
};

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchCategoryByIdDropdownThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryByIdDropdownThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchCategoryByIdDropdownThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductCategoryDropdownThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchProductCategoryDropdownThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchProductCategoryDropdownThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = category.actions;

export default category.reducer;
