import { createSlice } from "@reduxjs/toolkit";
import { fetchUomDropdownThunk } from "../thunk/uom.thumk";


const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh:false
};

export const uom = createSlice({
  name: "uom",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchUomDropdownThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchUomDropdownThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchUomDropdownThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = uom.actions;

export default uom.reducer;
