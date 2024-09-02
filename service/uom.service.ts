import { store } from "@/redux/store";
import { fetchUomDropdownThunk } from "@/redux/thunk/uom.thumk";

//Function to fetch Uom for dropdown
export const fetchUomDropdown = async () => {
  try {
    const { payload } = await store.dispatch(fetchUomDropdownThunk());
    return payload;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
