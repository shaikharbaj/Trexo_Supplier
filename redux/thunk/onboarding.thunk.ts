import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

// Thunk to fetch basic details
export const getBasicDetailsThunk = createAsyncThunk(
  "onboarding/get-basic-details",
  async () => {
    try {
      const res = await privateClient.get("/seller/onboarding/basic-details");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to submit basic details
interface IBasicDetailsPayload {
  business_type: string;
  establishment: string;
  operation_locations: string;
  company_name: string;
  company_offerings: string;
  product_industry_id: string;
  product_category_id: string[];
  gst_number: string;
  pan_card_number: string;
}

export const submitBasicDetailsThunk = createAsyncThunk(
  "onboarding/basic-details",
  async (payload:IBasicDetailsPayload) => {
    try {
      const res = await privateClient.post("/seller/onboarding/basic-details", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

// Thunk to fetch bank details
export const getBankDetailsThunk = createAsyncThunk(
  "onboarding/get-bank-details",
  async () => {
    try {
      const res = await privateClient.get("/seller/onboarding/bank-details");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to submit bank details
interface IBankDetailsPayload {
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
  branch_name: string;
  account_type: string;
}
export const submitBankDetailsThunk = createAsyncThunk(
  "onboarding/bank-details",
  async (payload:IBankDetailsPayload) => {
    try {
      const res = await privateClient.post("/seller/onboarding/bank-details", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


// Thunk to fetch verification details
export const getVerificationDetailsThunk = createAsyncThunk(
  "onboarding/get-verification-details",
  async () => {
    try {
      const res = await privateClient.get("/seller/onboarding/verification");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to submit verification
interface IVerificationPayload {
  code: string;
  file: any;
}
export const submitVerificationThunk = createAsyncThunk(
  "onboarding/verification",
  async (payload:IVerificationPayload) => {
    try {
      const res = await privateClient.post("/seller/onboarding/verification", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


// Thunk to fetch document details
export const getDocumentDetailsThunk = createAsyncThunk(
  "onboarding/get-document-details",
  async () => {
    try {
      const res = await privateClient.get("/seller/onboarding/documents");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to submit documents
interface IDocumentsPayload {
  personalIdType: string;
  chequeFile: any;
  gstFile: any;
  signatureFile: any;
  personalFile: any;
}
export const submitDocumentsThunk = createAsyncThunk(
  "onboarding/documents",
  async (payload:IDocumentsPayload) => {
    try {
      const res = await privateClient.post("/seller/onboarding/documents", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);