import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchIndustryDropdownThunk = createAsyncThunk(
    "industry/dropdown",
    async () => {
      try {
        const res = await privateClient.get('/industry/dropdown');
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );