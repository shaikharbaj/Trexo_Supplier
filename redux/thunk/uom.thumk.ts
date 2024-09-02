import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk to fetch uom dropdown
export const fetchUomDropdownThunk = createAsyncThunk(
  "uom/dropdown",
  async () => {
    try {
      const res = await privateClient.get("/uom/dropdown");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
