import { store } from "@/redux/store";
import { fetchBrandDropdownThunk } from "@/redux/thunk/brand.thunk";

//Function to fetch categories for dropdown
export const fetchBrandDropdown = async () => {
  try {
    const { payload } = await store.dispatch(fetchBrandDropdownThunk());
    return payload;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
