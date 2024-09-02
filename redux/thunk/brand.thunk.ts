import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk to fetch brand dropdown
export const fetchBrandDropdownThunk = createAsyncThunk(
  "brand/dropdown",
  async () => {
    try {
      const res = await privateClient.get("/brand/dropdown");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
