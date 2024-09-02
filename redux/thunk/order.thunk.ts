import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk to fetch product basic information
export const fetchOrderThunk = createAsyncThunk(
    "order/fetch",
    async () => {
        try {
            const res = await privateClient.get(`/order/`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch order details
export const fetchOrderDetailsThunk = createAsyncThunk(
    "order/fetch-order-details",
    async (uuid: string) => {
        try {
            const res = await privateClient.get(`/order/seller/${uuid}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);