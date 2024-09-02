import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch product basic information
export const fetchProductBasicInformationThunk = createAsyncThunk(
  "product/fetch-basic-information",
  async (uuid: string) => {
    try {
      const res = await privateClient.get(`/product/basic-information/${uuid}`);
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
interface IProductBasicInformationPayload {
  title: string;
  category_id: string;
  brand_id: string;
  uom_id: string;
  tags: string;
  description: string;
}

export const submitProductBasicInformationThunk = createAsyncThunk(
  "product/submit-basic-information",
  async (payload: IProductBasicInformationPayload) => {
    try {
      const res = await privateClient.post(
        "/product/basic-information",
        payload
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch product variants information
export const fetchProductVariantsThunk = createAsyncThunk(
  "product/fetch-variants",
  async (uuid: string) => {
    try {
      const res = await privateClient.get(`/product/variants/${uuid}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to save product variants information
export const submitProductVaraintsThunk = createAsyncThunk(
  "product/submit-variants",
  async (payload: any) => {
    try {
      const res = await privateClient.post(
        `/product/variants/${payload.productUuid}`,
        payload.variantsPayload
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch product variants information
export const fetchProductLocationThunk = createAsyncThunk(
  "product/fetch-locations",
  async (uuid: string) => {
    try {
      const res = await privateClient.get(`/product/locations/${uuid}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to save product location information
export const submitProductLocationThunk = createAsyncThunk(
  "product/submit-locations",
  async (payload: any) => {
    try {
      const res = await privateClient.post(
        `/product/locations/${payload.productUuid}`,{
          locations:  payload.locationsPayload
        }
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch product shipping information
export const fetchProductShippingInformationThunk = createAsyncThunk(
  "product/fetch-shipping-information",
  async (uuid: string) => {
    try {
      const res = await privateClient.get(`/product/shipping/${uuid}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to save product shipping information information
export const submitProductShippingInformationThunk = createAsyncThunk(
  "product/submit-shipping-information",
  async (payload: any) => {
    try {
      const res = await privateClient.post(
        `/product/shipping/${payload.productUuid}`,
        payload.shippingPayload
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch product seo information
export const fetchProductSeoInformationThunk = createAsyncThunk(
  "product/fetch-seo-information",
  async (uuid: string) => {
    try {
      const res = await privateClient.get(`/product/seo/${uuid}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to save product seo information information
export const submitProductSeoInformationThunk = createAsyncThunk(
  "product/submit-seo-information",
  async (payload: any) => {
    try {
      const res = await privateClient.post(
        `/product/seo/${payload.productUuid}`,
        payload.seoPayload
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
