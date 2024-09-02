import { store } from "@/redux/store";
import {
  fetchCategoryByIdDropdownThunk,
  fetchCategoryDropdownThunk,
  fetchProductCategoryDropdownThunk,
} from "@/redux/thunk/category.thunk";

//Function to fetch category by id
export const fetchCategoryById = async (uuid: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchCategoryByIdDropdownThunk(uuid)
    );
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

//Function to fetch categories for dropdown
export const fetchCategoryDropdown = async () => {
  try {
    const { payload } = await store.dispatch(fetchCategoryDropdownThunk());
    return payload;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch categories for dropdown
export const fetchProductCategoryDropdownforSeller = async () => {
  try {
    const { payload } = await store.dispatch(fetchProductCategoryDropdownThunk());
    return payload;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};