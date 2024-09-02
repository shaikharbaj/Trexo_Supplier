import { store } from "@/redux/store";
import { fetchIndustryDropdownThunk } from "@/redux/thunk/industry.thunk";


//Function to fetch industries for dropdown
export const fetchIndustryDropdown = async () => {
  try {
    const { payload } = await store.dispatch(fetchIndustryDropdownThunk());
    return payload;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};