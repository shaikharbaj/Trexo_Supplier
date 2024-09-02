import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk to fetch category dropdown
export const fetchCategoryDropdownThunk = createAsyncThunk(
  "category/dropdown",
  async () => {
    try {
      const res = await privateClient.get('/category/dropdown');
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch category dropdown
export const fetchCategoryByIdDropdownThunk = createAsyncThunk(
    "category/dropdownById",
    async (uuid:any) => {
      try {
        const res = await privateClient.get(`/category/dropdownById/${uuid}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );

  //Thunk to fetch product category dropdown for seller
export const fetchProductCategoryDropdownThunk = createAsyncThunk(
  "category/fetchproductcategory",
  async () => {
    try {
      const res = await privateClient.get(`/category/dropdown/seller`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);