import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

export const fetchProfileThunk = createAsyncThunk(
    "profile/fetch-profile",
    async () => {
      try {
        const res = await privateClient.get("/seller/profile");
        return res.data;
      } catch (error: any) {
        if(error?.response?.data){
          return error?.response?.data;
        }
        return error;
      }
    }
  );