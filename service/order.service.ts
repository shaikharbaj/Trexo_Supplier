import { store } from "@/redux/store";
import { fetchOrderDetailsThunk, fetchOrderThunk } from "@/redux/thunk/order.thunk";

//Function to fetch orders 
export const fetchOrder = async () => {
    try {
        const { payload } = await store.dispatch(fetchOrderThunk());
        return payload;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
};

//Function to fetch order details
export const fetchOrderDetails = async (uuid: string) => {
    try {
        const { payload } = await store.dispatch(fetchOrderDetailsThunk(uuid));
        if (payload?.status !== true) {
            return {
                status: payload?.status,
                statusCode: payload?.statusCode,
                message: payload?.message,
            };
        }
        return {
            status: payload?.status,
            statusCode: payload?.statusCode,
            message: payload?.message,
            data: payload?.data,
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong.");
    }
};