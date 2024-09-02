import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderDetailsThunk, fetchOrderThunk } from "../thunk/order.thunk";

const initialState = {
    isLoading: false,
    error: {},
    refresh: false,
};

export const order = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchOrderThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchOrderThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
            })
            .addCase(fetchOrderThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchOrderDetailsThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchOrderDetailsThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
            })
            .addCase(fetchOrderDetailsThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
    },
});

export default order.reducer;
