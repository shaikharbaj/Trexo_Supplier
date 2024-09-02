import { createSlice } from "@reduxjs/toolkit";
import { fetchAttributeDropdownByCategoryThunk } from "../thunk/attribute.thunk";


const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh:false
};

export const attribute = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAttributeDropdownByCategoryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchAttributeDropdownByCategoryThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchAttributeDropdownByCategoryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = attribute.actions;

export default attribute.reducer;
