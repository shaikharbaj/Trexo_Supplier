import { store } from "@/redux/store";
import { fetchProfileThunk } from "@/redux/thunk/profile.thunk";

//Function to fetch profile
export const fetchProfile = async () => {
  try {
    const { payload } = await store.dispatch(fetchProfileThunk());
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
