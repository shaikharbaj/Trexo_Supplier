import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";


//Thunk to fetch category dropdown
export const fetchAttributeDropdownByCategoryThunk = createAsyncThunk(
    "category/dropdownById",
    async (categoryId: number) => {
      try {
        const res = await privateClient.get(`/attribute/by-category/${categoryId}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );